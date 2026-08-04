'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Carousel from './ui/Carousel'
import CardImageSkeleton from './ui/CardImageSkeleton'
import { ShoppingBag, Sparkles, ArrowRight, Flame } from 'lucide-react'

const SHOPEE = '#EE4D2D'

function CommerceSection({ news = [] }) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EE4D2D] via-[#f2643f] to-[#ff8c42] p-5 md:p-7 shadow-lg">
                {/* dekorasi lingkaran */}
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/10" />

                {/* Header */}
                <div className="relative flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3 text-white">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                            <ShoppingBag className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">Rekomendasi Belanja</h2>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#EE4D2D]">
                                    <Sparkles className="h-3 w-3" /> Shopee
                                </span>
                            </div>
                            <p className="text-xs md:text-sm text-white/85">Pilihan terbaik pilihan TIMES, langsung checkout!</p>
                        </div>
                    </div>
                    <Link
                        href="/kanal/commerce"
                        className="hidden md:inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#EE4D2D] transition hover:bg-white/90"
                    >
                        Lihat Semua <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Carousel produk */}
                <Carousel opts={{ align: 'start', loop: true }} className="w-full">
                    <Carousel.Content className="-ml-4">
                        {news.length === 0 &&
                            [1, 2, 3, 4].map((i) => (
                                <Carousel.Item key={i} className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                    <div className="p-1 h-full"><CardImageSkeleton /></div>
                                </Carousel.Item>
                            ))}

                        {news.map((item, index) => (
                            <Carousel.Item key={item.news_id ?? index} className="pl-4 min-w-0 shrink-0 grow-0 basis-9/12 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                <Link href={item.url_ci4 || '#'} className="group block h-full">
                                    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={item.news_image_new}
                                                alt={item.news_title}
                                                fill
                                                loading="lazy"
                                                quality={65}
                                                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {index < 3 && (
                                                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-[#EE4D2D] px-2 py-0.5 text-[10px] font-bold text-white shadow">
                                                    <Flame className="h-3 w-3" /> HOT
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col p-3">
                                            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-800 group-hover:text-[#EE4D2D]">
                                                {item.news_title}
                                            </h3>
                                            <div className="mt-3 inline-flex items-center justify-center gap-1 rounded-lg bg-[#EE4D2D] px-3 py-2 text-xs font-bold text-white transition group-hover:bg-[#d8431f]">
                                                <ShoppingBag className="h-3.5 w-3.5" /> Belanja Sekarang
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>
                    <Carousel.Previous position="outer" />
                    <Carousel.Next position="outer" />
                </Carousel>
            </div>
        </div>
    )
}

export default CommerceSection
