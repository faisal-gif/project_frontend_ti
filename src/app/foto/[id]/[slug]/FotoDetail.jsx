'use client';
import ArticleContent from '@/components/ArticleContent';
import EkoranNewsDetailCard from '@/components/EkoranNewsDetailCard';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GoogleAds from '@/components/GoogleAds';
import PopularNews from '@/components/PopularNews';
import Card from '@/components/ui/Card';
import NewsDetailSkeleton from '@/components/ui/NewsDetailSkeleton';
import { getEditorDetail } from '@/lib/api/editor';
import { getFotoSlide } from '@/lib/api/fotoApi';
import { Share2, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";

import ModalShare from '@/components/ModalShare';
import FormattedDate from '@/utils/date/FormattedDate';

function FotoDetail({ initialFotoDetail }) {

    const [size, setSize] = useState(2);
    const [fotoDetail] = useState(initialFotoDetail);
    const [editorDetail, setEditorDetail] = useState(null);
    const [foto, setFoto] = useState([]);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const [autoplay, setAutoplay] = useState(true);
    const [delay, setDelay] = useState(3000);

    useEffect(() => {
        if (fotoDetail) {
            getEditorDetail({ slug: fotoDetail.editor_alias }).then(setEditorDetail).catch(console.error);
        }
    }, [fotoDetail]);


    useEffect(() => {
        if (fotoDetail) {
            getFotoSlide({ id: fotoDetail.gal_id }).then(setFoto).catch(console.error);
        }
    }, [fotoDetail])

    // useEffect(() => {
    //     if (fotoDetail) {
    //         updateView({ id: newsDetail.news_id });
    //     }
    // }, [newsDetail]);

    const tim = [
        { name: fotoDetail?.gal_pewarta || '', role: "Fotografer", foto: null, url: `/writer/${fotoDetail?.writer_slug}` || '' },
        { name: editorDetail?.editor_name || '', role: "Editor", foto: editorDetail?.editor_image || null, url: `/editor/${fotoDetail?.editor_alias}` || '' },
        { name: fotoDetail?.publisher_name || '', role: "Publisher", foto: null, url: '' }
    ];


    const getTextSizeClasses = () => {
        switch (size) {
            case 1:
                return 'text-sm md:text-base';
            case 2:
                return 'text-base md:text-lg';
            case 3:
                return 'text-lg md:text-xl';
            default:
                return 'text-base md:text-lg';
        }
    };

    const slugify = (text) =>
        text
            .toLowerCase()
            .replace(/\s+/g, "-")       // ganti spasi dengan -
            .replace(/[^\w\-]+/g, "")   // hapus karakter non-alfanumerik
            .replace(/\-\-+/g, "-")     // ganti multiple - jadi satu
            .replace(/^-+/, "")         // hapus - di awal
            .replace(/-+$/, "");        // hapus - di akhir

    return (
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-24 ">

            <div className='flex items-center justify-center'>
                <GoogleAds size='top_banner' />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-20'>
                {!fotoDetail ? (
                    <NewsDetailSkeleton />
                ) : (
                    <>
                        <main className="col-span-1" >
                            <article className="rounded-lg overflow-hidden">
                                <span className="badge badge-primary badge-outline px-4 py-1 rounded-full text-sm font-medium">
                                    {fotoDetail.galcat_title}
                                </span>
                                <div className="py-4 md:py-2">
                                    {/* Title */}
                                    <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-snug">
                                        {fotoDetail.gal_title}
                                    </h1>
                                    {/* Description */}
                                    <p className="text-base md:text-lg text-base-content/50 mb-6 leading-relaxed">
                                        {fotoDetail.gal_description}
                                    </p>
                                </div>
                                {/* Meta */}
                                <div className="flex flex-col gap-4 border-b border-base-content/20 pb-4 mb-6 text-sm text-muted-foreground">
                                    <div className="flex flex-row items-center gap-1">
                                        <span className='font-bold'>TIMES Indonesia</span>
                                        <span className="inline">-</span>
                                        <span>
                                            <FormattedDate dateString={fotoDetail.gal_datepub} />
                                        </span>
                                    </div>
                                    <div className='flex flex-row justify-between items-center'>
                                        <div className="dropdown">
                                            <button tabIndex={0} className="font-semibold flex flex-row items-center gap-3 cursor-pointer">
                                                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                                    {
                                                        tim.map((tim, index) => (
                                                            tim.name && (
                                                                <div className="avatar avatar-placeholder" key={index} >
                                                                    {tim.foto ? (
                                                                        <div className="w-8 bg-neutral rounded-full">
                                                                            <img src={tim.foto} alt={tim.name} />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
                                                                            <span className="text-xs">
                                                                                {tim.name.charAt(0).toUpperCase()}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        ))
                                                    }

                                                </div>
                                                {/* Nama anggota */}
                                                <span className='hidden md:block'>
                                                    {tim
                                                        .filter((m) => m.name) // hanya yg ada namanya
                                                        .map((m) => m.name)
                                                        .join(", ")}
                                                </span>
                                                <span className='md:hidden'>
                                                    Tim Redaksi
                                                </span>
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu bg-white rounded-sm w-80 shadow">
                                                {
                                                    tim.map((tim, index) => (
                                                        tim.name && (
                                                            <li key={index}>
                                                                <>
                                                                    <Link href={tim.url} className="avatar avatar-placeholder" >

                                                                        {tim.foto ? (
                                                                            <div className="w-8 bg-neutral rounded-full">
                                                                                <img src={tim.foto} alt={tim.name} />
                                                                            </div>
                                                                        ) : (
                                                                            <div className="bg-neutral text-neutral-content w-8 rounded-full flex items-center justify-center">
                                                                                <span className="text-xs">
                                                                                    {tim.name.charAt(0).toUpperCase()}
                                                                                </span>
                                                                            </div>
                                                                        )}

                                                                        <span className=''>
                                                                            {tim.name}
                                                                            <span className='text-xs text-base-content/50'> - {tim.role}</span>
                                                                        </span>

                                                                    </Link>
                                                                </>
                                                            </li>
                                                        )
                                                    ))
                                                }

                                            </ul>

                                        </div>
                                        <div className='lg:hidden'>
                                            <Card className="  py-2 flex flex-row items-center">
                                                <div className="dropdown dropdown-end">
                                                    <button tabIndex={0} className="btn btn-ghost btn-sm text-sm font-bold">Aa</button>
                                                    <div tabIndex={0} className="dropdown-content bg-white rounded-box w-52 p-3 shadow">
                                                        <input
                                                            type="range"
                                                            min={1}
                                                            max="3"
                                                            value={size}
                                                            onChange={(e) => setSize(Number(e.target.value))}
                                                            className="range range-xs"
                                                            step="1"
                                                        />
                                                        <div className="flex justify-between text-sm font-semibold mt-2 px-2.5">
                                                            <span>A-</span>
                                                            <span>A</span>
                                                            <span>A+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dropdown dropdown-end">
                                                    <button tabIndex={0} className="btn btn-ghost btn-sm text-sm font-bold"><Volume2 className="w-5 h-5 cursor-pointer" /></button>
                                                </div>
                                                <div>
                                                    <button onClick={() => document.getElementById('modal_share').showModal()} className="btn btn-ghost btn-sm text-sm font-bold"><Share2 className="w-5 h-5 cursor-pointer" /></button>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className='flex-1'>
                                        {/* Header Image */}
                                        <div className="flex justify-center items-center my-6">
                                            <Lightbox
                                                index={index}
                                                close={() => null}
                                                slides={foto}
                                                plugins={[Inline, Slideshow]}
                                                slideshow={{ autoplay, delay }}
                                                carousel={{
                                                    padding: 0,
                                                    spacing: 0,
                                                    imageFit: "cover",
                                                    finite: true
                                                }}
                                                inline={{
                                                    style: {
                                                        width: "100%",
                                                        maxWidth: "900px",
                                                        aspectRatio: "3 / 2", background: "transparent",

                                                    },
                                                }}
                                                animation={{ zoom: true }}

                                                render={{
                                                    slide: ({ slide }) => (
                                                        <div className="relative w-full h-full">
                                                            <Image
                                                                src={slide.gi_image}
                                                                alt="Gallery image"
                                                                fill
                                                                sizes="(max-width: 900px) 100vw, 900px"
                                                                className="object-cover"
                                                                onClick={() => setOpen(true)}

                                                            />
                                                        </div>
                                                    ),
                                                }}
                                                on={{
                                                    view: ({ index }) => setIndex(index),
                                                    click: () => setOpen(true),
                                                }}
                                            />
                                            {/* <Image
                                                src={newsDetail.news_image_new}
                                                alt={newsDetail.news_title}
                                                width={1200}
                                                height={800}         // boleh 0 kalau fill off, Next.js akan hitung otomatis
                                                className="h-auto max-h-[500px] w-full object-contain"
                                                priority
                                                fetchPriority="high"
                                                sizes="(max-width: 768px) 100vw, 800px"
                                            /> */}

                                            <Lightbox
                                                open={open}
                                                close={() => setOpen(false)}
                                                index={index}
                                                slides={foto}
                                                render={{
                                                    slide: ({ slide }) => (
                                                        <div className="relative w-full h-9/12">
                                                            <Image
                                                                src={slide.gi_image}
                                                                alt={slide.gi_id}
                                                                fill
                                                                sizes="(max-width: 900px) 100vw, 900px"
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ),
                                                }}
                                                on={{
                                                    view: ({ index }) => setIndex(index), // update index global
                                                }}
                                            />
                                        </div>
                                        <div className="text-sm text-base-content/50 pt-2">{foto[0]?.gi_caption} </div>

                                        {/* Content News */}
                                        <ArticleContent
                                            htmlContent={fotoDetail.gal_content}
                                            getTextSizeClasses={getTextSizeClasses}
                                            readAlsoArticles={[]}
                                            className="mt-8 prose prose-sm sm:prose-base md:prose-lg max-w-none prose-a:text-red-800 prose-a:no-underline"
                                        />
                                    </div>
                                </div>


                                {fotoDetail.gal_pewarta && (
                                    <div className="mt-8 pt-6 border-t border-base-content/20">
                                        <Card className="bg-gradient-to-r from-[#800b19] to-[#3e154f] p-9 flex md:flex-row flex-col items-center gap-8">
                                            <div className="avatar avatar-placeholder" >
                                                <div className="bg-neutral text-neutral-content w-20 rounded-full ">
                                                    <span className="text-3xl">
                                                        {fotoDetail?.gal_pewarta.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-sm text-base-200/60'>Fotografer</span>
                                                <span className='text-lg font-semibold text-white'>
                                                    {fotoDetail?.gal_pewarta}
                                                </span>
                                                <span className='text-sm text-white/80 mt-2'>
                                                    Penulis lepas yang telah bergabung dengan TIMES Indonesia sejak tahun 2020. Memiliki minat khusus dalam peliputan berita sosial dan budaya.
                                                </span>

                                            </div>

                                        </Card>

                                    </div>
                                )}


                            </article>

                            <EkoranNewsDetailCard />

                            {/* <ModalShare /> */}
                        </main>
                        <div className="hidden lg:block w-16">
                            <Card className=" shadow-md py-2 sticky top-28 flex flex-col items-center gap-4 mt-[29rem]">
                                <div className="dropdown dropdown-left">
                                    <button tabIndex={0} className="btn btn-ghost text-lg font-bold">Aa</button>
                                    <div tabIndex={0} className="dropdown-content bg-white rounded-box w-52 p-3 shadow">
                                        <input
                                            type="range"
                                            min={1}
                                            max="3"
                                            value={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
                                            className="range range-xs"
                                            step="1"
                                        />
                                        <div className="flex justify-between text-sm font-semibold mt-2 px-2.5">
                                            <span>A-</span>
                                            <span>A</span>
                                            <span>A+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost text-lg font-bold"><Volume2 className="w-5 h-5" /></button>
                                </div>
                                <div>
                                    <button onClick={() => document.getElementById('modal_share').showModal()} className="btn btn-ghost text-lg font-bold"><Share2 className="w-5 h-5 cursor-pointer" /></button>
                                </div>


                            </Card>
                        </div>
                    </>

                )}
                <aside className="hidden lg:block w-80">
                    <div className=" sticky top-28">
                        <PopularNews />

                        <div className='flex items-center justify-center'>
                            <GoogleAds size='inline_rectangle' />
                        </div>
                    </div>
                </aside>
            </div>

            <ModalShare title={fotoDetail?.gal_title} />
        </div>
    )
}

export default FotoDetail