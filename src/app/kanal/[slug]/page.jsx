import { getKanalDetail } from '@/lib/api/kanalApi';
import React from 'react'
import KanalDetail from './KanalDetail';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const kanalDetail = await getKanalDetail({ slug });

  if (!kanalDetail) {
    return {
      title: "Kanal tidak ditemukan - TIMES Indonesia",
      description: "Kanal yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${kanalDetail.catnews_title} - TIMES Indonesia`,
    description: kanalDetail.catnews_description,
    keywords: kanalDetail.catnews_keyword,
    openGraph: {
      locale: 'id_ID',
      title: kanalDetail.catnews_title,
      description: kanalDetail.catnews_description,
      images: [
        {
          url: "/icon.png",
          width: 500,
          height: 500,
          alt: "TIMES Indonesia Logo",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: kanalDetail.catnews_title,
      description: kanalDetail.catnews_description,
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



export default async function page({params}) {
  const { slug } = await params;
  const kanalDetail = await getKanalDetail({ slug });
  return (
    <KanalDetail InitialKanalDetail={kanalDetail} />
  )
}
