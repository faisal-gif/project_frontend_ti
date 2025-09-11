'use client'
import DetailEditor from '@/components/DetailEditor';
import DetailWriter from '@/components/DetailWriter';
import LastesNewsCard from '@/components/LastesNewsCard';
import PopularNews from '@/components/PopularNews';
import LastestNewsCardSkeleton from '@/components/ui/LastestNewsCardSkeleton';
import { getAllNews } from '@/lib/api/newsApi';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function WriterClient({initialWriterDetail}) {
    
    const [writerDetail, setWriterDetail] = useState(initialWriterDetail);
    const [articles, setArticles] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [loadCount, setLoadCount] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);


    // Ambil berita berdasarkan offset
    const fetchNews = useCallback(async (currentOffset) => {
        if (!writerDetail) return;
        try {
            setIsLoading(true);
            const res = await getAllNews({
                news_type: 'writer',
                title: writerDetail.name,
                limit:limit,
                offset: currentOffset,
            });
            const newData = res || [];

            setArticles(prev => {
                const existingIds = new Set(prev.map(item => item.news_id));
                const filtered = newData.filter(item => !existingIds.has(item.news_id));
                return [...prev, ...filtered];
            });

            if (newData.length < limit) {
                setHasMore(false);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [writerDetail, limit]);

    // Load data ketika offset berubah
    useEffect(() => {
        if (writerDetail) {
            fetchNews(offset);
        }
    }, [offset, writerDetail, fetchNews]);

    // Infinite scroll
    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && loadCount < 4 && hasMore && !isLoading) {
            setOffset(prev => prev + limit);
            setLoadCount(prev => prev + 1);
        }
    }, [limit, loadCount, hasMore, isLoading]);

    useEffect(() => {
        const option = { root: null, rootMargin: '20px', threshold: 1.0 };
        const observer = new IntersectionObserver(handleObserver, option);

        const timer = setTimeout(() => {
            if (loaderRef.current) observer.observe(loaderRef.current);
        }, 500);

        return () => {
            clearTimeout(timer);
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [handleObserver]);

    const loadMoreManually = () => {
        if (hasMore && !isLoading) {
            setOffset(prev => prev + limit);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
            {/* Tampilkan skeleton detail jika masih loading */}
            {!writerDetail ? (
                <div className="text-center py-10">Memuat Jurnalis...</div>
            ) : (
                <DetailWriter authorData={writerDetail} />
            )}

            {/* Articles Section */}
            <div className="mb-8">
                {writerDetail && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-neutral rounded-full"></div>
                        <h2 className="text-2xl font-bold text-foreground">
                            Artikel yang ditulis oleh {writerDetail.name}
                        </h2>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-3">
                        <div className="space-y-3">
                            {/* Skeleton Loading */}
                            {isLoading && articles.length === 0 &&
                                Array.from({ length: 5 }).map((_, index) => (
                                    <LastestNewsCardSkeleton key={index} />
                                ))
                            }

                            {articles.map((item) => (
                                <LastesNewsCard
                                    key={item.news_id}
                                    id={item.news_id}
                                    title={item.news_title}
                                    description={item.news_description}
                                    author={item.news_writer}
                                    datepub={item.news_datepub}
                                    views={Number(item.pageviews)}
                                    image={item.news_image_new}
                                />
                            ))}

                            {/* Skeleton saat infinite scroll (bukan pertama) */}
                            {isLoading && articles.length > 0 && (
                                Array.from({ length: 4 }).map((_, index) => (
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
                                    hidden={isLoading}
                                >
                                    Berita Lainnya
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <PopularNews />


                    </div>

                </div>
            </div>
        </div>
    )
}

export default WriterClient;
