'use client'
import DetailEditor from '@/components/DetailEditor';
import NewsCard from '@/components/NewsCard';
import PopularNews from '@/components/PopularNews';
import LastestNewsCardSkeleton from '@/components/ui/LastestNewsCardSkeleton';
import { getAllNews } from '@/lib/api/newsApi';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function EditorClient({ initialEditorDetail }) {

    const [editorDetail, setEditorDetail] = useState(initialEditorDetail);
    const [articles, setArticles] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [loadCount, setLoadCount] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);


    // Ambil berita berdasarkan offset
    const fetchNews = useCallback(async (currentOffset) => {
        if (!editorDetail) return;
        try {
            setIsLoading(true);
            const res = await getAllNews({
                news_type: 'editor',
                editor_id: editorDetail.editor_id,
                limit,
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
    }, [editorDetail, limit]);

    // Load data ketika offset berubah
    useEffect(() => {
        if (editorDetail) {
            fetchNews(offset);
        }
    }, [offset, editorDetail, fetchNews]);

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
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-24">
            {/* Tampilkan skeleton detail jika masih loading */}
            {!editorDetail ? (
                <div className="text-center py-10">Memuat editor...</div>
            ) : (
                <DetailEditor authorData={editorDetail} />
            )}

            {/* Articles Section */}
            <div className="mb-8">
                {editorDetail && (
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-8 bg-neutral rounded-full"></div>
                        <h2 className="text-lg md:text-2xl font-bold text-foreground">
                            Artikel yang disunting oleh {editorDetail.editor_name}
                        </h2>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="col-span-4">
                        <div className="space-y-3">
                            {/* Skeleton Loading */}
                            {isLoading && articles.length === 0 &&
                                Array.from({ length: 5 }).map((_, index) => (
                                    <LastestNewsCardSkeleton key={index} />
                                ))
                            }

                            {articles.map((item) => (
                                <NewsCard
                                    layout='list'
                                    key={item.news_id}
                                    id={item.news_id}
                                    title={item.news_title}
                                    description={item.news_description}
                                    author={item.news_writer}
                                    datePub={item.datePub}
                                    views={Number(item.pageviews)}
                                    image={item.news_image_new}
                                    url={item.url_ci4}
                                    category={item.cat_title}

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
                    <div className="hidden lg:block lg:col-span-2">
                        <PopularNews />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EditorClient;
