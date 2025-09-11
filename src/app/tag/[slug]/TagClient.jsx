'use client'
import NewsCard from '@/components/NewsCard';
import Button from '@/components/ui/Button'
import { getAllNews } from '@/lib/api/newsApi';
import { Filter, Search } from 'lucide-react'
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function TagClient() {
  const params = useParams();
  const { slug } = params;

  const unslugify = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")         // ubah strip jadi spasi
      .replace(/\s+/g, " ")       // rapikan spasi berlebih
      .trim()                     // buang spasi awal/akhir
      .replace(/\b\w/g, (c) => c.toUpperCase()); // kapitalisasi awal kata
  };

  const [tagNews, setTagNews] = useState([]);
  const [offset, setOffset] = useState(0)
  const [limit] = useState(10)
  const [loadCount, setLoadCount] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)


  const fetchNews = async (currentOffset, slug) => {
    try {
      setIsLoading(true)
      const tag = unslugify(slug)   // ← ubah slug ke tag asli
      const res = await getAllNews({
        news_type: 'tag',
        title: tag,
        limit: limit,
        offset: currentOffset,
      });

      const newData = res || []

      // Filter duplikat berdasarkan news_id
      setTagNews(prev => {
        const existingIds = new Set(prev.map(item => item.news_id))
        const filtered = newData.filter(item => !existingIds.has(item.news_id))
        return [...prev, ...filtered]
      })

      // Kalau data kurang dari limit → tidak ada data lagi
      if (newData.length < limit) {
        setHasMore(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!slug) return;
    fetchNews(offset, slug)
  }, [offset, slug]);

  const loadMoreManually = () => {
    if (hasMore && !isLoading) {
      setOffset(prev => prev + limit)
    }
  }


  return (
    <main className="max-w-6xl  mx-auto px-4 py-18">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Berita Tag  {unslugify(slug) || ''}
        </h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Cari
          </Button>
        </div>
      </div>

      {isLoading && tagNews.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Loading Fokus...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}

      {/* Regular News */}
      {tagNews.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tagNews.map((news) => (
              <NewsCard
                key={news.news_id}
                title={news.news_title}
                description={news.news_description}
                writer={news.news_writer}
                datePub={news.news_datepub}
                image={news.news_image_new}
                views={Number(news.pageviews)}
                url={news.url_ci4}
                category={news.cat_title}
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
          <h2 className="text-2xl font-bold">Loading Fokus...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}


      {/* Manual Load Button */}
      {hasMore && loadCount >= 4 && (
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