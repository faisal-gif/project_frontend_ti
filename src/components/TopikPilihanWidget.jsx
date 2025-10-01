'use client'
import { getAllFocus } from '@/lib/api/focus';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import PopularNewsSkeleton from './ui/PopularNewsSkeleton';
import { ChevronRight, Hash } from 'lucide-react';

function TopikPilihanWidget() {
    const [fokus, setFokus] = useState([]);
    useEffect(() => {
        getAllFocus({ offset: 0, limit: 8 }).then(setFokus).catch(console.error);
    }, []);

    if (fokus.length === 0) {
        return (
            <div className="space-y-6 border-t-2 border-base-300 mt-4">
               
                <div className="bg-[#7b0f1f] opacity-65 shadow-lg rounded-md p-5 mb-6 animate-pulse">
                    <div className="space-y-6 md:space-y-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="border-b last:border-0 border-gray-200 pb-3">
                                <div className="flex items-start gap-3">
                                    <div className="bg-gray-300 w-8 h-8 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                                        <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 border-t-2 border-base-300 mt-4">
            <div className="flex items-center justify-between mt-2">
                <h2 className="text-lg font-bold text-news-category flex items-center gap-2 uppercase">
                    <div className="w-1 h-6 bg-[#C31815] rounded-full "></div>
                    TOPIK PILIHAN
                    <ChevronRight className="w-6 h-6" />
                </h2>
            </div>
            <div className="bg-gradient-to-br from-[#7b0f1f]/50 to-pink-400 shadow-lg rounded-md p-5 mb-6">
                <div className="space-y-6 md:space-y-8">
                    {fokus.map((topic, index) => (
                        <div key={index} className="border-b last:border-0 border-gray-200 pb-3">
                            <Link
                                key={topic.focnews_id}
                                href={topic.urlPath}
                                className="block transition-colors rounded p-2 -m-2"
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl font-bold text-[#C31815] min-w-[30px]">
                                        <Hash size={28} />
                                    </span>
                                    <div className="flex-1">
                                        <div className='flex flex-row justify-between items-center gap-2 '>
                                            <h4 className="text-lg line-clamp-2 md:line-clamp-none md:text-lg  font-medium text-white leading-5 mb-2 hover:text-[#b41d1d] transition-colors">
                                                {topic.focnews_title}
                                            </h4>
                                        </div>

                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopikPilihanWidget