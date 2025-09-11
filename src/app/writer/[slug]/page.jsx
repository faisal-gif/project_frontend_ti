import React from 'react'
import WriterClient from './WriterClient';
import { getWriterDetail } from '@/lib/api/jurnalist';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const writerDetail = await getWriterDetail({ slug });

  if (!writerDetail) {
    return {
      title: "Writer tidak ditemukan - TIMES Indonesia",
      description: "Writer yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${writerDetail.name} - TIMES Indonesia`,
    description: writerDetail.name,
    keywords: writerDetail.slug,
    openGraph: {
      locale: 'id_ID',
      title: writerDetail.name,
      description: "Writer TIMES Indonesia",
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
      title: writerDetail.name,
      description: writerDetail.name,
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


export default async function page({ params }) {
  const { slug } = params;
  const writerDetail = await getWriterDetail({ slug });
  return <WriterClient initialWriterDetail={writerDetail} />;
}