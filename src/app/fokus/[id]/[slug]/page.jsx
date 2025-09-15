'use client'
import GoogleAds from '@/components/GoogleAds';
import NewsCard from '@/components/NewsCard';
import Button from '@/components/ui/Button';
import { getFocusDetail } from '@/lib/api/focus';
import { getAllNews } from '@/lib/api/newsApi';
import { Filter, Grid, Hash, List, Search, TrendingUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function page() {
  const params = useParams();
  const { id } = params;

  const [viewMode, setViewMode] = useState('grid');

  const [detailFocus, setDetailFocus] = useState();
  const [focusNews, setFocusNews] = useState([]);
  const [offset, setOffset] = useState(0)
  const [limit] = useState(12)
  const [loadCount, setLoadCount] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef(null)


  const fetchNews = async (currentOffset, id) => {
    try {
      setIsLoading(true)
      const res = await getAllNews({
        news_type: 'focus',
        cat_id: id,
        limit: limit,
        offset: currentOffset,
      });
      const newData = res || []

      // Filter duplikat berdasarkan news_id
      setFocusNews(prev => {
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
    if (!id) return;
    getFocusDetail({ id }).then(setDetailFocus).catch(console.error);
    fetchNews(offset, id)
  }, [offset, id]);


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
    <main className="max-w-6xl  mx-auto px-4 py-20">

      <div className='flex items-center justify-center mb-8'>
        <GoogleAds size='top_banner' />
      </div>

      {detailFocus && detailFocus.focnews_image_news && (
        <div className="flex items-center justify-center mb-8">
          <img src={detailFocus.focnews_image_news} className='w-full md:w-8/12 h-full' />
        </div>
      )}
      {/* Focus Header */}
      <div className="bg-gradient-to-r from-[#7a0f1f]/10 via-[#7a0f1f]/5 to-transparent rounded-lg p-8 mb-12 border border-[#7a0f1f]/10">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="text-6xl"><Hash className='h-18 w-18' /></div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-foreground">
                {detailFocus?.focnews_title || 'Memuat...'}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              {detailFocus?.focnews_description || 'Memuat...'}
            </p>
            {/* <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
            
              </div>
              <span>•</span>
              <span>Update terakhir: 1 jam lalu</span>
              <span>•</span>
              <span>Diikuti 15.4K pembaca</span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-[#7a0f1f] mb-2">200.000+</div>
          <div className="text-black/60 text-sm">Total Artikel</div>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-[#7a0f1f] mb-2">12</div>
          <div className="text-black/60 text-sm">Hari Ini</div>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-[#7a0f1f] mb-2">5</div>
          <div className="text-black/60 text-sm">Pakar Kontributor</div>
        </div>
        <div className="text-center p-6 bg-base-100 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-[#7a0f1f] mb-2">89%</div>
          <div className="text-black/60 text-sm">Rating Kredibilitas</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-foreground">
          Berita Seputar {detailFocus?.focnews_title || 'Memuat...'}
        </h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
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
      </div>


      {/* Empty State */}
      {isLoading && focusNews.length === 0 && (
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
      {focusNews.length > 0 && (
        <div>
          <div className={`mb-12 ${viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
            }`}>
            {focusNews.map((news) => (
              <NewsCard
                layout={viewMode}
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


      {isLoading && focusNews.length > 0 && (
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

      {/* Loader area */}
      {hasMore && loadCount < 4 && (
        <div ref={loaderRef} className="h-10" />
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

export default page