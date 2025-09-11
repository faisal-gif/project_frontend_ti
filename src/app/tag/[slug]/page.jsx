import React from 'react'
import TagClient from './TagClient'

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const unslugify = (slug) => {
    if (!slug) return "";
    return slug
      .replace(/-/g, " ")         // ubah strip jadi spasi
      .replace(/\s+/g, " ")       // rapikan spasi berlebih
      .trim()                     // buang spasi awal/akhir
      .replace(/\b\w/g, (c) => c.toUpperCase()); // kapitalisasi awal kata
  };

  if (!slug) {
    return {
      title: "Berita tidak ditemukan - TIMES Indonesia",
      description: "Berita yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${unslugify(slug)} - TIMES Indonesia`,
    openGraph: {
      locale: 'id_ID',
      title: unslugify(slug),
      description: unslugify(slug),
      images: [
        {
          url: "/icon.png",
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
      type: "website",
      url: `https://timesindonesia.co.id/tag/${unslugify(slug)}`,
      siteName: 'TIMES Indonesia',
    },
    twitter: {
      card: "summary_large_image",
      title: unslugify(slug),
      description: unslugify(slug),
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
}


async function page() {
  return (
    <TagClient />
  )
}

export default page