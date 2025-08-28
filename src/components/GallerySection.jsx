'use client'
import { apiGallery } from '@/lib/api';
import React, { useEffect, useState } from 'react'
import Carousel from './ui/Carousel';
import FotografiCard from './FotografiCard';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';

function GallerySection() {
    const [gallery, setGallery] = useState([]);

    useEffect(() => {
        apiGallery.get('', { params: { news_type: 'all', offset: 0, limit: 10 } })
            .then(res => setGallery(res.data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-12 max-md:px-4 border-t-2 border-base-300" >
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Fotografi Jurnalistik</h2>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Link href={'kanal/gaya-hidup'} className="text-sm">View All</Link>

                </button>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full" plugins={[Autoplay()]}>
                <Carousel.Content className="-ml-4">
                    {gallery.map((article, index) => (
                        <Carousel.Item
                            key={index}
                            className="pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/5"
                        >
                            <div className="p-1 h-full">
                                <FotografiCard
                                    datepub={article.gal_datepub}
                                    gal_cover={article.gal_cover}
                                    gal_title={article.gal_title}
                                    gal_view={Number(article.gal_view)}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <Carousel.Previous />
                <Carousel.Next />
            </Carousel>
        </section>
    )
}

export default GallerySection