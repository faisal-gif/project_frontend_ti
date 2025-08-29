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
import { getNewsFirstSections, getNewsSecondSections } from '@/lib/data';
import { Video } from 'lucide-react';
import { useEffect, useState } from 'react';

function Home() {

  const [newsFirstSections, setNewsFirstSections] = useState([]);
  const [newsSecondSections, setNewsSecondSections] = useState([]);

  useEffect(() => {
    getNewsFirstSections().then(setNewsFirstSections).catch(console.error);
    getNewsSecondSections().then(setNewsSecondSections).catch(console.error);
  }, []);

  return (
    <div className="">
      <div className='max-w-7xl mx-auto gap-6 pt-10 pb-8 px-4'>
        <GoogleAds size='banner' />
      </div>
      {/* Hero */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 pb-8 px-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <HeadlineNewsHome />
        </div>
        <WeatherCard />
      </div>


      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
        {newsFirstSections.map((section) => (
          <div key={section.title} className="space-y-8">
            <SimpleNewsSection title={section.title} news={section.news} />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 ">
        <EKoranSection />
      </div>

      <HorizontalNewsSection />
      {/* Jurnalistik Fotografi */}

      <GallerySection />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
        {newsSecondSections.map((section) => (
          <div key={section.title} className="space-y-8">
            <FirstHightlightNewsSection title={section.title} news={section.news} />
          </div>
        ))}
      </div>

      <VideoSection />

      <div className="max-w-7xl mx-auto px-6 py-8 max-md:px-4">
        <div className='grid grid-cols-1  gap-4 md:grid-cols-4 md:gap-4'>
          <div className="md:col-span-3">
            <LastestNewsSection />
          </div>

          <div className="md:col-span-1">
            <PopularNews />
            <GoogleAds size='rectangle' />
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;