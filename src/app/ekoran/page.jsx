'use client'
import EKoranCard from '@/components/EkoranCard'
import { getAllEkoran } from '@/lib/api/ekoran'
import { Calendar, Eye, Newspaper } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

function Ekoran() {
    const [ekoran, setEkoran] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit] = useState(10)
    const [loadCount, setLoadCount] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const loaderRef = useRef(null)

    const fetchEkoran = async (currentOffset) => {
        try {
            setIsLoading(true)
            const res = await getAllEkoran({
                limit: limit,
                offset: currentOffset,
            });
            const newData = res || []

            // Filter duplikat berdasarkan news_id
            setEkoran(prev => {
                const existingIds = new Set(prev.map(item => item.id))
                const filtered = newData.filter(item => !existingIds.has(item.id))
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
        fetchEkoran(offset)
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date; // selisih dalam ms
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <main className="max-w-7xl flex-1 mx-auto px-4 lg:px-8 py-16">
            <div className="max-w-7xl mx-auto px-6 py-8 max-md:px-4">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-base-200 rounded-lg">
                            <Newspaper className="h-8 w-8 text-neutral" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-base-content">Galeri E-Koran</h1>
                            <p className="text-base-content/60">Koleksi lengkap koran digital harian</p>
                        </div>
                    </div>
                </div>

                {ekoran.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-6 text-base-content">Edisi Terbaru</h2>
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                            <div className="flex flex-col lg:flex-row gap-8 items-center">
                                <div className="w-48 h-60 bg-primary/20 rounded-lg shadow-xl overflow-hidden">
                                    <img
                                        src={ekoran[0].img1}
                                        alt={ekoran[0].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 text-center lg:text-left">
                                    <div className="badge badge-neutral mb-3">Terbaru</div>
                                    <h3 className="text-2xl font-bold text-base-content mb-2">
                                        {ekoran[0].title}
                                    </h3>
                                    <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
                                        <Calendar className="h-5 w-5 text-neutral" />
                                        <span className="text-sm text-base-content/60">{formatDate(ekoran[0].datepub)}</span>
                                    </div>
                                    <div className="flex gap-3 justify-center lg:justify-start">
                                        <Link
                                            href={ekoran[0].url_ci4}
                                            className="btn btn-neutral rounded-lg btn-md"
                                        >
                                            <Eye className="h-5 w-5" />
                                            Baca Online
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <h2 className="text-2xl font-semibold mb-6 text-base-content">Arsip E-Koran</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ekoran.slice(1).map(edition => (
                            <EKoranCard key={edition.id} edition={edition} />
                        ))}
                    </div>

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
                                {isLoading ? 'Memuat...' : 'Ekoran Lainnya'}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </main>
    )
}

export default Ekoran