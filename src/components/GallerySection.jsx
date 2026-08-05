'use client'

import React, { useEffect, useState } from 'react'
import FotografiCard from './FotografiCard';
import Link from 'next/link';
import { Camera } from 'lucide-react';
import { getAllFoto } from '@/lib/api/fotoApi';


function GallerySection() {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        getAllFoto({ news_type: 'all', offset: 0, limit: 9 }).then(setGallery).catch(console.error);
    }, []);

    const loading = gallery.length === 0;
    // Mosaic bento: item pertama jadi hero 2x2, sisanya 1x1.
    const cellClass = (i) => i === 0 ? 'md:col-span-2 md:row-span-2' : '';

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="flex gap-2 items-center text-2xl font-bold text-foreground">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C31815] text-white">
                        <Camera className="h-5 w-5" />
                    </span>
                    TIMES FOTO
                </h2>
                <Link href={'/foto'} className="text-sm text-neutral hover:text-[#b41d1d] hover:font-semibold transition-colors">
                    Lebih Banyak
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[150px] md:auto-rows-[175px]">
                {loading
                    ? [...Array(9)].map((_, i) => (
                        <div key={i} className={`h-full w-full animate-pulse rounded-lg bg-gray-200 ${cellClass(i)}`} />
                    ))
                    : gallery.map((article, i) => (
                        <div key={article.gal_id ?? i} className={`h-full ${cellClass(i)}`}>
                            <FotografiCard
                                fill
                                datepub={article.gal_datepub}
                                gal_cover={article.gal_cover}
                                gal_title={article.gal_title}
                                gal_view={Number(article.gal_view)}
                                category={article.galcat_title}
                                url={article.url_ci4}
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}

export default GallerySection
