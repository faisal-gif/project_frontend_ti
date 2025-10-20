'use client'
import NewsCard from '@/components/NewsCard';
import NewsCardAuto from '@/components/NewsCardList';
import { getAllNews } from '@/lib/api/newsApi';
import React, { useCallback, useEffect, useState } from 'react'

function TagClient({ initialNews, slug, unslugifiedSlug }) {

  const [tagNews, setTagNews] = useState(initialNews || []);
  const [limit] = useState(9);

  const initialOffset = initialNews?.length || 0;


  const [offset, setOffset] = useState(initialOffset);

  const [hasMore, setHasMore] = useState((initialNews?.length || 0) === limit);
  const [isLoading, setIsLoading] = useState(false)



  const fetchNews = useCallback(async (currentOffset) => {
    if (!unslugifiedSlug) return;

    try {
      setIsLoading(true)
      const tag = unslugifiedSlug;
      const res = await getAllNews({
        news_type: 'tag',
        title: tag,
        limit: limit,
        offset: currentOffset,
      });

      const newData = res || []
      setTagNews(prev => {
        const existingIds = new Set(prev.map(item => item.news_id))
        const filtered = newData.filter(item => !existingIds.has(item.news_id))
        return [...prev, ...filtered]
      })

      if (newData.length < limit) {
        setHasMore(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [limit, unslugifiedSlug]);


  useEffect(() => {
    if (!slug) return;
    if (offset > initialOffset) {
      fetchNews(offset);
    }

  }, [offset, slug, fetchNews, initialOffset]); // <-- Tambahkan initialOffset

  const loadMoreManually = () => {
    if (hasMore && !isLoading) {
      setOffset(prev => prev + limit)
    }
  }


  return (
    <main className="max-w-6xl  mx-auto px-4 py-20">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Berita Tag  {unslugifiedSlug || ''}
        </h2>

      </div>

      {isLoading && tagNews.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Loading Berita...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}

      {/* Regular News */}
      {tagNews.length > 0 && (
        <div>
          <div className="mb-12 space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3">
            {tagNews.map((news,index) => (
              <NewsCardAuto
                key={news.news_id}
                title={news.news_title}
                description={news.news_description}
                writer={news.news_writer}
                datePub={news.news_datepub}
                image={news.news_image_new}
                views={Number(news.pageviews)}
                url={news.url_ci4}
                category={news.cat_title}
                priority={index === 0 && initialOffset === 0}
              />
            ))}
          </div>
        </div>
      )}


      {isLoading && tagNews.length > 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Loading Berita...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}


      {/* Manual Load Button */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMoreManually}
            className="btn btn-error btn-outline"
            hidden={isLoading}
          >
            Berita Lainnya
          </button>
        </div>
      )}





    </main>
  )
}

export default TagClient