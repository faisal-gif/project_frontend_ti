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
        <section className="max-w-7xl mx-auto px-6 py-12 max-md:px-4 border-t-2 border-base-300" >
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
                            className="pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/4"
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
        </section>
    )
}

export default HorizontalNewsSection