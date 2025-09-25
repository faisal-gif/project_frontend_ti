'use client';
import ArticleContent from '@/components/ArticleContent';
import EkoranNewsDetailCard from '@/components/EkoranNewsDetailCard';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GoogleAds from '@/components/GoogleAds';
import ModalShare from '@/components/ModalShare';
import PopularNews from '@/components/PopularNews';
import Card from '@/components/ui/Card';
import NewsDetailSkeleton from '@/components/ui/NewsDetailSkeleton';
import { getEditorDetail } from '@/lib/api/editor';
import { getAllNews, getNewsDetail, updateView } from '@/lib/api/newsApi';
import { getNewsSecondSections } from '@/lib/data';
import { Car, Share, Share2, User, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getFocusDetail } from '@/lib/api/focus';

function NewsDetailClient({ initialNewsDetail }) {

    const [size, setSize] = useState(2);
    const [newsDetail] = useState(initialNewsDetail);
    const [editorDetail, setEditorDetail] = useState(null);
    const [focusDetail, setFocusDetail] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);

    useEffect(() => {
        if (newsDetail) {
            getEditorDetail({ slug: newsDetail.editor_alias }).then(setEditorDetail).catch(console.error);
        }
    }, [newsDetail]);

    if (Number(newsDetail.focnews_id) !== 0) {
        useEffect(() => {
            if (newsDetail) {
                getFocusDetail({ id: newsDetail.focnews_id }).then(setFocusDetail).catch(console.error);
            }
        }, [newsDetail])
    }


    useEffect(() => {
        if (newsDetail) {
            updateView({ id: newsDetail.news_id });
        }
    }, [newsDetail]);

    const tim = [
        { name: newsDetail?.news_writer || '', role: "Penulis", foto: null, url: `/writer/${newsDetail?.writer_slug}` || '' },
        { name: newsDetail?.editor_name || '', role: "Editor", foto: editorDetail?.editor_image || null, url: `/editor/${newsDetail?.editor_alias}` || '' },
        { name: newsDetail?.publisher_name || '', role: "Publisher", foto: null, url: '' }
    ];

    const getTags = () => {
        if (!newsDetail || !newsDetail.news_tags) return [];
        return newsDetail.news_tags.split(',').map(tag => tag.trim()).filter(Boolean);
    };

    const firstTag = getTags()[0] || '';

    useEffect(() => {
        if (firstTag) {
            getAllNews({ news_type: 'tag', title: firstTag, limit: 5, offset: 0 }).then(setRelatedNews).catch(console.error);
        }
    }, [firstTag]);

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date; // selisih dalam ms
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMinutes < 1) {
            return "just now";
        } else if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }

        // fallback pakai format lokal
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const [newsSecondSections, setNewsSecondSections] = useState([]);

    useEffect(() => {
        getNewsSecondSections().then(setNewsSecondSections).catch(console.error);
    }, []);


    const slugify = (text) =>
        text
            .toLowerCase()
            .replace(/\s+/g, "-")       // ganti spasi dengan -
            .replace(/[^\w\-]+/g, "")   // hapus karakter non-alfanumerik
            .replace(/\-\-+/g, "-")     // ganti multiple - jadi satu
            .replace(/^-+/, "")         // hapus - di awal
            .replace(/-+$/, "");        // hapus - di akhir

    return (
        <div className="max-w-6xl mx-auto px-4 py-24 ">

            <div className='flex items-center justify-center'>
                <GoogleAds size='top_banner' />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-20'>
                {!newsDetail ? (
                    <NewsDetailSkeleton />
                ) : (
                    <>
                        <main className="col-span-1" >
                            <article className="rounded-lg overflow-hidden">
                                <span className="badge badge-primary badge-outline py-1 rounded-full text-sm font-medium">
                                    {newsDetail.catnews_title}
                                </span>
                                <div className="py-4 md:py-2">


                                    {focusDetail && (
                                        <Link href={focusDetail.urlPath} className="btn btn-error btn-xs btn-outline py-1 rounded-full text-sm font-medium">
                                            {focusDetail.focnews_title}
                                        </Link>
                                    )}
                                </div>

                                <div className="py-4 md:py-2">
                                    {/* Title */}
                                    <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-snug">
                                        {newsDetail.news_title}
                                    </h1>
                                    {/* Description */}
                                    <p className="text-base md:text-lg text-base-content/50 mb-6 leading-relaxed">
                                        {newsDetail.news_description}
                                    </p>
                                </div>
                                {/* Meta */}
                                <div className="flex flex-col gap-4 border-b border-base-content/20 pb-4 mb-6 text-sm text-muted-foreground">
                                    <div className="flex flex-row items-center gap-1">
                                        <span className='font-bold'>TIMES Indonesia</span>
                                        <span className="inline">-</span>
                                        <span>{formatDate(newsDetail.news_datepub)}</span>
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
                                        <div className="flex flex-col justify-center items-center my-6">
                                            {focusDetail && focusDetail.focnews_image_news && (
                                                <Image
                                                    src={focusDetail.focnews_image_news}
                                                    alt={focusDetail.focnews_title}
                                                    width={750}
                                                    height={500}
                                                    className="h-auto max-h-[500px] w-full object-contain rounded-2xl mb-4"
                                                    priority
                                                    fetchPriority="high"
                                                    sizes="(max-width: 768px) 100vw, 800px"
                                                />
                                            )}
                                            <Image
                                                src={newsDetail.news_image_new}
                                                alt={newsDetail.news_title}
                                                width={750}
                                                height={500}         // boleh 0 kalau fill off, Next.js akan hitung otomatis
                                                className="h-auto max-h-[500px] w-full object-contain"
                                                priority
                                                fetchPriority="high"
                                                sizes="(max-width: 768px) 100vw, 800px"
                                            />
                                        </div>
                                        <div className="text-sm text-base-content/50 pt-2">{newsDetail.news_caption} </div>

                                        {/* Content News */}
                                        <ArticleContent
                                            htmlContent={newsDetail.news_content}
                                            getTextSizeClasses={getTextSizeClasses}
                                            readAlsoArticles={relatedNews}
                                            lokus={newsDetail.news_city}
                                            url={newsDetail.url_ci4}
                                            className="mt-8 prose prose-sm sm:prose-base md:prose-lg max-w-none prose-a:text-red-800 prose-a:no-underline"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-base-content/20 flex flex-wrap gap-2">
                                    {getTags().map((tag) => (
                                        <Link
                                            key={tag}
                                            href={`/tag/${slugify(tag)}`}
                                            className="badge badge-soft text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-base-200 transition"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>

                                {newsDetail.news_writer && (
                                    <div className="mt-8 pt-6 border-t border-base-content/20">
                                        <Card className="bg-gradient-to-r from-[#800b19] to-[#3e154f] p-9 flex md:flex-row flex-col items-center gap-8">
                                            <div className="avatar avatar-placeholder" >
                                                <div className="bg-neutral text-neutral-content w-20 rounded-full ">
                                                    <span className="text-3xl">
                                                        {newsDetail?.news_writer.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-sm text-base-200/60'>Penulis</span>
                                                <span className='text-lg font-semibold text-white'>
                                                    {newsDetail?.news_writer}
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

                        {/* Float Menu */}
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


            <div className="mx-auto grid  grid-cols-1 md:grid-cols-2 gap-6 py-8 lg:grid-cols-3">
                {newsSecondSections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <FirstHightlightNewsSection title={section.title} news={section.news} />
                    </div>
                ))}
            </div>
            <ModalShare title={newsDetail.news_title} />
        </div>
    )
}

export default NewsDetailClient