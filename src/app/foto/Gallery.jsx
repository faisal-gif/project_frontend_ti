'use client'
import GoogleAds from '@/components/GoogleAds';
import NewsCard from '@/components/NewsCard';
import Button from '@/components/ui/Button';
import { getAllFoto } from '@/lib/api/fotoApi';
import { Filter, Grid, Hash, List, Search, TrendingUp } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function Gallery() {

    const [viewMode, setViewMode] = useState('grid');

    const [foto, setFoto] = useState([]);
    const [offset, setOffset] = useState(0)
    const [limit] = useState(12)
    const [loadCount, setLoadCount] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const loaderRef = useRef(null)



    const fetchNews = async (currentOffset) => {
        try {
            setIsLoading(true)
            const res = await getAllFoto({
                news_type: 'all',
                limit: limit,
                offset: currentOffset,
            });
            const newData = res || []

            // Filter duplikat berdasarkan news_id
            setFoto(prev => {
                const existingIds = new Set(prev.map(item => item.gal_id))
                const filtered = newData.filter(item => !existingIds.has(item.gal_id))
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
        fetchNews(offset)
    }, [offset]);


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




            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                    Gallery Fotografi Jurnalistik
                </h2>

                {/* View controls */}
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-news-muted hover:text-news-red">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <div className="flex border border-base-300 rounded-md">
                        <Button variant="ghost" size="sm"
                            onClick={() => setViewMode('grid')}
                            className={viewMode == 'grid' ? "btn-active" : ""}>
                            <Grid className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm"
                            onClick={() => setViewMode('list')}
                            className={viewMode === 'list' ? "btn-active" : ""}    >
                            <List className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>


            {/* Empty State */}
            {isLoading && foto.length === 0 && (
                <div className="text-center py-12">
                    <div className="flex justify-center mb-4">
                        <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Loading Foto...</h2>
                    <p className="text-muted-foreground">Tunggu sistem sedang menyiapkan data.</p>
                </div>
            )}

            {/* Regular News */}
            {foto.length > 0 && (
                <div>
                    <div className={`mb-12 ${viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'space-y-6'
                        }`}>
                        {foto.map((news) => (
                            <NewsCard
                                layout={viewMode}
                                key={news.gal_id}
                                title={news.gal_title}
                                description={news.gal_description}
                                writer={''}
                                datePub={news.gal_datepub}
                                image={news.gal_cover}
                                views={Number(news.gal_view)}
                                url={news.url_ci4}
                                category={news.galcat_title}
                            />
                        ))}
                    </div>
                </div>
            )}


            {isLoading && foto.length > 0 && (
                <div className="text-center py-12">
                    <div className="flex justify-center mb-4">
                        <svg className="animate-spin h-8 w-8 text-[#7a0f1f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold">Loading Foto...</h2>
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
                        Foto Lainnya
                    </button>
                </div>
            )}

        </main>
    )
}

export default Gallery