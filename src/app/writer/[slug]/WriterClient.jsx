'use client'
import DetailWriter from '@/components/DetailWriter';
import NewsCard from '@/components/NewsCard';
import PopularNews from '@/components/PopularNews';
import LastestNewsCardSkeleton from '@/components/ui/LastestNewsCardSkeleton';
import WriterFotoList from '@/components/WriterFotoList';
import WriterNewsList from '@/components/WriterNewsList';
import { getAllNews } from '@/lib/api/newsApi';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function WriterClient({ initialWriterDetail }) {

    const [writerDetail] = useState(initialWriterDetail);


    return (
        <div className="max-w-6xl mx-auto px-4 py-24 max-md:px-4">
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
                        <h2 className="text-lg md:text-2xl font-bold text-foreground">
                            Artikel yang ditulis oleh {writerDetail.name}
                        </h2>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="col-span-4">
                        <div className="tabs tabs-border">
                            <input type="radio" name="my_news" className="tab" aria-label="Berita" defaultChecked />
                            <div className="tab-content  bg-base-100 py-8 rounded-lg">
                                <WriterNewsList writerDetail={writerDetail} />
                            </div>
                            <input type="radio" name="my_news" className="tab" aria-label="Foto" />
                            <div className="tab-content py-8 rounded-lg">
                                <WriterFotoList writerDetail={writerDetail} />
                            </div>
                        </div>

                    </div>
                    <div className="hidden md:block md:col-span-2 md:">
                        <PopularNews />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default WriterClient;
