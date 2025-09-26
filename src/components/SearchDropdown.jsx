'use client'
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { getAllNews } from "@/lib/api/newsApi";


const SearchDropdown = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);



  // fetch news setiap kali query berubah
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      getAllNews({
        news_type: "search",
        title: query,
        offset: 0,
        limit: 5,
      })
        .then((res) => {
          setResults(res || []);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 400); // debounce biar nggak spam API

    return () => clearTimeout(timeout);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    if (inputRef.current) inputRef.current.blur();
  };

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end ">
      {/* tombol trigger */}
      <button
        aria-label="Open search"
        className="btn btn-ghost bg-transparent"
      >
        <Search className="w-4 h-4 text-white" />
      </button>

      {/* dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content menu bg-white rounded-box w-80 mt-6 shadow-sm relative p-3"
      >
        {/* search box */}
        <div className="relative mb-2">
          <label className="input w-full flex items-center gap-2">
            <Search className="text-black w-5 h-5" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="grow outline-none bg-transparent"
            />

          </label>
        </div>

        {/* hasil pencarian */}
        {query && (
          <div className="max-h-72 overflow-y-auto">
            {loading ? (
              <div className="text-sm text-gray-500 px-2 py-1">
                Mencari...
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="text-xs text-gray-500 mb-2">
                  {results.length} hasil ditemukan
                </div>
                {results.map((result) => (
                  <Link
                    key={result.news_id}
                    href={result.url_ci4}
                    onClick={handleResultClick}
                    className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <img
                      src={result.news_image_new}
                      alt={result.news_title}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                        {result.news_title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {result.cat_title}
                        </span>
                        {/* <span className="text-xs text-gray-400">
                          {result.time_ago}
                        </span> */}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            ) : (
              <div className="text-sm text-gray-500 px-2 py-1">
                Tidak ada hasil.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
