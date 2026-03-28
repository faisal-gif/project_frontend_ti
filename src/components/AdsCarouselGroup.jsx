'use client' // WAJIB ADA DI SINI

import Carousel from '@/components/ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import GoogleAds from '@/components/GoogleAds';

export default function AdsCarouselGroup({ adsArray }) {
    
    // Logika pembagian array Anda letakkan di dalam Client Component ini
    const chunkedAds = [[], [], []];
    adsArray.forEach((ads, index) => {
        chunkedAds[index % 3].push(ads);
    });

    return (
        <>
            {/* --- DESKTOP VIEW --- */}
            <div className='hidden md:grid grid-cols-3 justify-center items-center max-w-6xl mx-auto px-4 py-8 gap-6'>
                {adsArray.map((ads, index) => (
                    <div key={`desktop-${index}`} className='flex items-center justify-center mb-8'>
                        <GoogleAds size='inline_rectangle' adsEksternal={ads} slot='9639204649' />
                    </div>
                ))}
            </div>

            {/* --- MOBILE VIEW --- */}
            <div className='grid md:hidden grid-cols-1 gap-8 px-4 py-8 max-w-md mx-auto'>
                {chunkedAds.map((adGroup, groupIndex) => {
                    if (adGroup.length === 0) return null;

                    return (
                        <Carousel
                            key={`carousel-${groupIndex}`}
                            opts={{ align: "start", loop: true }}
                            plugins={[Autoplay(), Fade()]}
                        >
                            <Carousel.Content>
                                {adGroup.map((ads, index) => (
                                    <Carousel.Item key={`mob-${groupIndex}-${index}`} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size='inline_rectangle' adsEksternal={ads} slot='9639204649' />
                                        </div>
                                    </Carousel.Item>
                                ))}
                            </Carousel.Content>

                            {adGroup.length > 1 && (
                                <>
                                    <Carousel.Previous position={'inner'} />
                                    <Carousel.Next position={'inner'} />
                                </>
                            )}
                        </Carousel>
                    );
                })}
            </div>
        </>
    );
}