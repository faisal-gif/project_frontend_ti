'use client'
import React, { useEffect, useState } from 'react'
import Card from './ui/Card';
import Button from './ui/Button';
import { ChevronRight, Download, Eye } from 'lucide-react';
import { getAllEkoran } from '@/lib/api/ekoran';
import Carousel from './ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import EkoranHomeCard from './EkoranHomeCard';

function EKoranSection() {
    const currentDate = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });


    const [ekoran, setEkoran] = useState([]);

    useEffect(() => {
        getAllEkoran({ offset: 0, limit: 10 }).then(setEkoran).catch(console.error);
    }, []);


    return (
        <Card className="border-t-2 border-base-300 rounded-none">
            <Card.Body className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">EKoran</h3>
                        <p className="text-sm text-muted-foreground">{currentDate}</p>
                    </div>
                    <Button variant="link" className="text-neutral hover:text-primary/80">
                        Baca Lebih Banyak <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>


                <Carousel opts={{ align: "start", loop: true }} className="w-full" plugins={[Autoplay()]}>
                    <Carousel.Content className="-ml-4">
                        {ekoran.map((article, index) => (
                            <Carousel.Item
                                key={index}
                                className="pl-4 min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
                            >
                                <div className="p-1 h-full">
                                    <EkoranHomeCard
                                        gal_cover={article.img1}
                                        gal_title={article.title}
                                        gal_view={article.views}
                                        datepub={article.datepub}
                                        url={article.url_ci4}
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>
                    <Carousel.Previous position="outer" />
                    <Carousel.Next position="outer" />
                </Carousel>



            </Card.Body>
        </Card>
    )
}

export default EKoranSection