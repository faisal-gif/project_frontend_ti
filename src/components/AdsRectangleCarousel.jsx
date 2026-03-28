// file: @/components/AdsRectangleCarousel.jsx
'use client'

import Carousel from '@/components/ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import GoogleAds from '@/components/GoogleAds';

export default function AdsRectangleCarousel({ ads1, ads2, ads3 }) {
    // Jika tidak ada iklan satupun yang diberikan, jangan render apa-apa
    if (!ads1 && !ads2 && !ads3) return null;

    return (
        <div className="mx-auto max-w-6xl ">
            {/* --- TAMPILAN MOBILE (CAROUSEL) --- */}
            <div className='mx-auto block md:hidden mb-8'>
                <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
                    <Carousel.Content>
                        {ads1 && (
                            <Carousel.Item key={1} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                <div className="w-full flex justify-center items-center">
                                    <GoogleAds size="inline_rectangle" adsEksternal={ads1} />
                                </div>
                            </Carousel.Item>
                        )}
                        {ads2 && (
                            <Carousel.Item key={2} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                <div className="w-full flex justify-center items-center">
                                    <GoogleAds size="inline_rectangle" adsEksternal={ads2} />
                                </div>
                            </Carousel.Item>
                        )}
                        {ads3 && (
                            <Carousel.Item key={3} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                <div className="w-full flex justify-center items-center">
                                    <GoogleAds size="inline_rectangle" adsEksternal={ads3} />
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel.Content>
                    
                    <Carousel.Previous position={'inner'} />
                    <Carousel.Next position={'inner'} />
                </Carousel>
            </div>

            {/* --- TAMPILAN DESKTOP (GRID SEJAJAR) --- */}
            <div className='hidden md:flex items-center gap-10 justify-center mb-8'>
                {ads1 && <GoogleAds size="inline_rectangle" adsEksternal={ads1} />}
                {ads2 && <GoogleAds size="inline_rectangle" adsEksternal={ads2} />}
                {ads3 && <GoogleAds size="inline_rectangle" adsEksternal={ads3} />}
            </div>
        </div>
    );
}