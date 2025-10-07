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
import { getAllNews, updateView } from '@/lib/api/newsApi';
import { Eye, Share2, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect, useState } from 'react'
import { getFocusDetail } from '@/lib/api/focus';
import FormattedDate from '@/utils/date/FormattedDate';
import FormattedViews from '@/utils/view/FormattedViews';
import { getNewsFirstSectionsClient } from '@/lib/data';
import ClientOnly from '@/components/ClientOnly';

function NewsDetailClient({ initialNewsDetail, initialWriter }) {


    const [size, setSize] = useState(2);
    const [newsDetail] = useState(initialNewsDetail);
    const [writerDetail] = useState(initialWriter);
    const [editorDetail, setEditorDetail] = useState(null);
    const [focusDetail, setFocusDetail] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [newsViews, setNewsViews] = useState([]);
    const [newsFirstSections, setNewsFirstSections] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    // Hooks selalu dipanggil, logic conditional di dalam
    useEffect(() => {
        if (newsDetail) {
            getEditorDetail({ slug: newsDetail.editor_alias }).then(setEditorDetail).catch(console.error);

            if (Number(newsDetail.focnews_id) !== 0) {
                getFocusDetail({ id: newsDetail.focnews_id }).then(setFocusDetail).catch(console.error);
            }

            const firstTag = (newsDetail.news_tags?.split(',').map(tag => tag.trim()).filter(Boolean)[0]) || '';
            if (firstTag) {
                getAllNews({ news_type: 'tag', title: firstTag, limit: 5, offset: 0 }).then(setRelatedNews).catch(console.error);
            }
            updateView({ id: newsDetail.news_id }).then(setNewsViews).catch(console.error);
        }
    }, [newsDetail]);


    useEffect(() => {
        getNewsFirstSectionsClient().then(setNewsFirstSections).catch(console.error)
        setIsMounted(true);
    }, []);

    const tim = [
        { name: writerDetail?.name || '', role: "Penulis", foto: writerDetail?.image, url: `/writer/${writerDetail.slug}` || '' },
        { name: newsDetail?.editor_name || '', role: "Editor", foto: editorDetail?.editor_image || null, url: `/editor/${newsDetail?.editor_alias}` || '' },
        { name: newsDetail?.publisher_name || '', role: "Publisher", foto: null, url: '' }
    ];

    const getTags = () => {
        if (!newsDetail || !newsDetail.news_tags) return [];
        return newsDetail.news_tags.split(',').map(tag => tag.trim()).filter(Boolean);
    };

    const getTextSizeClasses = () => {
        switch (size) {
            case 1: return 'text-sm md:text-base';
            case 2: return 'text-base md:text-lg';
            case 3: return 'text-lg md:text-xl';
            default: return 'text-base md:text-lg';
        }
    };


    const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");


    return (
        <div className="max-w-6xl mx-auto px-4 py-24 ">

            <div className='hidden md:flex items-center justify-center'>
                <GoogleAds size='top_banner' />
            </div>

            <div className="breadcrumbs text-sm mt-6">
                <ul>
                    <li className='hover:text-[#b41d1d]'><Link href={'/'}>Home</Link></li>
                    <li className='hover:text-[#b41d1d]'><Link href={`/kanal/${newsDetail.catnews_slug}`}>{newsDetail.catnews_title}</Link></li>
                    <li className='text-[#b41d1d] font-semibold'>{newsDetail.news_title}</li>
                </ul>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-6'>
                {!newsDetail ? (
                    <NewsDetailSkeleton />
                ) : (
                    <>
                        <main className="col-span-1" >
                            <article className="rounded-lg overflow-hidden">
                                <Link href={`/kanal/${newsDetail.catnews_slug}`} className="btn btn-sm bg-[#b41d1d] text-white py-1 rounded-full text-sm font-medium">
                                    {newsDetail.catnews_title}
                                </Link>
                                {focusDetail && (
                                    <div className="py-4 md:py-2">
                                        <Link href={focusDetail.urlPath} className="btn btn-error btn-xs btn-outline py-1 rounded-full text-sm font-bold">
                                            {focusDetail.focnews_title}
                                        </Link>
                                    </div>
                                )}

                                <div className="py-4 md:py-2">
                                    {/* Title */}
                                    <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4 leading-snug">
                                        {newsDetail.news_title}
                                    </h1>
                                    {/* Description */}
                                    <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed italic">
                                        {newsDetail.news_description}
                                    </p>
                                </div>
                                {/* Meta */}
                                <div className="flex flex-col gap-4 border-b border-base-content/20 pb-4 mb-6 text-sm text-muted-foreground">
                                    <div className="flex flex-row items-center gap-1">
                                        <span className='font-bold'>TIMES Indonesia</span>
                                        <span className="inline">-</span>
                                        <span>
                                            <ClientOnly>
                                                {new Date(newsDetail.news_datepub).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })
                                                }
                                            </ClientOnly>
                                        </span>
                                        <span className="font-bold">-</span>
                                        <span className='flex flex-row gap-1 items-center pl-1'>
                                            <Eye size={16} />
                                            <div>
                                                <FormattedViews count={newsViews.pageviews} />
                                            </div>
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
                                                                            <Image
                                                                                src={tim.foto}
                                                                                alt={tim.name}
                                                                                width={32}
                                                                                height={32}
                                                                                loading='lazy'
                                                                            />
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
                                                                                <Image
                                                                                    src={tim.foto}
                                                                                    alt={tim.name}
                                                                                    width={32}
                                                                                    height={32}
                                                                                    loading='lazy'
                                                                                />
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
                                        <div className="flex flex-col justify-center items-center my-2">
                                            {focusDetail && focusDetail.focnews_image_body && (
                                                <Image
                                                    src={focusDetail.focnews_image_body}
                                                    alt={focusDetail.focnews_title}
                                                    width={380}
                                                    height={250}
                                                    className="h-auto max-h-[500px] w-full object-contain rounded-2xl mb-4"
                                                    priority
                                                    fetchPriority="high"

                                                />
                                            )}
                                            <div className="w-[340px] h-[252px] md:w-[750px] md:h-[500px] relative">

                                                <Image
                                                    src={newsDetail.news_image_new}
                                                    alt={newsDetail.news_title}
                                                    fill
                                                    className="object-contain"
                                                    priority
                                                    fetchPriority="high"
                                                    sizes="(max-width: 768px) 300px, 750px"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 pt-2">{newsDetail.news_caption} </div>

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
                                    {getTags().map((tag, index) => (
                                        <Link
                                            key={index}
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
                                            <div className="avatar avatar-placeholder"  >
                                                {writerDetail.image ? (
                                                    <div className="w-20 bg-neutral rounded-full">
                                                        <Image
                                                            src={writerDetail.image}
                                                            alt={writerDetail.name}
                                                            width={64}
                                                            height={64}
                                                            loading='lazy'
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="bg-neutral text-neutral-content w-20 rounded-full flex items-center justify-center">
                                                        <span className="text-3xl">
                                                            {writerDetail.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-sm text-base-200/60'>Penulis</span>
                                                <span className='text-lg font-semibold text-white'>
                                                    {newsDetail?.news_writer}
                                                </span>
                                                <span className='text-sm text-white/80 mt-2'>
                                                    {writerDetail.bio ? writerDetail.bio :
                                                        " Penulis lepas yang telah bergabung dengan TIMES Indonesia sejak tahun 2020. Memiliki minat khusus dalam peliputan berita sosial dan budaya."}
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
                                    <button tabIndex={0} className="btn btn-ghost text-lg font-bold">
                                        <Volume2 className="w-5 h-5" />
                                        <span className='sr-only'>Listen</span>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => document.getElementById('modal_share').showModal()} className="btn btn-ghost text-lg font-bold">
                                        <Share2 className="w-5 h-5 cursor-pointer" />
                                        <span className='sr-only'>Share</span>
                                    </button>
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
                {newsFirstSections.map((section, index) => (
                    <div key={index} className="space-y-8">
                        <FirstHightlightNewsSection title={section.title} news={section.news} />
                    </div>
                ))}
            </div>
            <ModalShare title={newsDetail.news_title} url={`${process.env.NEXT_PUBLIC_URL}${newsDetail.url_ci4}`} />

        </div>
    )
}

export default NewsDetailClient