'use client'

import React from 'react'
import Carousel from './ui/Carousel';
import CardImageSkeleton from './ui/CardImageSkeleton';
import LandscapeNewsCard from './LandscapeNewsCard';


function LipsusSection({ lipsus = [] }) {

    return (
        <div className="max-w-6xl mx-auto">

            <div className="flex items-center justify-between mb-8">
                <h2 className="flex gap-2 items-center text-2xl font-bold text-white">
                    <div className="w-1 h-6 bg-[#C31815] rounded-full"></div>
                    LIPUTAN KHUSUS
                </h2>
               
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <Carousel.Content className="-ml-4">

                    {
                        lipsus.length === 0 && (
                            [1, 2, 3, 4, 5].map((index) => (
                                <Carousel.Item
                                    key={index}
                                    className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                                >
                                    <div className="p-1 h-full">
                                        <div className="space-y-6">
                                            <CardImageSkeleton />
                                        </div>
                                    </div>
                                </Carousel.Item>
                            ))
                        )
                    }

                    {lipsus.map((article, index) => (
                        <Carousel.Item
                            key={index}
                            className="pl-4 min-w-0 shrink-0 grow-0 basis-11/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                        >
                            <div className="p-1 h-full">
                                <LandscapeNewsCard
                                    index={index}
                                    image={article.news_image_new}
                                    title={article.news_title}
                                    url={article.url_ci4}
                                    datepub={article.news_datepub}
                                    pageviews={Number(article.pageviews)}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <Carousel.Previous position="outer" />
                <Carousel.Next position="outer" />
            </Carousel>

        </div>
    )
}

export default LipsusSection