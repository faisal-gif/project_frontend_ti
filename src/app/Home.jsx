'use client'
import EKoranSection from '@/components/EKoranSection';
import FirstHightlightNewsSection from '@/components/FirstHightlightNewsSection';
import GallerySection from '@/components/GallerySection';
import HeadlineNewsHome from '@/components/HeadlineNewsHome';
import LastestNewsSection from '@/components/LastestNewsSection';
import PopularNews from '@/components/PopularNews';
import FirstHighlightNewsSectionSkeleton from '@/components/ui/FirstHighlightNewsSectionSkeleton';
import VideoSection from '@/components/VideoSection';
import CekFaktaCard from '@/components/CekFaktaCard';
import FirstHighlightHorizontalNewsSection from '@/components/FirstHighlightHorizontalNewsSection';
import HorizontalNewsCardSkeleton from '@/components/ui/HorizontalNewsCardSkeleton';
import HeadlineCardSkeleton from '@/components/ui/HeadlineCardSkeleton';
import TopikPilihanWidget from '@/components/TopikPilihanWidget';
import GoogleAds from '@/components/GoogleAds';
import EventWidget from '@/components/EventWidget';


function Home({
    newsFirstSections,
    newsSecondSections,
    allNews,
    wansusNews,
    initialHeadlineNews,
    initialCekFaktaNews,
    initialAdsPremium,
    initialAdsLeaderboard1,
    initialAdsLeaderboard2,
    initialAdsRectangle1,
    initialAdsRectangle2,
    initialAdsRectangle3,
    initialAdsRectangle4,
    initialAdsRectangle5,
    initialAdsRectangle6,
    initialAdsRectangle7 }) {

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
                    <GoogleAds size='top_banner' adsEksternal={initialAdsPremium} slot='9812419210' />
                </div>

                <div className='md:hidden flex items-center justify-center'>
                    <GoogleAds size='square' slot='4691830761' />
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

            {initialAdsLeaderboard1 && (
                <div className="mx-auto max-w-6xl ">
                    <div className='flex items-center justify-center mb-8'>
                        <GoogleAds size="top_banner" adsEksternal={initialAdsLeaderboard1} slot='9812419210' />
                    </div>
                </div>
            )}


            <div className="mx-auto max-w-6xl px-4 py-8 ">
                <EKoranSection />
            </div>

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
            {initialAdsLeaderboard2 && (
                <div className="mx-auto max-w-6xl ">
                    <div className='flex items-center justify-center mb-8'>
                        <GoogleAds size="top_banner" adsEksternal={initialAdsLeaderboard2} slot='9812419210' />
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

            <EventWidget />


            {initialAdsRectangle1 || initialAdsRectangle2 || initialAdsRectangle3 && (
                <div className="mx-auto max-w-6xl ">
                    <div className='flex md:hidden items-center justify-center mb-8'>
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle1} />
                    </div>
                    <div className='hidden md:flex items-center justify-between mb-8'>
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle1} />
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle2} />
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle3} />
                    </div>
                </div>
            )}



            {/* Jurnalistik Fotografi */}
            <section className="max-w-6xl mx-auto px-4 py-8 border-t-2 border-base-300" >
                <GallerySection />
            </section>

            {initialAdsRectangle4 || initialAdsRectangle5 || initialAdsRectangle6 && (
                <div className="mx-auto max-w-6xl ">
                    <div className='flex md:hidden items-center justify-center mb-8'>
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle4} />
                    </div>
                    <div className='hidden md:flex items-center justify-between mb-8'>
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle4} />
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle5} />
                        <GoogleAds size="inline_rectangle" adsEksternal={initialAdsRectangle6} />
                    </div>
                </div>
            )}



            <VideoSection />

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
                            <GoogleAds size='inline_rectangle' key={1} adsEksternal={initialAdsRectangle6} slot='4691830761' />
                        </div>
                        <div>
                            <CekFaktaCard CekFaktaNews={initialCekFaktaNews} />
                        </div>
                        <div className='flex items-center justify-center my-4 '>
                            <GoogleAds size='inline_rectangle' key={2} adsEksternal={initialAdsRectangle7} slot='4691830761' />
                        </div>
                        <div className='sticky top-30'>
                            <div className='hidden md:flex items-center justify-center my-8 '>
                                <GoogleAds size='half_page_ad' slot='2065667423' />
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