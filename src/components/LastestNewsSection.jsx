'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LastestNewsCardSkeleton from './ui/LastestNewsCardSkeleton' // Import skeleton
import { getAllNews } from '@/lib/api/newsApi'
import NewsCard from './NewsCard'
import Button from './ui/Button'
import { Grid, List } from 'lucide-react'

function LastestNewsSection() {

    const [viewMode, setViewMode] = useState('list');

    const [lastNews, setLastNews] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit] = useState(10)
    const [loadCount, setLoadCount] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const loaderRef = useRef(null)

    const fetchNews = async (currentOffset) => {
        try {
            setIsLoading(true)
            const res = await getAllNews({
                news_type: 'all',
                limit: limit,
                offset: currentOffset,
            });
            const newData = res || []

            // Filter duplikat berdasarkan news_id
            setLastNews(prev => {
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

    // Load data pertama
    useEffect(() => {
        fetchNews(offset)
    }, [offset])


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
        <>
            <div>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="flex gap-2 items-center text-2xl font-bold text-foreground">
                        <div className="w-1 h-6 bg-[#C31815] rounded-full"></div>
                        JELAJAH BERITA
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
                <div className={`mb-12 ${viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
                    : 'space-y-6'
                    }`}>
                    {/* Skeleton Loading */}
                    {isLoading && lastNews.length === 0 && (
                        Array.from({ length: 10 }).map((_, index) => (
                            <LastestNewsCardSkeleton key={index} />
                        ))
                    )}

                    {lastNews.map((item) => (
                        <NewsCard
                            key={item.news_id} // pakai id biar stabil
                            layout={viewMode}
                            id={item.news_id}
                            title={item.news_title}
                            description={item.news_description}
                            author={item.news_writer}
                            datePub={item.news_datepub}
                            views={Number(item.pageviews)}
                            image={item.news_image_new}
                            url={item.url_ci4}
                        />
                    ))}

                    {/* Skeleton saat infinite scroll (bukan pertama) */}
                    {isLoading && lastNews.length > 0 && (
                        Array.from({ length: 3 }).map((_, index) => (
                            <LastestNewsCardSkeleton key={`scroll-${index}`} />
                        ))
                    )}
                </div>

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
                            disabled={isLoading}
                        >
                            {isLoading ? 'Memuat...' : 'Berita Lainnya'}
                        </button>
                    </div>
                )}



            </div>
            <div>
            </div>
        </>
    )
}

export default LastestNewsSection
