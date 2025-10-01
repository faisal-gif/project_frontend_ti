'use client'
import React, { useEffect, useState } from 'react'
import Carousel from './ui/Carousel'
import Autoplay from 'embla-carousel-autoplay'
import HorizontalNewsCard from './HorizontalNewsCard'
import { getSportsNews } from '@/lib/data';
import HorizontalNewsCardSkeleton from './ui/HorizontalNewsCardSkeleton'
import { ChevronRight } from 'lucide-react'

function HorizontalNewsSection({ articles }) {
    const [news, setNews] = useState(articles || []);


    return (
        <>
           
            <Carousel opts={{ align: "start", loop: true }} className="w-full" plugins={[Autoplay()]}>
                <Carousel.Content className="-ml-4">
                    {news.map((article, index) => (
                        <Carousel.Item
                            key={index}
                            className="pl-4 min-w-0 shrink-0 grow-0 basis-4/9  sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <div className="py-2 h-full">
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

            </Carousel>

        </>
    )
}

export default HorizontalNewsSection