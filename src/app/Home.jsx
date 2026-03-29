'use client';

import React, { use, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Skeletons
import FirstHighlightNewsSectionSkeleton from '@/components/ui/FirstHighlightNewsSectionSkeleton';
import HorizontalNewsCardSkeleton from '@/components/ui/HorizontalNewsCardSkeleton';
import HeadlineCardSkeleton from '@/components/ui/HeadlineCardSkeleton';

// Imports Statis (TIDAK BOLEH DYNAMIC karena berada di Above the Fold / LCP)
import FirstHighlightHorizontalNewsSection from '@/components/FirstHighlightHorizontalNewsSection';
import TopikPilihanWidget from '@/components/TopikPilihanWidget';
import HeadlineNewsHome from '@/components/HeadlineNewsHome';

// Dynamic Imports (Aman karena berada di Below the Fold)
const FirstHightlightNewsSection = dynamic(() => import('@/components/FirstHightlightNewsSection'));
const EKoranSection = dynamic(() => import('@/components/EKoranSection'));
const GallerySection = dynamic(() => import('@/components/GallerySection'));
const LastestNewsSection = dynamic(() => import('@/components/LastestNewsSection'));
const PopularNews = dynamic(() => import('@/components/PopularNews'));
const CekFaktaCard = dynamic(() => import('@/components/CekFaktaCard'));
const EventWidget = dynamic(() => import('@/components/EventWidget'));
const GoogleAds = dynamic(() => import('@/components/GoogleAds'));
const AdsCarouselGroup = dynamic(() => import('@/components/AdsCarouselGroup'));
const LazyAdsRectangleCarousel = dynamic(() => import('@/components/AdsRectangleCarousel'));


// =========================================================================
// ASYNC WRAPPERS (Untuk membuka Promise dari server tanpa memblokir UI)
// =========================================================================

function AsyncAllNews({ promise }) {
    const news = promise ? use(promise) : [];
    if (!news || news.length === 0) return null;
    return <FirstHightlightNewsSection url="#terbaru_jelajah_berita" index={0} title={'Berita Terbaru'} news={news} />;
}

function AsyncFirstSections({ promise }) {
    const sections = promise ? use(promise) : [];
    if (!sections || sections.length === 0) return null;
    return sections.map((section) => (
        <div key={section.title} className="space-y-8">
            <FirstHightlightNewsSection url={section.url} index={0} title={section.title} news={section.news} layout={section.layout} />
        </div>
    ));
}

function AsyncSecondSections({ promise }) {
    const sections = promise ? use(promise) : [];
    if (!sections || sections.length === 0) return null;
    return sections.map((section) => (
        <div key={section.title} className="space-y-8">
            <FirstHightlightNewsSection url={section.url} title={section.title} news={section.news} layout={section.layout} />
        </div>
    ));
}

function AsyncWansusNews({ promise }) {
    const news = promise ? use(promise) : [];
    if (!news || news.length === 0) return null;
    return <FirstHighlightHorizontalNewsSection url='/kanal/wawancara-khusus/' articles={news} />;
}

function AsyncCekFakta({ promise }) {
    const news = promise ? use(promise) : [];
    return <CekFaktaCard CekFaktaNews={news} />;
}

function AsyncGoogleAds({ promise, size, type, slot }) {
    const adsData = promise ? use(promise) : null;
    return <GoogleAds size={size} type={type} adsEksternal={adsData} slot={slot} />;
}

function AsyncAdsCarousel({ p1, p2, p3 }) {
    const ads1 = p1 ? use(p1) : null;
    const ads2 = p2 ? use(p2) : null;
    const ads3 = p3 ? use(p3) : null;
    return <LazyAdsRectangleCarousel ads1={ads1} ads2={ads2} ads3={ads3} />;
}

function AsyncAdsCarouselGroup({ promise }) {
    const adsArray = promise ? use(promise) : [];
    return <AdsCarouselGroup adsArray={Array.isArray(adsArray) ? adsArray : []} />;
}


// =========================================================================
// KOMPONEN UTAMA
// =========================================================================

function Home({
    // --- DATA MATANG (Above the Fold) ---
    initialHeadlineNews,
    initialAdsPremium,
    initialAdsPremiumMobile,

    // --- PROMISES (Below the Fold) ---
    newsFirstSectionsPromise,
    newsSecondSectionsPromise,
    allNewsPromise,
    wansusNewsPromise,
    initialCekFaktaNewsPromise,
    initialAdsLeaderboard1Promise,
    initialAdsLeaderboard2Promise,
    initialAdsRectangle1Promise,
    initialAdsRectangle2Promise,
    initialAdsRectangle3Promise,
    initialAdsRectangle4Promise,
    initialAdsRectangle5Promise,
    initialAdsRectangle6Promise,
    initialAdsRectangle7Promise,
    initialAdsRectangle8Promise,
    initialAdsRectangle9Promise,
    initialAdsRectangle10Promise,
    initialAdsListRectangle11Promise,
    initialAdsRectangleLeaderboard1Promise,
    initialAdsRectangleLeaderboard2Promise,
}) {

    return (
        <div className="">
            {/* --- IKLAN PREMIUM (Tampil Instan) --- */}
            <div className='max-w-6xl mx-auto gap-6 pt-28 pb-8 px-4'>
                <div className='hidden md:flex items-center justify-center'>
                    <GoogleAds size='top_banner' adsEksternal={initialAdsPremium} slot='6315037307' />
                </div>
                <div className='md:hidden flex items-center justify-center'>
                    <GoogleAds size='inline_rectangle' type='mobile' adsEksternal={initialAdsPremiumMobile} slot='9639204649' />
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pb-2 md:pb-8 px-4 md:grid-cols-6">
                <div className="md:col-span-4">
                    {/* Headline langsung menggunakan data array, import statis, tanpa Suspense */}
                    <HeadlineNewsHome initialHeadlineNews={initialHeadlineNews} />
                </div>
                <div className="md:col-span-2">
                    {/* Berita Terbaru (All News) - Streaming */}
                    <Suspense fallback={<div className="space-y-8"><FirstHighlightNewsSectionSkeleton /></div>}>
                        <AsyncAllNews promise={allNewsPromise} />
                    </Suspense>
                </div>
            </div>

            {/* --- FIRST SECTIONS --- */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
                <Suspense fallback={[1, 2, 3].map((i) => <div key={i} className="space-y-8"><FirstHighlightNewsSectionSkeleton /></div>)}>
                    <AsyncFirstSections promise={newsFirstSectionsPromise} />
                </Suspense>
            </div>

            {/* --- LEADERBOARD 1 --- */}
            <div className="mx-auto max-w-6xl">
                <div className='hidden md:flex items-center justify-center mb-8'>
                    <Suspense fallback={<div className="w-[970px] h-[250px] bg-gray-100 animate-pulse rounded"></div>}>
                        <AsyncGoogleAds promise={initialAdsLeaderboard1Promise} size="top_banner" slot='6315037307' />
                    </Suspense>
                </div>
            </div>

            {/* --- RECTANGLE LEADERBOARD 1 (Mobile) --- */}
            <div className='flex md:hidden items-center justify-center'>
                <Suspense fallback={<div className="w-[336px] h-[400px] bg-gray-100 animate-pulse rounded"></div>}>
                    <AsyncGoogleAds promise={initialAdsRectangleLeaderboard1Promise} size='rectangle' type='mobile' slot='6315037307' />
                </Suspense>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-8">
                <EKoranSection />
            </div>

            {/* --- LEADERBOARD 2 --- */}
            <div className="hidden md:block mx-auto max-w-6xl">
                <div className='flex items-center justify-center mb-8'>
                    <Suspense fallback={<div className="w-[970px] h-[250px] bg-gray-100 animate-pulse rounded"></div>}>
                        <AsyncGoogleAds promise={initialAdsLeaderboard2Promise} size="top_banner" slot='6315037307' />
                    </Suspense>
                </div>
            </div>

            {/* --- RECTANGLE LEADERBOARD 2 (Mobile) --- */}
            <div className='flex md:hidden items-center justify-center'>
                <Suspense fallback={<div className="w-[336px] h-[400px] bg-gray-100 animate-pulse rounded"></div>}>
                    <AsyncGoogleAds promise={initialAdsRectangleLeaderboard2Promise} size='rectangle' type='mobile' slot='6315037307' />
                </Suspense>
            </div>

            {/* --- SECOND SECTIONS --- */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
                <Suspense fallback={[1, 2, 3].map((i) => <div key={i} className="space-y-8"><FirstHighlightNewsSectionSkeleton /></div>)}>
                    <AsyncSecondSections promise={newsSecondSectionsPromise} />
                </Suspense>
            </div>

            {/* --- ADS RECTANGLE CAROUSEL 1 --- */}
            <Suspense fallback={<div className="h-[280px] w-full bg-gray-50 animate-pulse"></div>}>
                <AsyncAdsCarousel p1={initialAdsRectangle1Promise} p2={initialAdsRectangle2Promise} p3={initialAdsRectangle3Promise} />
            </Suspense>

            {/* --- WANSUS & TOPIK PILIHAN --- */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-6">
                <div className='md:col-span-4'>
                    <Suspense fallback={
                        <>
                            <HeadlineCardSkeleton />
                            <div className="animate-pulse grid grid-cols-4 gap-2 mt-4">
                                {[1, 2, 3, 4].map((index) => (
                                    <div key={index} className="pl-2 min-w-0 shrink-0 grow-0 basis-4/9 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                                        <div className="h-full"><HorizontalNewsCardSkeleton /></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }>
                        <AsyncWansusNews promise={wansusNewsPromise} />
                    </Suspense>
                </div>
                <div className='md:col-span-2'>
                    <TopikPilihanWidget />
                </div>
            </div>

            {/* --- ADS RECTANGLE CAROUSEL 2 --- */}
            <Suspense fallback={<div className="h-[280px] w-full bg-gray-50 animate-pulse"></div>}>
                <AsyncAdsCarousel p1={initialAdsRectangle4Promise} p2={initialAdsRectangle5Promise} p3={initialAdsRectangle6Promise} />
            </Suspense>

            <EventWidget />

            {/* --- ADS RECTANGLE CAROUSEL 3 --- */}
            <Suspense fallback={<div className="h-[280px] w-full bg-gray-50 animate-pulse"></div>}>
                <AsyncAdsCarousel p1={initialAdsRectangle7Promise} p2={initialAdsRectangle8Promise} p3={initialAdsRectangle9Promise} />
            </Suspense>

            {/* --- GALLERY SECTION --- */}
            <section className="max-w-6xl mx-auto px-4 py-8 border-t-2 border-base-300">
                <GallerySection />
            </section>

            {/* --- ADS CAROUSEL GROUP --- */}
            <Suspense fallback={<div className="h-[250px] w-full bg-gray-50 animate-pulse"></div>}>
                <AsyncAdsCarouselGroup promise={initialAdsListRectangle11Promise} />
            </Suspense>

            {/* --- LATEST NEWS & SIDEBAR --- */}
            <div className="max-w-6xl mx-auto px-4 py-8 max-md:px-4" id="jelajah_berita">
                <div className='grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-4'>
                    <div className="order-2 md:order-1 md:col-span-4 lg:col-span-4">
                        <LastestNewsSection />
                    </div>
                    
                    <div className="order-1 md:order-2 md:block md:col-span-2 lg:col-span-2">
                        <PopularNews />
                        
                        <div className='flex items-center justify-center mb-8'>
                            <Suspense fallback={<div className="w-[336px] h-[280px] bg-gray-100 animate-pulse rounded"></div>}>
                                <AsyncGoogleAds promise={initialAdsRectangle10Promise} size='inline_rectangle' slot='9639204649' />
                            </Suspense>
                        </div>
                        
                        <div>
                            <Suspense fallback={<div className="h-[400px] w-full bg-gray-100 animate-pulse rounded"></div>}>
                                <AsyncCekFakta promise={initialCekFaktaNewsPromise} />
                            </Suspense>
                        </div>

                        <div className='sticky top-30'>
                            <div className='hidden md:flex items-center justify-center my-8'>
                                <GoogleAds size='inline_rectangle' slot='9639204649' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;