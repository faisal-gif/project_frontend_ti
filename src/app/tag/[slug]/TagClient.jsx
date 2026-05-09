'use client'

import NewsCardAuto from '@/components/NewsCardList';
import { getAllNews } from '@/lib/api/newsApi';
import React, { useCallback, useEffect, useState, useRef } from 'react'

function TagClient({ initialNews, slug, unslugifiedSlug }) {
  // 1. Inisialisasi state langsung dari props
  const [tagNews, setTagNews] = useState(initialNews || []);
  const [limit] = useState(9);
  const [hasMore, setHasMore] = useState((initialNews?.length || 0) >= limit);
  const [isLoading, setIsLoading] = useState(false);
  
  // Gunakan ref untuk melacak apakah ini render pertama atau slug berubah
  const isInitialMount = useRef(true);

  // Reset state jika slug berubah (penting jika user pindah antar tag)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setTagNews(initialNews || []);
    setHasMore((initialNews?.length || 0) >= limit);
  }, [slug, initialNews, limit]);

  const fetchNews = useCallback(async () => {
    if (!unslugifiedSlug || isLoading || !hasMore) return;

    try {
      setIsLoading(true);
      // Offset adalah JUMLAH data yang sudah ada di state saat ini
      const currentOffset = tagNews.length;

      const res = await getAllNews({
        news_type: 'tag',
        title: unslugifiedSlug,
        limit: limit,
        offset: currentOffset,
      });

      const newData = res || [];

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setTagNews(prev => {
          // Filter untuk menghindari duplikasi id
          const existingIds = new Set(prev.map(item => item.news_id));
          const filtered = newData.filter(item => !existingIds.has(item.news_id));
          return [...prev, ...filtered];
        });
        
        // Jika data yang datang kurang dari limit, berarti sudah habis
        if (newData.length < limit) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  }, [unslugifiedSlug, tagNews.length, limit, isLoading, hasMore]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Berita Tag {unslugifiedSlug || ''}
        </h2>
      </div>

      {/* Tampilan Loading Awal */}
      {isLoading && tagNews.length === 0 && (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* List Berita */}
      {tagNews.length > 0 && (
        <div className="mb-12 space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
          {tagNews.map((news, index) => (
            <NewsCardAuto
              key={`${news.news_id}-${index}`} // Key unik
              title={news.news_title}
              description={news.news_description}
              writer={news.news_writer}
              datePub={news.news_datepub}
              image={news.news_image_new}
              views={Number(news.pageviews)}
              url={news.url_ci4}
              category={news.cat_title}
              priority={index === 0}
            />
          ))}
        </div>
      )}

      {/* Loading saat fetch data tambahan */}
      {isLoading && tagNews.length > 0 && (
        <div className="text-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Tombol Load More */}
      {hasMore && !isLoading && (
        <div className="text-center mt-6">
          <button
            onClick={fetchNews}
            className="btn btn-error btn-outline"
          >
            Berita Lainnya
          </button>
        </div>
      )}
    </main>
  );
}

// Komponen Spinner kecil agar kode lebih rapi
const LoadingSpinner = () => (
  <>
    <div className="flex justify-center mb-4">
      <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    </div>
    <h2 className="text-2xl font-bold">Loading Berita...</h2>
    <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
  </>
);

export default TagClient;