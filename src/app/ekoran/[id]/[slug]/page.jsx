import React from 'react'
import EkoranDetailStory from './EkoranDetailStory'
import { getDetailEkoran } from '@/lib/api/ekoran';


export async function generateMetadata({ params }) {
  const { id } = await params;
  const ekoranDetail = await getDetailEkoran({ id });
  const originalImageUrl = ekoranDetail.img1;
  const mediumImageUrl = originalImageUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '.md.$1');

  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${ekoranDetail.url_ci4 || ''}`;

  if (!ekoranDetail) {
    return {
      title: "Ekoran tidak ditemukan - TIMES Indonesia",
      description: "Ekoran yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${ekoranDetail.title} - TIMES Indonesia`,
    description: ekoranDetail.title,
    keywords: 'ekoran,TIMES Indonesia, ekoran times indonesia',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      locale: 'id_ID',
      title: ekoranDetail.title,
      description: ekoranDetail.title,
      url: `https://timesindonesia.co.id${ekoranDetail.url_ci4}`,
      images: [
        {
          url: mediumImageUrl,
          width: 1200,
          height: 630,
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
          width: 1200,
          height: 630,
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
