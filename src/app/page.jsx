import React from 'react'
import Home from './Home'
import { getNewsFirstSections, getNewsSecondSections, getWansusNews } from '@/lib/data';
import { getAllNews, getAllNewsServer } from '@/lib/api/newsApi';

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
        url: "https://timesindonesia.id/icon.png",
        width: 500,
        height: 500,
        alt: "TIMES Indonesia Logo",
      },
    ],
  },
};

export default async function page() {
    console.time("Total data fetching time"); // Mulai timer total

    console.time("getNewsFirstSections");
    const firstSectionsPromise = getNewsFirstSections();
    console.timeEnd("getNewsFirstSections"); // Ukur waktu inisialisasi (akan cepat)

    console.time("getNewsSecondSections");
    const secondSectionsPromise = getNewsSecondSections();
    console.timeEnd("getNewsSecondSections");

    console.time("getWansusNews");
    const wansusPromise = getWansusNews();
    console.timeEnd("getWansusNews");

    console.time("getAllNews");
    const allNewsPromise = getAllNewsServer({ news_type: "all", offset: 0, limit: 4 });
    console.timeEnd("getAllNews");

    const [
        newsFirstSections,
        newsSecondSections,
        wansusNews,
        allNews,
    ] = await Promise.all([
        firstSectionsPromise,
        secondSectionsPromise,
        wansusPromise,
        allNewsPromise,
    ]);

    console.timeEnd("Total data fetching time"); // Selesai timer total

  return (
    <Home 
    newsFirstSections={newsFirstSections}
    newsSecondSections={newsSecondSections}
    wansusNews={wansusNews}
    allNews={allNews}
    />
  )
}
