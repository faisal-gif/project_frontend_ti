'use client'
import DetailWriter from '@/components/DetailWriter';
import PopularNews from '@/components/PopularNews';
import WriterFotoList from '@/components/WriterFotoList';
import WriterNewsList from '@/components/WriterNewsList';
import Card from '@/components/ui/Card';
import React, { useState } from 'react'

// Skeleton profil saat data belum siap — menggantikan teks "Memuat Jurnalis..."
function WriterProfileSkeleton() {
    return (
        <Card className="overflow-hidden rounded-3xl border border-base-200 mb-8 animate-pulse">
            <div className="h-24 md:h-28 bg-base-300" />
            <div className="px-6 md:px-8 pb-8">
                <div className="flex flex-col md:flex-row gap-5 md:gap-6 md:items-center -mt-14 md:-mt-16">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-base-300 ring-4 ring-base-100 shrink-0" />
                    <div className="flex-1 space-y-3 pt-2">
                        <div className="h-7 w-48 bg-base-300 rounded-full" />
                        <div className="h-4 w-full max-w-2xl bg-base-300 rounded-full" />
                        <div className="h-4 w-2/3 bg-base-300 rounded-full" />
                    </div>
                </div>
            </div>
        </Card>
    );
}

function WriterClient({ initialWriterDetail }) {

    const [writerDetail] = useState(initialWriterDetail);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {!writerDetail ? (
                <WriterProfileSkeleton />
            ) : (
                <DetailWriter authorData={writerDetail} />
            )}

            {/* Articles Section */}
            <div className="mb-8">
                {writerDetail && (
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-1.5 h-8 bg-gradient-to-b from-primary to-secondary rounded-full" />
                        <h2 className="text-lg md:text-2xl font-bold text-foreground">
                            Karya <span className="text-primary">{writerDetail.name}</span>
                        </h2>
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                    <div className="lg:col-span-4">
                        <div className="tabs tabs-border">
                            <input type="radio" name="my_news" className="tab font-semibold" aria-label="Berita" defaultChecked />
                            <div className="tab-content bg-base-100 py-6 rounded-lg">
                                <WriterNewsList writerDetail={writerDetail} />
                            </div>
                            <input type="radio" name="my_news" className="tab font-semibold" aria-label="Foto" />
                            <div className="tab-content py-6 rounded-lg">
                                <WriterFotoList writerDetail={writerDetail} />
                            </div>
                        </div>
                    </div>
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-28">
                            <PopularNews />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default WriterClient;
