'use client'
import React, { useEffect, useState } from 'react'
import Card from './ui/Card';
import Button from './ui/Button';
import { ChevronRight, Download, DownloadCloud, Eye } from 'lucide-react';
import { getAllEkoran } from '@/lib/api/ekoran';
import Carousel from './ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import EkoranHomeCard from './EkoranHomeCard';
import Link from 'next/link';
import EkoranHomeCardSkeleton from './ui/EkoranHomeCardSkeleton';
import Image from 'next/image';

function EKoranSection() {

    const [ekoran, setEkoran] = useState([]);

    useEffect(() => {
        getAllEkoran({ offset: 0, limit: 10 }).then(setEkoran).catch(console.error);
    }, []);


    return (
        <Card className="border-t-2 border-base-300 rounded-none relative overflow-hidden">
            {/* Background pakai Next/Image */}
            <Image
                src="/ekoran_bg.jpg" // bisa juga pakai article.img1 kalau dinamis
                alt="Background Ekoran"
                fill
                loading='lazy'
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 464px"
                className="object-cover object-center -z-10" // taruh di belakang konten
            />

            {/* Overlay gelap biar teks terbaca */}
            <div className="absolute inset-0 bg-black/40 -z-10"></div>
            <Card.Body className="p-4 md:p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        {/* <h3 className="text-2xl font-bold text-foreground">Ekoran</h3> */}
                        <Link href={'/ekoran'} className="text-2xl font-bold text-foreground hover:text-[#b41d1d] flex items-center gap-2">
                            <Image
                                src="/logo_ekoran_white.png"
                                alt="Ekoran Logo"
                                width={120}
                                height={40}
                                loading='lazy'
                                className="object-contain h-auto w-[120px]"
                            />
                        </Link>
                    </div>

                </div>

                <Carousel opts={{ align: "start", loop: true }} className="w-full" plugins={[Autoplay()]}>
                    <Carousel.Content className="-ml-4">
                        {
                            ekoran.length === 0 && (
                                [1, 2, 3, 4, 5].map((i) => (
                                    <Carousel.Item
                                        key={i}
                                        className="pl-4 min-w-0 shrink-0 grow-0 basis-9/16 sm:basis-1/4 md:basis-1/4 lg:basis-1/5"
                                    >
                                        <div className="h-full">
                                            <EkoranHomeCardSkeleton />
                                        </div>
                                    </Carousel.Item>
                                ))
                            )
                        }


                        {ekoran.map((article, index) => (
                            <Carousel.Item
                                key={index}
                                className="pl-4 min-w-0 shrink-0 grow-0 basis-9/16 sm:basis-1/4 md:basis-1/4 lg:basis-1/5"
                            >
                                <div className=" h-full">
                                    <EkoranHomeCard
                                        gal_cover={article.img1}
                                        gal_title={article.title}
                                        gal_view={Number(article.views)}
                                        datepub={article.datepub}
                                        url={article.url_ci4}
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>

                </Carousel>



            </Card.Body>
        </Card>
    )
}

export default EKoranSection