'use client';

import BreakingNews from '@/components/BreakingNews';
import EKoranSection from '@/components/EKoranSection';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GallerySection from '@/components/GallerySection';
import GoogleAds from '@/components/GoogleAds';
import HeadlineNewsHome from '@/components/HeadlineNewsHome';
import HorizontalNewsSection from '@/components/HorizontalNewsSection';
import LastestNewsSection from '@/components/LastestNewsSection';
import PopularNews from '@/components/PopularNews';
import SimpleNewsSection from '@/components/SimpleNewsSection';
import VideoSection from '@/components/VideoSection';
import WeatherCard from '@/components/WeatherCard';
import { getAllNews } from '@/lib/api/newsApi';
import { getNewsFirstSections, getNewsSecondSections } from '@/lib/data';
import { Video } from 'lucide-react';
import { useEffect, useState } from 'react';



function Home() {


    const [newsFirstSections, setNewsFirstSections] = useState([]);
    const [newsSecondSections, setNewsSecondSections] = useState([]);
    const [allNews, setAllNews] = useState([]);

    useEffect(() => {
        getNewsFirstSections().then(setNewsFirstSections).catch(console.error);
        getNewsSecondSections().then(setNewsSecondSections).catch(console.error);
        getAllNews({
            news_type: "all",
            offset: 0,
            limit: 4,
        }).then(setAllNews).catch(console.error);
    }, []);




    return (
        <div className="">

            {/* Left Skyscraper Ad */}
            <div className="fixed left-6 top-7/12 transform -translate-y-1/2 z-10 hidden xl:block">
                <GoogleAds size="skyscraper" />
            </div>

            {/* Right Skyscraper Ad */}
            <div className="fixed right-6 top-7/12 transform -translate-y-1/2 z-10 hidden xl:block">
                <GoogleAds size="skyscraper" />
            </div>

            <div className='max-w-6xl mx-auto gap-6 pt-18 pb-8 px-4'>
                <div className='flex items-center justify-center mb-8'>
                    <GoogleAds size='top_banner' />
                </div>
            </div>
            {/* Hero */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pb-8 px-4 md:grid-cols-6">
                <div className="md:col-span-4">
                    <HeadlineNewsHome />
                </div>
                <div className="md:col-span-2">
                    <SimpleNewsSection title={'Berita Terbaru'} news={allNews} />
                </div>
            </div>


            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">
                {newsFirstSections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <FirstHightlightNewsSection title={section.title} news={section.news} />
                    </div>
                ))}
            </div>

            <div className="mx-auto max-w-6xl ">
                <div className='flex items-center justify-center mb-8'>
                    <GoogleAds size="leaderboard" />
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-8 ">
                <EKoranSection />
            </div>

            <section className="max-w-6xl mx-auto px-4 py-12 max-md:px-4 border-t-2 border-base-300" >
                <HorizontalNewsSection />
            </section>


            {/* Jurnalistik Fotografi */}
            <section className="max-w-6xl mx-auto px-4 py-12 max-md:px-4 border-t-2 border-base-300" >
                <GallerySection />
            </section>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8  md:grid-cols-3">
                {newsSecondSections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <FirstHightlightNewsSection title={section.title} news={section.news} />
                    </div>
                ))}
            </div>

            <div className="mx-auto max-w-6xl ">
                <div className='flex items-center justify-center mb-8'>
                    <GoogleAds size="leaderboard" />
                </div>
            </div>

            <VideoSection />

            <div className="max-w-6xl mx-auto px-4 py-8 max-md:px-4">
                <div className='grid grid-cols-1  gap-4 md:grid-cols-6 md:gap-4'>
                    <div className="md:col-span-4 lg:col-span-4">
                        <LastestNewsSection />
                    </div>

                    <div className="hidden md:block md:col-span-2 lg:col-span-2 ">
                        <PopularNews />
                        <div className='flex items-center justify-center mb-8'>
                            <GoogleAds size='half_page_ad' />
                        </div>

                         <div className='flex items-center justify-center mb-8'>
                            <GoogleAds size='inline_rectangle' />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Home;