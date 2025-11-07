import React from 'react'
import Home from './Home'
import { getCekFaktaNews, getCekFaktaNewsServer, getNewsFirstSections, getNewsFirstSectionsServer, getNewsSecondSections, getNewsSecondSectionsServer, getWansusNews, getWansusNewsServer } from '@/lib/data';
import { getAllNews, getAllNewsServer } from '@/lib/api/newsApi';
import { getViewAds } from '@/lib/api/adsApi';
import Head from 'next/head';

export const metadata = {
  title: "TIMES Indonesia - Berita Positif Terbaru dan Terkini",
  description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  openGraph: {
    locale: 'id_ID',
    title: "TIMES Indonesia - Berita Positif Terbaru dan Terkini",
    description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    type: "website",
    url: 'https://timesindonesia.co.id/',
    siteName: 'TIMES Indonesia',
    images: [
      {
        url: `${process.env.API_URL}\icon.png`,
        width: 500,
        height: 500,
        alt: "TIMES Indonesia Logo",
      },
    ],
  },
};

export default async function page() {

  const firstSectionsPromise = getNewsFirstSectionsServer();
  const secondSectionsPromise = getNewsSecondSectionsServer();
  const wansusPromise = getWansusNewsServer();
  const allNewsPromise = getAllNewsServer({ news_type: "all", offset: 0, limit: 4 });
  const headlineNewsPromise = getAllNewsServer({ news_type: "headline", offset: 0, limit: 10, })
  const cekFaktaNewsPromise = getCekFaktaNewsServer();
  const adsPremiumPromise = getViewAds({ id: 1 });
  const adsLeaderboard1Promise = getViewAds({ id: 3 });
  const adsLeaderboard2Promise = getViewAds({ id: 7 });
  const adsRectangle1Promise = getViewAds({ id: 4 });
  const adsRectangle2Promise = getViewAds({ id: 5 });
  const adsRectangle3Promise = getViewAds({ id: 6 });
  const adsRectangle4Promise = getViewAds({ id: 93 });
  const adsRectangle5Promise = getViewAds({ id: 94 });
  const adsRectangle6Promise = getViewAds({ id: 95 });
  const adsRectangle7Promise = getViewAds({ id: 96 });

  const [
    newsFirstSections,
    newsSecondSections,
    wansusNews,
    allNews,
    headlineNews,
    cekFaktaNews,
    adsPremium,
    adsLeaderboard1,
    adsLeaderboard2,
    adsRectangle1,
    adsRectangle2,
    adsRectangle3,
    adsRectangle4,
    adsRectangle5,
    adsRectangle6,
    adsRectangle7,
  ] = await Promise.all([
    firstSectionsPromise,
    secondSectionsPromise,
    wansusPromise,
    allNewsPromise,
    headlineNewsPromise,
    cekFaktaNewsPromise,
    adsPremiumPromise,
    adsLeaderboard1Promise,
    adsLeaderboard2Promise,
    adsRectangle1Promise,
    adsRectangle2Promise,
    adsRectangle3Promise,
    adsRectangle4Promise,
    adsRectangle5Promise,
    adsRectangle6Promise,
    adsRectangle7Promise,
  ]);
  


  return (<>
   
    <Home
      newsFirstSections={newsFirstSections}
      newsSecondSections={newsSecondSections}
      wansusNews={wansusNews}
      allNews={allNews}
      initialHeadlineNews={headlineNews}
      initialCekFaktaNews={cekFaktaNews}
      initialAdsPremium={adsPremium}
      initialAdsLeaderboard1={adsLeaderboard1}
      initialAdsLeaderboard2={adsLeaderboard2}
      initialAdsRectangle1={adsRectangle1}
      initialAdsRectangle2={adsRectangle2}
      initialAdsRectangle3={adsRectangle3}
      initialAdsRectangle4={adsRectangle4}
      initialAdsRectangle5={adsRectangle5}
      initialAdsRectangle6={adsRectangle6}
      initialAdsRectangle7={adsRectangle7}
    />
  </>

  )
}
