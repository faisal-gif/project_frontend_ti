import React from 'react'
import EkoranDetailStory from './EkoranDetailStory'
import { getDetailEkoran } from '@/lib/api/ekoran';


export async function generateMetadata({ params }) {
  const { id } = await params;
  const ekoranDetail = await getDetailEkoran({ id });

  if (!ekoranDetail) {
    return {
      title: "Kanal tidak ditemukan - TIMES Indonesia",
      description: "Kanal yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${ekoranDetail.title} - TIMES Indonesia`,
    description: ekoranDetail.title,
    keywords: 'ekoran,TIMES Indonesia, ekoran times indonesia',
    openGraph: {
      locale: 'id_ID',
      title: ekoranDetail.title,
      description: ekoranDetail.title,
      images: [
        {
          url: ekoranDetail.img1,
          width: 500,
          height: 750,
          alt: ekoranDetail.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: ekoranDetail.title,
      description: ekoranDetail.title,
      images: [
        {
          url: ekoranDetail.img1,
          width: 500,
          height: 750,
          alt: ekoranDetail.title,
        },
      ],
    },
  };
}



export default async function page({ params }) {
  const { id } = await params;
  const ekoranDetail = await getDetailEkoran({ id });
  return (
    <EkoranDetailStory InitialEkoranDetail={ekoranDetail} />
  )
}
