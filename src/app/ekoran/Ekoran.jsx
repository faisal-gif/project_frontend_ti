'use client'
import ClientOnly from '@/components/ClientOnly'
import EkoranHomeCard from '@/components/EkoranHomeCard'
import Button from '@/components/ui/Button'
import CountUp from '@/components/ui/CountUp'
import EkoranHomeCardSkeleton from '@/components/ui/EkoranHomeCardSkeleton'
import { getAllEkoran } from '@/lib/api/ekoran'
import FormattedDate from '@/utils/date/FormattedDate'
import { Calendar, Eye, MessageCircle, Newspaper, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useCallback, useEffect, useRef, useState } from 'react'

function Ekoran() {
    const [ekoran, setEkoran] = useState([])
    const [offset, setOffset] = useState(0)
    const [limit] = useState(9)
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


    // Helper buat grouping
    const groupByDate = (data) => {
        return data.reduce((groups, item) => {
            const date = new Date(item.datepub).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});
    };


    return (
        <main className="max-w-6xl flex-1 mx-auto py-16">
            <div className="breadcrumbs text-sm mb-6">
                <ul>
                    <li className='hover:text-[#b41d1d]'><Link href={'/'}>Home</Link></li>
                    <li className='text-[#b41d1d] font-semibold'><Link href={`/ekoran`}>Ekoran</Link></li>
                </ul>
            </div>
            <div className="mb-6">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#121b2e] via-[#121b2e]/90 to-[#121b2e]/80 p-8 md:p-12 text-white">
                    <div className="absolute inset-0 bg-[url('/ekoran_bg.jpg')] opacity-30"></div>

                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Newspaper className="h-5 w-5" />
                            <span className="text-sm font-medium">E-KORAN DIGITAL</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            E-KORAN
                        </h1>

                        <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                            E-Koran pertama di Indonesia berbasis media sosial. Isi E-Koran ini merupakan bagian tak terpisahkan dari TIMES Indonesia,
                            media online berjaringan nomor 1 di Indonesia. E-Koran ini terbit setiap hari dan disebarkan melalui media sosial secara langsung.
                        </p>

                        <div className="flex flex-col items-center gap-6 mb-8">
                            <div className="text-center">
                                <p className="text-sm text-white/70 uppercase tracking-wide mb-2">TOTAL PELANGGAN</p>
                                <div className="flex items-center justify-center gap-2">
                                    <Users className="h-6 w-6 text-white/80" />
                                    <span className="text-3xl md:text-4xl font-bold">
                                        <CountUp
                                            from={0}
                                            to={68371}
                                            separator=","
                                            direction="up"
                                            duration={1}
                                            className="count-up-text"
                                        />

                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                                <a
                                    href={'https://www.whatsapp.com/channel/0029VaFG7TP29757xsqaDd2D'}
                                    className="btn btn-md flex-1 bg-green-500 hover:bg-green-600 text-white border-0 rounded-xl h-12 py-2 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                    target='_blank'
                                >
                                    <MessageCircle className="h-5 w-5 mr-2" />
                                    Berlangganan GRATIS WhatsApp
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                        <span className="text-sm text-base-content/60">
                                            <ClientOnly>
                                                <FormattedDate dateString={ekoran[0].datepub} />
                                            </ClientOnly>
                                        </span>
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

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Kalau loading pertama kali */}
                        {isLoading && ekoran.length === 0 && (
                            <>
                                {[1, 2].map((group) => (
                                    <div key={group} className="lg:col-span-2 space-y-4">
                                        <div className="h-6 w-40 bg-base-300 rounded animate-pulse mb-4" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {[1, 2].map((i) => (
                                                <EkoranHomeCardSkeleton key={i} />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Kalau data sudah ada */}
                        {Object.entries(groupByDate(ekoran.slice(1))).map(([date, editions]) => (
                            <div key={date} className="lg:col-span-2 space-y-4">
                                <h3 className="text-xl font-bold text-base-content flex items-center gap-2 mb-4">
                                    <Calendar className="h-5 w-5 text-neutral" />
                                    {date}
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                                    {editions.map((edition) => (
                                        <EkoranHomeCard
                                            key={edition.id}
                                            datepub={edition.datepub}
                                            gal_title={edition.title}
                                            gal_cover={edition.img1}
                                            gal_view={edition.views}
                                            url={edition.url_ci4}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Kalau lagi load tambahan (load more) → skeleton tambahan */}
                        {isLoading && ekoran.length > 0 && (
                       
                                [1, 2].map((group) => (
                                    <div key={`loading-${group}`} className="lg:col-span-2 space-y-4">
                                        <div className="h-6 w-40 bg-base-300 rounded animate-pulse mb-4" />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {[1, 2].map((i) => (
                                                <EkoranHomeCardSkeleton key={i} />
                                            ))}
                                        </div>
                                    </div>
                                ))
                        )}

                    </div>

                    {hasMore && loadCount < 4 && <div ref={loaderRef} className="h-10" />}

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