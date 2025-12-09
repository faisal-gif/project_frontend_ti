"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react"; // Import icon X untuk tombol clear
import Link from "next/link";
import { getAllNews } from "@/lib/api/newsApi";
import { useRouter } from "next/navigation";

// Tentukan tipe data untuk hasil berita agar lebih jelas
// Anggap properti yang digunakan ada di sini
/**
 * @typedef {object} NewsResult
 * @property {string | number} news_id
 * @property {string} url_ci4
 * @property {string} news_image_new
 * @property {string} news_title
 * @property {string} cat_title
 */

const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  /** @type {[NewsResult[], React.Dispatch<React.SetStateAction<NewsResult[]>>]} */
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null); // Ref untuk menutup dropdown saat klik di luar
  const inputRef = useRef(null);
  const router = useRouter();

  // Bersihkan hasil dan query
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    // Tetap fokuskan input setelah clear jika pengguna ingin mencari lagi segera
    // if (inputRef.current) inputRef.current.focus(); 
  }, []);

  // Handler untuk mengarahkan pengguna ke halaman hasil pencarian utama
  const handleSearchSubmit = useCallback(() => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      clearSearch(); // Tutup dropdown/bersihkan input setelah navigasi
      // Tambahkan logic untuk menutup dropdown secara manual jika diperlukan
      // Contoh: Menghapus fokus dari tombol trigger dropdown
      if (dropdownRef.current) {
        dropdownRef.current.removeAttribute('open');
      }
    }
  }, [query, router, clearSearch]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  // Debounced fetch news
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Gunakan AbortController untuk membatalkan permintaan sebelumnya
    const abortController = new AbortController();

    const timeout = setTimeout(() => {
      // Pastikan fungsi API Anda dapat menerima signal dari AbortController
      getAllNews({
        news_type: "search",
        title: query,
        offset: 0,
        limit: 5,
        // signal: abortController.signal, // Asumsi API Anda mendukung ini
      })
        .then((res) => {
          // Hanya update jika permintaan ini adalah yang terbaru (opsional, tapi baik)
          // if (!abortController.signal.aborted) {
          setResults(res || []);
          // }
        })
        .catch((error) => {
          // Abaikan error jika itu adalah AbortError
          if (error.name === 'AbortError') return;
          console.error("Error fetching news:", error);
        })
        .finally(() => setLoading(false));
    }, 400); 

    // Cleanup function: batalkan timer dan permintaan
    return () => {
      clearTimeout(timeout);
      abortController.abort();
    };
  }, [query]);


  // Handler untuk menutup dropdown saat klik di luar (UX Improvement)
  useEffect(() => {
    /**
     * @param {MouseEvent} event
     */
    const handleClickOutside = (event) => {
      // Pastikan untuk memeriksa apakah event.target ada sebelum menggunakan .closest
      if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target)) {
        // Logika untuk menutup dropdown
        // Karena Anda menggunakan DaisyUI dropdown, menutupnya berarti menghapus fokus
        // atau menghapus attribute 'open' (walaupun DaisyUI lebih sering pakai :focus-within / tabIndex)
        // Cara paling aman adalah memastikan trigger tidak fokus
        const trigger = dropdownRef.current.querySelector('[role="button"]');
        if (trigger) trigger.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Untuk hasil yang diklik, kita hanya perlu membersihkan state
  const handleResultClick = () => {
    clearSearch();
    // DaisyUI akan otomatis menutup dropdown saat Link diklik,
    // asalkan Link tidak ada di dalam elemen yang mempertahankan fokus.
  };


  return (
    // Gunakan elemen <details> untuk dropdown yang lebih baik secara native/aksesibilitas, 
    // atau jika tetap menggunakan div + DaisyUI, gunakan ref di elemen terluar
    <div 
      className="dropdown dropdown-bottom dropdown-end" 
      ref={dropdownRef} // Tambahkan ref di div terluar
    >
      {/* Tombol trigger - gunakan tabIndex=0 untuk aksesibilitas */}
      <button
        tabIndex={0}
        role="button"
        aria-label="Buka pencarian"
        className="btn btn-ghost bg-transparent"
      >
        <Search className="w-4 h-4 text-white" />
      </button>

      {/* Dropdown content */}
      <div
        tabIndex={0}
        // Hapus tabIndex=0 dari sini, karena content seharusnya bukan fokus utama, 
        // tapi untuk membantu menutup dropdown di DaisyUI
        className="dropdown-content menu bg-white rounded-box w-80 mt-3 shadow-xl p-3 z-50" // Tambahkan z-index tinggi
      >
        {/* Search box */}
        <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }} className="relative mb-2">
          <label className="input w-full flex items-center gap-2 border border-gray-300 focus-within:border-blue-500 rounded-lg p-2">
            <Search className="text-gray-500 w-5 h-5 flex-shrink-0" />
            <input
              ref={inputRef}
              type="search" // Lebih semantik daripada 'text'
              placeholder="Cari berita..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              // onKeyDown={handleKeyDown} // Pindahkan logic submit ke <form onSubmit>
              className="grow outline-none bg-transparent text-gray-800 placeholder-gray-400"
              aria-label="Input pencarian berita"
            />
            {/* Tombol Clear Query */}
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Bersihkan pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </label>
        </form>

        {/* Hasil pencarian */}
        {query.trim() ? ( // Gunakan query.trim() untuk memastikan hanya tampil saat ada input
          <div className="max-h-72 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                {/* Skeleton/Spinner Sederhana */}
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                <span className="text-sm text-gray-500 ml-2">Mencari...</span>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="text-xs font-semibold text-gray-600 mb-2 px-2 border-b pb-1">
                  {results.length} hasil teratas
                </div>
                {results.map((result) => (
                  <Link
                    key={result.news_id}
                    // Pastikan url_ci4 adalah path yang valid (misalnya /berita/id-judul)
                    href={result.url_ci4} 
                    onClick={handleResultClick}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <img
                      src={result.news_image_new}
                      alt={result.news_title}
                      // Tambahkan error handling jika gambar tidak bisa dimuat (opsional)
                      onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-image.jpg'; }}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {result.news_title}
                      </h3>
                      <span className="inline-block mt-1 text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                        {result.cat_title}
                      </span>
                    </div>
                  </Link>
                ))}
                {/* Pilihan untuk menuju halaman pencarian penuh */}
                 <div className="p-2 pt-3 border-t mt-2">
                    <button 
                        onClick={handleSearchSubmit} 
                        className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        Lihat semua hasil untuk "{query}"
                    </button>
                 </div>
              </>
            ) : (
              <div className="text-sm text-gray-500 px-2 py-4 text-center">
                Tidak ada hasil ditemukan.
              </div>
            )}
          </div>
        ) : (
             <div className="text-sm text-gray-500 px-2 py-4 text-center">
                Mulai ketik untuk mencari berita.
            </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;