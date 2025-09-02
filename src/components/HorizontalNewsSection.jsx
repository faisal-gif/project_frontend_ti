'use client'
import React, { useEffect, useState } from 'react'
import Carousel from './ui/Carousel'
import Autoplay from 'embla-carousel-autoplay'
import HorizontalNewsCard from './HorizontalNewsCard'

import Link from 'next/link';
import { getSportsNews } from '@/lib/data';

function HorizontalNewsSection() {
    const [sportSections, setSportSections] = useState([]);

    useEffect(() => {
        getSportsNews().then(setSportSections).catch(console.error);
    }, []);

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Trending</h2>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Link href={'kanal/gaya-hidup'} className="text-sm">View All</Link>

                </button>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full" plugins={[Autoplay()]}>
                <Carousel.Content className="-ml-4">
                    {sportSections.map((article, index) => (
                        <Carousel.Item
                            key={index}
                            className="pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <div className="p-2 h-full">
                                <HorizontalNewsCard
                                    author={article.news_writer}
                                    datepub={article.news_datepub}
                                    image={article.news_image_new}
                                    title={article.news_title}
                                    url={article.url_ci4}
                                    views={Number(article.pageviews)}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <Carousel.Previous position="outer" />
                <Carousel.Next position="outer" />
            </Carousel>
        
        </>
    )
}

export default HorizontalNewsSection