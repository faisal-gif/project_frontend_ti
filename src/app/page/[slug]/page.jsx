
import { getPageDetail } from '@/lib/api/pageStatic';
import React from 'react'
import PageStaticClient from './PageStaticClient';


export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pageDetail = await getPageDetail({ slug });

  if (!pageDetail) {
    return {
      title: "Halaman tidak ditemukan - TIMES Indonesia",
      description: "Halaman yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${pageDetail.page_name} - TIMES Indonesia`,
    description: pageDetail.page_desk,
    keywords: pageDetail.page_keyword,
    openGraph: {
      locale: 'id_ID',
      title: pageDetail.page_name,
      description: pageDetail.page_desk,
      keywords: pageDetail.page_keyword,
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
      title: pageDetail.page_name,
      description: pageDetail.page_desk,
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
  const pageDetail = await getPageDetail({ slug });
  return (
    <PageStaticClient InitialPageDetail={pageDetail} />
  )
}
