import React from 'react'
import Home from './Home'
import { getCekFaktaNews, getCekFaktaNewsServer, getNewsFirstSections, getNewsFirstSectionsServer, getNewsSecondSections, getNewsSecondSectionsServer, getWansusNews, getWansusNewsServer } from '@/lib/data';
import { getAllNews, getAllNewsServer } from '@/lib/api/newsApi';
import { getViewAds } from '@/lib/api/adsApi';

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
  const adsRectanglePromise = getViewAds({ id: 5 });

  const [
    newsFirstSections,
    newsSecondSections,
    wansusNews,
    allNews,
    headlineNews,
    cekFaktaNews,
    adsRectangle
  ] = await Promise.all([
    firstSectionsPromise,
    secondSectionsPromise,
    wansusPromise,
    allNewsPromise,
    headlineNewsPromise,
    cekFaktaNewsPromise,
    adsRectanglePromise
  ]);

  return (
    <Home
      newsFirstSections={newsFirstSections}
      newsSecondSections={newsSecondSections}
      wansusNews={wansusNews}
      allNews={allNews}
      initialHeadlineNews={headlineNews}
      initialCekFaktaNews={cekFaktaNews}
      initialAdsRectangle={adsRectangle}
    />
  )
}
