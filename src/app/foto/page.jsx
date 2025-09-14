import React from 'react'
import Gallery from './Gallery'


export const metadata = {
  title: "Gallery Fotografi Jurnalistik - Berita Positif Terbaru dan Terkini",
  description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
  openGraph: {
    locale: 'id_ID',
    title: "Gallery Fotografi Jurnalistik - Berita Positif Terbaru dan Terkini",
    description: "Portal berita positif yang menyajikan informasi terkini tentang peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    keywords: "times indonesia, timesindonesia, portal berita, berita positif, berita terbaru, berita terkini, informasi terkini, informasi terbaru, peristiwa, cek fakta, ekoran, politik, entertainment, kuliner, gaya hidup, wisata, dan kopi times",
    type: "website",
    url: 'https://timesindonesia.co.id/',
    siteName: 'TIMES Indonesia',
    images: [
      {
        url: "/icon.png",
        width: 500,
        height: 500,
        alt: "TIMES Indonesia Logo",
      },
    ],
  },
};

function page() {
    return (
        <Gallery />
    )
}

export default page