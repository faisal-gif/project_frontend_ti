import { getFocusDetail } from '@/lib/api/focus';
import React from 'react'
import FokusDetail from './FokusDetail';
import { redirect } from 'next/navigation';


export async function generateMetadata({ params }) {
  const { id } = await params;
  const focusDetail = await getFocusDetail({ id });

  if (!focusDetail) {
    return {
      title: "Focus tidak ditemukan - TIMES Indonesia",
      description: "Focus yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${focusDetail.focnews_title} - TIMES Indonesia`,
    description: focusDetail.focnews_description,
    keywords: focusDetail.focnews_keyword,
    openGraph: {
      locale: 'id_ID',
      title: focusDetail.focnews_title,
      description: focusDetail.focnews_description,
      images: [
        {
          url: focusDetail.focnews_image || "/icon.png",
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: focusDetail.focnews_title,
      description: focusDetail.focnews_description,
      images: [
        {
          url: focusDetail.focnews_image || "/icon.png",
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
    },
  };
}


export default async function page({ params }) {
  const { id } = params;
  const fokusDetail = await getFocusDetail({ id });

  // Jika ada link eksternal → redirect
  if (fokusDetail.link_eksternal) {
    return redirect(fokusDetail.link_eksternal);
  }

  return <FokusDetail InitialFokusDetail={fokusDetail} />;
}

