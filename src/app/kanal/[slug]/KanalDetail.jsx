'use client'
import GoogleAds from '@/components/GoogleAds';
import NewsCard from '@/components/NewsCard';
import Button from '@/components/ui/Button'
import { getAllNews } from '@/lib/api/newsApi';
import { Grid, List } from 'lucide-react'

import React, { useCallback, useEffect, useRef, useState } from 'react'

function KanalDetail({InitialKanalDetail}) {

  const [viewMode, setViewMode] = useState('grid');

  const [detailKanal, setDetailKanal] = useState(InitialKanalDetail);
  const [kanalNews, setKanalNews] = useState([]);
  const [offset, setOffset] = useState(0)
  const [limit] = useState(9)
  const [loadCount, setLoadCount] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)

  const fetchNews = async (currentOffset, detailKanal) => {
    try {
      setIsLoading(true)
      const res = await getAllNews({
        news_type: 'cat',
        cat_id: detailKanal.catnews_id,
        limit: limit,
        offset: currentOffset,
      });
      const newData = res || []

      // Filter duplikat berdasarkan news_id
      setKanalNews(prev => {
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
    if (!detailKanal) return;
    fetchNews(offset, detailKanal)
  }, [offset, detailKanal])

  const handleObserver = useCallback((entries) => {
    const target = entries[0]
    if (target.isIntersecting && loadCount < 4 && hasMore && !isLoading) {
      setOffset(prev => prev + limit)
      setLoadCount(prev => prev + 1)
    }
  }, [limit, loadCount, hasMore, isLoading])

  useEffect(() => {
    const option = { root: null, rootMargin: '20px', threshold: 1.0 }
    const observer = new IntersectionObserver(handleObserver, option)

    // Delay supaya observer tidak trigger sebelum render awal selesai
    const timer = setTimeout(() => {
      if (loaderRef.current) observer.observe(loaderRef.current)
    }, 500)

    return () => {
      clearTimeout(timer)
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [handleObserver])

  const loadMoreManually = () => {
    if (hasMore && !isLoading) {
      setOffset(prev => prev + limit)
    }
  }

  return (
    <main className="max-w-6xl  mx-auto px-4 py-18">
      <div className='flex items-center justify-center mb-8'>
        <GoogleAds size='top_banner' />
      </div>
      {/* Channel Header */}
      <div className="bg-gradient-to-r from-[#7a0f1f]/10 via-[#7a0f1f]/5 to-transparent rounded-lg p-8 mb-12 border border-[#7a0f1f]/10">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold text-black/80 mb-4">
            Kanal {detailKanal?.catnews_title || 'Memuat...'}
          </h1>
          <p className="text-lg text-black/60 mb-6">
            {detailKanal?.catnews_description || 'Memuat...'}
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {/* <span>(jumlah artikel) artikel tersedia</span>
            <span>•</span>
            <span>Update terakhir: 2 jam lalu</span> */}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-black/60">
          Berita Seputar {detailKanal?.catnews_title || 'Memuat...'}
        </h2>
        
        <div className="flex border border-base-300 rounded-md">
          <Button variant="ghost" size="sm"
            onClick={() => setViewMode('grid')}
            aria-label="View Grid"
            title="View Grid"
            className={viewMode == 'grid' ? "btn-active" : ""}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm"
            onClick={() => setViewMode('list')}
             aria-label="View List"
            title="View List"
            className={viewMode === 'list' ? "btn-active" : ""}    >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {isLoading && kanalNews.length === 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Loading Kanal...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}

      {/* Regular News */}
      {kanalNews.length > 0 && (
        <div>
          <div className={`mb-12 ${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
            }`}>
            {kanalNews.map((news) => (
              <NewsCard
                key={news.news_id}
                layout={viewMode}
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

      {isLoading && kanalNews.length > 0 && (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Loading Kanal...</h2>
          <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
        </div>
      )}

      {/* Loader area */}
      {hasMore && loadCount < 4 && (
        <div ref={loaderRef} className="h-16" />
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

export default KanalDetail