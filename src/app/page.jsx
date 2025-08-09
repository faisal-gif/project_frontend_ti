'use client';

import BreakingNews from '@/components/BreakingNews';
import EKoranSection from '@/components/EKoranSection';
import GallerySection from '@/components/GallerySection';
import HeadlineNewsHome from '@/components/HeadlineNewsHome';
import HorizontalNewsSection from '@/components/HorizontalNewsSection';
import SimpleNewsSection from '@/components/SimpleNewsSection';
import WeatherCard from '@/components/WeatherCard';
import { newsSections } from '@/lib/data';

export default function Home() {
  return (
    <div className="">
      {/* Hero */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-8 px-4 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <HeadlineNewsHome />
        </div>
        <WeatherCard />
      </div>


      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3">
        {newsSections.map((section) => (
          <div key={section.title} className="space-y-8">
            <SimpleNewsSection title={section.title} news={section.news} />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 ">
        <EKoranSection />
      </div>

      <HorizontalNewsSection />
      <GallerySection />

      {/* Jurnalistik Fotografi */}

    </div>
  );
}
