import React from 'react'
import Home from './Home'
import { getNewsFirstSections, getNewsSecondSections, getWansusNews } from '@/lib/data';
import { getAllNews } from '@/lib/api/newsApi';

export const revalidate = 60 // ISR, regen tiap 60 detik

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
  const [newsFirstSections, newsSecondSections, wansusNews, lastNews] = await Promise.all([
    getNewsFirstSections(),
    getNewsSecondSections(),
    getWansusNews(),
    getAllNews({ news_type: "all", offset: 0, limit: 4 })
  ])
  return (
    <Home
      initialNewsFirstSections={newsFirstSections}
      initialNewsSecondSections={newsSecondSections}
      initialWansusNews={wansusNews}
      initialLastNews={lastNews}
    />
  )
}

