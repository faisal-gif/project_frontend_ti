// app/.../page.jsx

import React from 'react'
import TagClient from './TagClient'
import { getAllNewsServer } from '@/lib/api/newsApi'; // <-- 1. Import fungsi fetch data
import { redirect } from 'next/navigation';


const unslugify = (slug) => {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tagTitle = unslugify(slug);

  if (!slug) {
    return {
      title: "Berita tidak ditemukan - TIMES Indonesia",
      description: "Berita yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${tagTitle} - TIMES Indonesia`,
    openGraph: {
      locale: 'id_ID',
      title: tagTitle,
      description: tagTitle,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
      type: "website",
      url: `https://timesindonesia.co.id/tag/${tagTitle}`,
      siteName: 'TIMES Indonesia',
    },
    twitter: {
      card: "summary_large_image",
      title: tagTitle,
      description: tagTitle,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/icon.png`,
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
    },
  };
}


async function page({ params }) {

  redirect("/maintenance");

  // const { slug } = await params;
  // const tag = unslugify(slug);
  // const limit = 9;
  // let initialNews = [];

  // try {
  //   initialNews = await getAllNewsServer({
  //     news_type: 'tag',
  //     title: tag,
  //     limit: limit,
  //     offset: 0,
  //   });
  // } catch (error) {
  //   console.error("Failed to fetch initial news:", error);
  // }

  // return (

  //   <TagClient
  //     initialNews={initialNews || []}
  //     slug={slug}
  //     unslugifiedSlug={tag}
  //   />
  // )
}

export default page