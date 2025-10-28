'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import NewsCard from './NewsCard';
import LastestNewsCardSkeleton from './ui/LastestNewsCardSkeleton';
import { getAllFoto } from '@/lib/api/fotoApi';

function WriterFotoList(writerDetail) {

    const [articlesFoto, setArticlesFoto] = useState([]);
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
            const res = await getAllFoto({
                news_type: 'fotografer',
                title: writerDetail.writerDetail.name,
                limit: limit,
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
        <>
            <div className="space-y-3">

                {articlesFoto.length === 0 && !isLoading && (
                    <p className="text-center text-gray-500">Foto oleh {writerDetail.name} tidak ditemukan.</p>
                )}

                {/* Skeleton Loading */}
                {isLoading && articlesFoto.length === 0 &&
                    Array.from({ length: 5 }).map((_, index) => (
                        <LastestNewsCardSkeleton key={index} />
                    ))
                }

                {
                    articlesFoto.length > 0 && articlesFoto.map((item) => (
                        <NewsCard
                            layout='list'
                            key={item.news_id}
                            id={item.news_id}
                            title={item.news_title}
                            description={item.news_description}
                            author={item.news_writer}
                            datePub={item.news_datepub}
                            views={Number(item.pageviews)}
                            image={item.news_image_new}
                            url={item.url_ci4}
                            category={item.cat_title}

                        />
                    ))
                }

                {/* Skeleton saat infinite scroll (bukan pertama) */}
                {isLoading && setArticlesFoto.length > 0 && (
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
            {
            articlesFoto.length > 0 && hasMore && loadCount >= 4 && (
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
        </>
    )
}

export default WriterFotoList