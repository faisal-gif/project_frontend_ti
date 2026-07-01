'use client';
import ArticleContent from '@/components/ArticleContent';
import EkoranNewsDetailCard from '@/components/EkoranNewsDetailCard';
import GoogleAds from '@/components/GoogleAds';
import PopularNews from '@/components/PopularNews';
import Card from '@/components/ui/Card';
import NewsDetailSkeleton from '@/components/ui/NewsDetailSkeleton';
import { getEditorDetail } from '@/lib/api/editor';
import { getFotoSlide } from '@/lib/api/fotoApi';
import { Eye, LayoutGrid, Image as ImageIcon, Maximize2, Share2, Volume2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

import ModalShare from '@/components/ModalShare';
import FormattedDate from '@/utils/date/FormattedDate';
import ClientOnly from '@/components/ClientOnly';
import FormattedViews from '@/utils/view/FormattedViews';

function FotoDetail({ initialFotoDetail, initialWriter }) {
    const [size, setSize] = useState(2);
    const [fotoDetail] = useState(initialFotoDetail);
    const [writerDetail] = useState(initialWriter);
    const [editorDetail, setEditorDetail] = useState(null);
    const [foto, setFoto] = useState([]);
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (fotoDetail) {
            getEditorDetail({ slug: fotoDetail.editor_alias }).then(setEditorDetail).catch(console.error);
        }
    }, [fotoDetail]);

    useEffect(() => {
        if (fotoDetail) {
            getFotoSlide({ id: fotoDetail.gal_id }).then(setFoto).catch(console.error);
        }
    }, [fotoDetail]);

    const tim = [
        { name: fotoDetail?.gal_pewarta || '', role: 'Fotografer', foto: writerDetail?.image || null, url: `/writer/${fotoDetail?.writer_slug}` || '' },
        { name: editorDetail?.editor_name || '', role: 'Editor', foto: editorDetail?.editor_image || null, url: `/editor/${fotoDetail?.editor_alias}` || '' },
        { name: fotoDetail?.publisher_name || '', role: 'Publisher', foto: null, url: '' },
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

    const openAt = (i) => {
        setIndex(i);
        setOpen(true);
    };

    const coverImage = foto[0]?.gi_image || fotoDetail.news_image_new;
    const galleryRest = foto.slice(1);

    return (
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-24 ">
            <div className="hidden md:flex items-center justify-center">
                <GoogleAds size="top_banner" slot="6315037307" />
            </div>

            <div className="md:hidden flex items-center justify-center">
                <GoogleAds size="inline_rectangle" slot="9639204649" />
            </div>

            <div className="breadcrumbs text-sm my-6">
                <ul>
                    <li className="hover:text-[#b41d1d]"><Link href={'/'}>Home</Link></li>
                    <li className="hover:text-[#b41d1d] "><Link href={`/foto`}>Foto</Link></li>
                    <li className="text-[#b41d1d] font-semibold"><Link href={`${fotoDetail.url_ci4}`}>{fotoDetail.gal_title}</Link></li>
                </ul>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_320px] gap-8 mt-10">
                {!fotoDetail ? (
                    <NewsDetailSkeleton />
                ) : (
                    <>
                        <main className="col-span-1">
                            <article>
                                {/* ===== MAGAZINE COVER: judul overlay di atas foto pertama ===== */}
                                <div className="relative overflow-hidden rounded-2xl bg-neutral-900 aspect-[16/10] md:aspect-[16/9]">
                                    {coverImage && (
                                        <button
                                            onClick={() => openAt(0)}
                                            aria-label="Perbesar foto sampul"
                                            className="absolute inset-0 h-full w-full cursor-zoom-in"
                                        >
                                            <Image
                                                src={coverImage}
                                                alt={fotoDetail.gal_title}
                                                fill
                                                priority
                                                sizes="(max-width: 1024px) 100vw, 900px"
                                                className="object-cover"
                                            />
                                        </button>
                                    )}

                                    {/* Gradient supaya teks terbaca */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                                    {/* Counter foto */}
                                    {foto.length > 0 && (
                                        <div className="pointer-events-none absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                                            <ImageIcon size={13} /> {foto.length} foto
                                        </div>
                                    )}

                                    {/* Overlay judul + meta */}
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 md:p-7">
                                        <span className="mb-3 inline-block rounded-full bg-[#b41d1d] px-4 py-1 text-xs font-medium text-white">
                                            {fotoDetail.galcat_title}
                                        </span>
                                        <h1 className="mb-3 max-w-3xl text-2xl font-bold leading-tight text-white md:text-4xl">
                                            {fotoDetail.gal_title}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/85 md:text-sm">
                                            <span className="font-semibold">TIMES Indonesia</span>
                                            <span className="opacity-50">·</span>
                                            <span>
                                                <ClientOnly>
                                                    <FormattedDate dateString={fotoDetail.gal_datepub} />
                                                </ClientOnly>
                                            </span>
                                            <span className="opacity-50">·</span>
                                            <span className="flex items-center gap-1">
                                                <Eye size={14} />
                                                <ClientOnly>
                                                    <FormattedViews count={fotoDetail.gal_view} />
                                                </ClientOnly>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Caption foto sampul */}
                                {foto[0]?.gi_caption && (
                                    <p className="mt-2 text-sm text-base-content/50">{foto[0].gi_caption}</p>
                                )}

                                {/* ===== DESKRIPSI + BARIS AKSI ===== */}
                                <div className="mt-5 flex flex-col gap-4 border-b border-base-content/20 pb-5">
                                    <p className="text-base leading-relaxed text-base-content/70 md:text-lg">
                                        {fotoDetail.gal_description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        {/* Tim redaksi */}
                                        <div className="dropdown">
                                            <button tabIndex={0} className="flex cursor-pointer flex-row items-center gap-3 text-sm font-semibold">
                                                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                                                    {tim.map((t, i) =>
                                                        t.name ? (
                                                            <div className="avatar avatar-placeholder" key={i}>
                                                                {t.foto ? (
                                                                    <div className="w-8 bg-neutral rounded-full">
                                                                        <img src={t.foto} alt={t.name} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex w-8 items-center justify-center rounded-full bg-neutral text-neutral-content">
                                                                        <span className="text-xs">{t.name.charAt(0).toUpperCase()}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : null
                                                    )}
                                                </div>
                                                <span className="hidden md:block">
                                                    {tim.filter((m) => m.name).map((m) => m.name).join(', ')}
                                                </span>
                                                <span className="md:hidden">Tim Redaksi</span>
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content menu w-80 rounded-sm bg-white shadow">
                                                {tim.map((t, i) =>
                                                    t.name ? (
                                                        <li key={i}>
                                                            <Link href={t.url} className="avatar avatar-placeholder">
                                                                {t.foto ? (
                                                                    <div className="w-8 bg-neutral rounded-full">
                                                                        <img src={t.foto} alt={t.name} />
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex w-8 items-center justify-center rounded-full bg-neutral text-neutral-content">
                                                                        <span className="text-xs">{t.name.charAt(0).toUpperCase()}</span>
                                                                    </div>
                                                                )}
                                                                <span>
                                                                    {t.name}
                                                                    <span className="text-xs text-base-content/50"> - {t.role}</span>
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ) : null
                                                )}
                                            </ul>
                                        </div>

                                        {/* Aksi (mobile) */}
                                        <div className="lg:hidden">
                                            <Card className="flex flex-row items-center py-2">
                                                <div className="dropdown dropdown-end">
                                                    <button tabIndex={0} className="btn btn-ghost btn-sm text-sm font-bold">Aa</button>
                                                    <div tabIndex={0} className="dropdown-content w-52 rounded-box bg-white p-3 shadow">
                                                        <input
                                                            type="range"
                                                            min={1}
                                                            max="3"
                                                            value={size}
                                                            onChange={(e) => setSize(Number(e.target.value))}
                                                            className="range range-xs"
                                                            step="1"
                                                        />
                                                        <div className="mt-2 flex justify-between px-2.5 text-sm font-semibold">
                                                            <span>A-</span>
                                                            <span>A</span>
                                                            <span>A+</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dropdown dropdown-end">
                                                    <button tabIndex={0} className="btn btn-ghost btn-sm text-sm font-bold">
                                                        <Volume2 className="h-5 w-5 cursor-pointer" />
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        onClick={() => document.getElementById('modal_share').showModal()}
                                                        className="btn btn-ghost btn-sm text-sm font-bold"
                                                    >
                                                        <Share2 className="h-5 w-5 cursor-pointer" />
                                                    </button>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== MOSAIC GALLERY (foto selain sampul) ===== */}
                                {galleryRest.length > 0 && (
                                    <div className="mt-8">
                                        <div className="mb-3 flex items-center gap-2">
                                            <LayoutGrid size={16} className="text-base-content/60" />
                                            <span className="text-sm font-semibold text-base-content/70">Galeri Foto</span>
                                        </div>
                                        <div className="columns-2 gap-3 md:columns-3 [column-fill:_balance]">
                                            {galleryRest.map((f, i) => {
                                                const realIndex = i + 1;
                                                return (
                                                    <button
                                                        key={f.gi_id ?? realIndex}
                                                        onClick={() => openAt(realIndex)}
                                                        aria-label={`Perbesar foto ${realIndex + 1}`}
                                                        className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-neutral-100 cursor-zoom-in"
                                                    >
                                                        <img
                                                            src={f.gi_image}
                                                            alt={f.gi_caption || `Foto ${realIndex + 1}`}
                                                            loading="lazy"
                                                            className="h-auto w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                                        />
                                                        <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                            <div className="flex w-full items-end justify-between gap-2 p-3">
                                                                {f.gi_caption ? (
                                                                    <span className="line-clamp-2 text-xs leading-snug text-white/90">
                                                                        {f.gi_caption}
                                                                    </span>
                                                                ) : (
                                                                    <span />
                                                                )}
                                                                <Maximize2 className="h-4 w-4 shrink-0 text-white" />
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <p className="mt-2 text-xs text-base-content/50">
                                            {foto.length} foto · klik untuk memperbesar
                                        </p>
                                    </div>
                                )}

                                {/* Fullscreen lightbox */}
                                <Lightbox
                                    open={open}
                                    close={() => setOpen(false)}
                                    index={index}
                                    slides={foto}
                                    plugins={[Thumbnails, Slideshow]}
                                    render={{
                                        slide: ({ slide }) => (
                                            <div className="relative h-[80vh] w-full">
                                                <Image
                                                    src={slide.gi_image}
                                                    alt={slide.gi_caption || slide.gi_id}
                                                    fill
                                                    sizes="(max-width: 900px) 100vw, 900px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        ),
                                    }}
                                    on={{ view: ({ index }) => setIndex(index) }}
                                />

                                {/* ===== CONTENT ===== */}
                                <ArticleContent
                                    htmlContent={fotoDetail.gal_content}
                                    getTextSizeClasses={getTextSizeClasses}
                                    readAlsoArticles={[]}
                                    url={fotoDetail.url_ci4}
                                    lokus={fotoDetail.gal_city}
                                    className="mt-8 prose prose-sm sm:prose-base md:prose-lg max-w-none prose-a:text-red-800 prose-a:no-underline"
                                />

                                {/* ===== WRITER CARD ===== */}
                                {writerDetail && fotoDetail?.gal_pewarta && (
                                    <div className="mt-8 border-t border-base-content/20 pt-6">
                                        <Card className="flex flex-col items-center gap-8 bg-gradient-to-r from-[#800b19] to-[#3e154f] p-9 md:flex-row">
                                            <div className="avatar avatar-placeholder">
                                                {writerDetail.image ? (
                                                    <div className="w-20 bg-neutral rounded-full">
                                                        <Image src={writerDetail.image} alt={writerDetail.name} width={64} height={64} loading="lazy" />
                                                    </div>
                                                ) : (
                                                    <div className="flex w-20 items-center justify-center rounded-full bg-neutral text-neutral-content">
                                                        <span className="text-3xl">{writerDetail.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <span className="text-sm text-base-200/60">Penulis</span>
                                                <span className="text-lg font-semibold text-white">
                                                    {fotoDetail?.gal_pewarta || writerDetail.name}
                                                </span>
                                                <span className="mt-2 text-sm text-white/80">
                                                    {writerDetail.bio
                                                        ? writerDetail.bio
                                                        : 'Penulis lepas yang telah bergabung dengan TIMES Indonesia sejak tahun 2020. Memiliki minat khusus dalam peliputan berita sosial dan budaya.'}
                                                </span>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </article>

                            <EkoranNewsDetailCard />
                        </main>

                        {/* Sticky action rail (desktop) */}
                        <div className="hidden lg:block w-16">
                            <Card className="sticky top-28 mt-8 flex flex-col items-center gap-4 py-2 shadow-md">
                                <div className="dropdown dropdown-left">
                                    <button tabIndex={0} className="btn btn-ghost text-lg font-bold">Aa</button>
                                    <div tabIndex={0} className="dropdown-content w-52 rounded-box bg-white p-3 shadow">
                                        <input
                                            type="range"
                                            min={1}
                                            max="3"
                                            value={size}
                                            onChange={(e) => setSize(Number(e.target.value))}
                                            className="range range-xs"
                                            step="1"
                                        />
                                        <div className="mt-2 flex justify-between px-2.5 text-sm font-semibold">
                                            <span>A-</span>
                                            <span>A</span>
                                            <span>A+</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown dropdown-end">
                                    <button tabIndex={0} className="btn btn-ghost text-lg font-bold">
                                        <Volume2 className="h-5 w-5" />
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() => document.getElementById('modal_share').showModal()}
                                        className="btn btn-ghost text-lg font-bold"
                                    >
                                        <Share2 className="h-5 w-5 cursor-pointer" />
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </>
                )}

                <aside className="hidden lg:block w-80">
                    <div className="sticky top-28">
                        <PopularNews />
                        <div className="flex items-center justify-center">
                            <GoogleAds size="inline_rectangle" />
                        </div>
                    </div>
                </aside>
            </div>

            <ModalShare title={fotoDetail?.gal_title} url={`${process.env.NEXT_PUBLIC_URL}${initialFotoDetail.url_ci4}`} />
        </div>
    );
}

export default FotoDetail;