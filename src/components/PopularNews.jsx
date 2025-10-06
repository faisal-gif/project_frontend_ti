'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import PopularNewsSkeleton from './ui/PopularNewsSkeleton'; // Import skeleton
import Image from 'next/image';
import { getAllNews } from '@/lib/api/newsApi';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import ClientOnly from './ClientOnly';

export default function PopularNews() {
    const [popularNews, setPopularNews] = useState([]);

    useEffect(() => {
        getAllNews({ news_type: 'populer', offset: 0, limit: 5 }).then(setPopularNews).catch(console.error);
    }, []);

    if (popularNews.length === 0) {
        return <PopularNewsSkeleton />;
    }

    return (
        <div className="bg-white shadow-[0px_2px_14px_rgba(42,42,42,0.24)] rounded-[3px] p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-[#C31815] rounded-full"></div>
                <h3 className="text-lg font-semibold text-[#2A2A2A]">Terpopuler</h3>
            </div>

            <div className="space-y-4">
                {popularNews.map((article, index) => (
                    <Link
                        key={index}
                        href={article.url_ci4}
                        className="block hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl font-bold text-[#C31815] min-w-[30px]">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1">
                                <div className='flex flex-row justify-between items-center gap-2 '>
                                    <h4 className="text-xs line-clamp-2 md:line-clamp-none md:text-sm  font-medium text-[#2A2A2A] leading-5 mb-2 hover:text-[#C31815] transition-colors">
                                        {article.news_title}
                                    </h4>
                                    <div className="w-20 h-16 flex-shrink-0 relative">
                                        <Image
                                            src={article.news_image_new}
                                            alt={article.news_title}
                                            width={400}
                                            height={400}
                                            className="object-cover rounded-md transform scale-100 transition group-hover:scale-105 motion-reduce:transition-none motion-reduce:hover:transform-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#2A2A2A] opacity-70">
                                    <span>
                                        <ClientOnly>
                                            <FormattedDate dateString={article.news_datepub} />
                                        </ClientOnly>
                                    </span>
                                    <span>•</span>
                                    <span>
                                        <ClientOnly>
                                            <FormattedViews count={article.pageviews} />
                                        </ClientOnly>
                                        views</span>
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
