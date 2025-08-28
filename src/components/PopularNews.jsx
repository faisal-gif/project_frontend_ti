'use client';

import { apiNews } from '@/lib/api';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PopularNewsSkeleton from './ui/PopularNewsSkeleton'; // Import skeleton

export default function PopularNews() {
    const [popularNews, setPopularNews] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        apiNews.get('', { params: { news_type: 'populer', offset: 0, limit: 5 } })
            .then(res => {
                setPopularNews(res.data.data);
                setLoading(false); // Set loading to false after fetch
            })
            .catch(err => {
                console.error(err);
                setLoading(false); // Also set loading to false on error
            });
    }, []);

    // map popular articles to a format suitable for rendering
    const popularArticles = popularNews.map(article => ({
        id: article.news_id,
        title: article.news_title,
        timeAgo: new Date(article.news_datepub).toLocaleDateString(),
        views: Number(article.pageviews) 
    }));

    if (loading) {
        return <PopularNewsSkeleton />;
    }

    return (
        <div className="bg-white shadow-[0px_2px_14px_rgba(42,42,42,0.24)] rounded-[3px] p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#C31815] rounded-full"></div>
                <h3 className="text-lg font-semibold text-[#2A2A2A]">Popular News</h3>
            </div>

            <div className="space-y-4">
                {popularArticles.map((article, index) => (
                    <Link
                        key={article.id}
                        href={`/news/${article.id}/${article.title.replace(/\s+/g, '-').toLowerCase()}`}
                        className="block hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl font-bold text-[#C31815] min-w-[30px]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#2A2A2A] leading-5 mb-2 hover:text-[#C31815] transition-colors">
                                    {article.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-[#2A2A2A] opacity-70">
                                    <span>{article.timeAgo}</span>
                                    <span>•</span>
                                    <span>{article.views.toLocaleString()} views</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
