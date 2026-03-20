'use client'
import EKoranSection from '@/components/EKoranSection';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GallerySection from '@/components/GallerySection';
import HeadlineNewsHome from '@/components/HeadlineNewsHome';
import LastestNewsSection from '@/components/LastestNewsSection';
import PopularNews from '@/components/PopularNews';
import FirstHighlightNewsSectionSkeleton from '@/components/ui/FirstHighlightNewsSectionSkeleton';
// import VideoSection from '@/components/VideoSection';
import CekFaktaCard from '@/components/CekFaktaCard';
import FirstHighlightHorizontalNewsSection from '@/components/FirstHighlightHorizontalNewsSection';
import HorizontalNewsCardSkeleton from '@/components/ui/HorizontalNewsCardSkeleton';
import HeadlineCardSkeleton from '@/components/ui/HeadlineCardSkeleton';
import TopikPilihanWidget from '@/components/TopikPilihanWidget';
import GoogleAds from '@/components/GoogleAds';
import EventWidget from '@/components/EventWidget';
import Carousel from '@/components/ui/Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
// import ATIWidget from '@/components/ATIWidget';


function Home({
    newsFirstSections,
    newsSecondSections,
    allNews,
    wansusNews,
    initialHeadlineNews,
    initialCekFaktaNews,
    initialAdsPremium,
    initialAdsPremiumMobile,
    initialAdsLeaderboard1,
    initialAdsLeaderboard2,
    initialAdsRectangle1,
    initialAdsRectangle2,
    initialAdsRectangle3,
    initialAdsRectangle4,
    initialAdsRectangle5,
    initialAdsRectangle6,
    initialAdsRectangle7,
    initialAdsRectangle8,
    initialAdsRectangle9,
    initialAdsRectangle10,
    initialAdsListRectangle11,
    initialAdsRectangleLeaderboard1,
    initialAdsRectangleLeaderboard2, }) {
    const adsArray = Array.isArray(initialAdsListRectangle11) ? initialAdsListRectangle11 : [];

    // 2. Logika Pembagian Data (Chunking) sesuai permintaan:
    // - Carousel 1: Maksimal 6 item pertama
    const carousel1 = adsArray.slice(0, 6);

    // - Ambil sisa iklan setelah 6 item pertama diambil
    const remainingAds = adsArray.slice(6);

    // - Carousel 2 & 3: Sisa iklan dibagi rata untuk keduanya
    const halfRemaining = Math.ceil(remainingAds.length / 2);
    const carousel2 = remainingAds.slice(0, halfRemaining);
    const carousel3 = remainingAds.slice(halfRemaining);

    // Gabungkan menjadi satu array bersarang agar mudah di-looping
    const chunkedAds = [carousel1, carousel2, carousel3];

    return (
        <div className="">

            {/* Left Skyscraper Ad */}
            {/* <div className="fixed left-6 top-7/12 transform -translate-y-1/2 z-10 hidden xl:block">
            </div> */}

            {/* Right Skyscraper Ad */}
            {/* <div className="fixed right-6 top-7/12 transform -translate-y-1/2 z-10 hidden xl:block">
           
            </div> */}

            <div className='max-w-6xl mx-auto gap-6 pt-28 pb-8 px-4'>
                <div className='hidden md:flex items-center justify-center'>
                    <GoogleAds size='top_banner' adsEksternal={initialAdsPremium} slot='6315037307' />
                </div>

                <div className='md:hidden flex items-center justify-center'>
                    <GoogleAds size='inline_rectangle' type='mobile' adsEksternal={initialAdsPremiumMobile} slot='9639204649' />
                </div>

            </div>
            {/* Hero */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pb-2 md:pb-8 px-4 md:grid-cols-6">
                <div className="md:col-span-4">
                    <HeadlineNewsHome initialHeadlineNews={initialHeadlineNews} />
                </div>
                <div className="md:col-span-2">
                    {allNews.length === 0 && (
                        <div className="space-y-8">
                            <FirstHighlightNewsSectionSkeleton />
                        </div>
                    )}
                    {
                        allNews.length > 0 && (
                            <FirstHightlightNewsSection url="#terbaru_jelajah_berita" index={0} title={'Berita Terbaru'} news={allNews} />
                        )
                    }

                </div>
            </div>


            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-3">

                {newsFirstSections.length === 0 && (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="space-y-8">
                            <FirstHighlightNewsSectionSkeleton />
                        </div>
                    ))
                )}

                {newsFirstSections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <FirstHightlightNewsSection url={section.url} index={0} title={section.title} news={section.news} layout={section.layout} />
                    </div>
                ))}
            </div>

            {/* <ATIWidget /> */}

            {initialAdsLeaderboard1 && (
                <div className="mx-auto max-w-6xl ">
                    <div className='hidden md:flex items-center justify-center mb-8'>
                        <GoogleAds size="top_banner" adsEksternal={initialAdsLeaderboard1} slot='6315037307' />
                    </div>
                </div>
            )}

            {
                initialAdsRectangleLeaderboard1 && (
                    <div className='flex md:hidden items-center justify-center'>
                        <GoogleAds size='rectangle' type='mobile' adsEksternal={initialAdsRectangleLeaderboard1} slot='6315037307' />
                    </div>
                )
            }



            <div className="mx-auto max-w-6xl px-4 py-8 ">
                <EKoranSection />
            </div>

            {initialAdsLeaderboard2 && (
                <div className="hidden md:block mx-auto max-w-6xl ">
                    <div className='flex items-center justify-center mb-8'>
                        <GoogleAds size="top_banner" adsEksternal={initialAdsLeaderboard2} slot='6315037307' />
                    </div>
                </div>
            )}

            {
                initialAdsRectangleLeaderboard2 && (
                    <div className='flex md:hidden items-center justify-center'>
                        <GoogleAds size='rectangle' type='mobile' adsEksternal={initialAdsRectangleLeaderboard2} slot='6315037307' />
                    </div>
                )
            }


            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8  md:grid-cols-3">
                {newsSecondSections.length === 0 && (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="space-y-8">
                            <FirstHighlightNewsSectionSkeleton />
                        </div>
                    ))
                )}
                {newsSecondSections.map((section) => (
                    <div key={section.title} className="space-y-8">
                        <FirstHightlightNewsSection url={section.url} title={section.title} news={section.news} layout={section.layout} />
                    </div>
                ))}

            </div>


            {(initialAdsRectangle1 || initialAdsRectangle2 || initialAdsRectangle3) && (
                <div className="mx-auto max-w-6xl ">
                    <div className='mx-auto block md:hidden mb-8'>
                        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
                            <Carousel.Content>
                                {initialAdsRectangle1 && (
                                    <Carousel.Item key={1} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle1} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle2 && (
                                    <Carousel.Item key={2} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle2} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle3 && (
                                    <Carousel.Item key={3} className="pl-0 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle3} />
                                        </div>
                                    </Carousel.Item>
                                )}

                            </Carousel.Content>

                            <Carousel.Previous position={'inner'} />
                            <Carousel.Next position={'inner'} />


                        </Carousel>
                    </div>
                    <div className='hidden md:flex items-center gap-10 justify-center mb-8'>
                        {initialAdsRectangle1 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle1} />
                        )}
                        {initialAdsRectangle2 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle2} />
                        )}
                        {initialAdsRectangle3 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle3} />
                        )}
                    </div>
                </div>
            )}


            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8  md:grid-cols-6">
                <div className='md:col-span-4'>
                    {wansusNews.length === 0 && (
                        <HeadlineCardSkeleton />
                    )}
                    <div className="animate-pulse grid grid-cols-4 gap-2 mt-4">
                        {wansusNews.length === 0 && (
                            [1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="pl-2 min-w-0 shrink-0 grow-0 basis-4/9  sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                                >
                                    <div className="h-full">
                                        <HorizontalNewsCardSkeleton />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {wansusNews.length > 0 && (
                        <FirstHighlightHorizontalNewsSection url='/kanal/wawancara-khusus/' articles={wansusNews} />
                    )}
                </div>
                <div className='md:col-span-2'>
                    <TopikPilihanWidget />
                </div>

            </div>

            {(initialAdsRectangle4 || initialAdsRectangle5 || initialAdsRectangle6) && (
                <div className="mx-auto max-w-6xl ">
                    <div className='mx-auto block md:hidden mb-8'>
                        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
                            <Carousel.Content>
                                {initialAdsRectangle4 && (
                                    <Carousel.Item key={1} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle4} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle5 && (
                                    <Carousel.Item key={2} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle5} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle6 && (
                                    <Carousel.Item key={3} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle6} />
                                        </div>
                                    </Carousel.Item>
                                )}

                            </Carousel.Content>

                            <Carousel.Previous position={'inner'} />
                            <Carousel.Next position={'inner'} />


                        </Carousel>
                    </div>
                    <div className='hidden md:flex items-center gap-10 justify-center mb-8'>
                        {initialAdsRectangle4 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle4} />
                        )}
                        {initialAdsRectangle5 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle5} />
                        )}
                        {initialAdsRectangle6 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle6} />
                        )}
                    </div>
                </div>
            )}

            <EventWidget />



            {(initialAdsRectangle7 || initialAdsRectangle8 || initialAdsRectangle9) && (
                <div className="mx-auto max-w-6xl ">
                    <div className='mx-auto block md:hidden mb-8'>
                        <Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay(), Fade()]}>
                            <Carousel.Content>
                                {initialAdsRectangle7 && (
                                    <Carousel.Item key={1} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle7} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle8 && (
                                    <Carousel.Item key={2} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle8} />
                                        </div>
                                    </Carousel.Item>
                                )}
                                {initialAdsRectangle9 && (
                                    <Carousel.Item key={3} className="pl-4 min-w-0 shrink-0 grow-0 basis-full">
                                        <div className="w-full flex justify-center items-center">
                                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle9} />
                                        </div>
                                    </Carousel.Item>
                                )}

                            </Carousel.Content>

                            <Carousel.Previous position={'inner'} />
                            <Carousel.Next position={'inner'} />


                        </Carousel>
                    </div>
                    <div className='hidden md:flex items-center gap-10 justify-center mb-8'>
                        {initialAdsRectangle7 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle7} />
                        )}
                        {initialAdsRectangle8 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle8} />
                        )}
                        {initialAdsRectangle9 && (
                            <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle9} />
                        )}
                    </div>
                </div>
            )}



            {/* Jurnalistik Fotografi */}
            <section className="max-w-6xl mx-auto px-4 py-8 border-t-2 border-base-300" >
                <GallerySection />
            </section>





            {/* <VideoSection /> */}
            <div className='flex flex-col px-4 max-w-7xl mx-auto'>
                {chunkedAds.map((adGroup, groupIndex) => {
                    // Jangan render carousel jika grup ini kosong (misal total iklan kurang dari 7)
                    if (adGroup.length === 0) return null;

                    return (
                        <div key={`carousel-wrapper-${groupIndex}`} className="w-full relative px-8">
                            <Carousel
                                opts={{ align: "start", loop: true }}
                                plugins={[Autoplay({ delay: 3000 })]} // Hapus Fade() agar rapi saat tampil banyak item
                                className="w-full"
                            >
                                <Carousel.Content className="-ml-4">
                                    {adGroup.map((ads, index) => {

                                        // Pengaturan jumlah item yang tampil:
                                        // Mobile: basis-full (1 item)
                                        // Tablet: md:basis-1/3 (3 item)
                                        // Desktop Khusus Carousel 1 (groupIndex 0): lg:basis-1/6 (tampil 6 item sejajar)
                                        // Desktop Carousel 2 & 3: lg:basis-1/4 (tampil 4 item sejajar, atau sesuaikan)

                                        const basisClass = groupIndex === 0
                                            ? "basis-full md:basis-1/2 lg:basis-1/3 "
                                            : "basis-full md:basis-1/2 lg:basis-1/3";

                                        return (
                                            <Carousel.Item
                                                key={`item-${groupIndex}-${index}`}
                                                className={`pl-4 min-w-0 shrink-0 grow-0 ${basisClass}`}
                                            >
                                                <div className="w-full flex justify-center items-center">
                                                    {/* Kirim sebagai array [ads] jika GoogleAds masih butuh format array */}
                                                    <GoogleAds size='square' adsEksternal={ads} slot='9639204649' />
                                                </div>
                                            </Carousel.Item>
                                        );
                                    })}
                                </Carousel.Content>

                                {/* Tampilkan navigasi hanya jika jumlah item lebih banyak dari yang bisa ditampilkan di layar */}
                                {adGroup.length > 1 && (
                                    <>
                                        <Carousel.Previous position="outer" />
                                        <Carousel.Next position="outer" />
                                    </>
                                )}
                            </Carousel>
                        </div>
                    );
                })}
            </div>


            {/* Last News */}
            <div className="max-w-6xl mx-auto px-4 py-8 max-md:px-4" id="jelajah_berita">
                <div className='grid grid-cols-1  gap-4 md:grid-cols-6 md:gap-4'>
                    <div className="order-2 md:order-1 md:col-span-4 lg:col-span-4" >
                        <LastestNewsSection />
                    </div>
                    {/* Last news Sidebar */}
                    <div className="order-1 md:order-2 md:block md:col-span-2 lg:col-span-2">
                        <PopularNews />
                        <div className='flex items-center justify-center mb-8'>
                            <GoogleAds size='inline_rectangle' key={1} adsEksternal={initialAdsRectangle10} slot='9639204649' />
                        </div>
                        <div>
                            <CekFaktaCard CekFaktaNews={initialCekFaktaNews} />
                        </div>

                        <div className='sticky top-30'>
                            <div className='hidden md:flex items-center justify-center my-8 '>
                                <GoogleAds size='inline_rectangle' slot='9639204649' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <PopupAds /> */}
        </div>
    );
}

export default Home;