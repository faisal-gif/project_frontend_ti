import { getFotoDetail } from '@/lib/api/fotoApi';
import React, { cache } from 'react'
import FotoDetail from './FotoDetail';
import { getWriterDetailServer } from '@/lib/api/jurnalist';

const getFoto = cache(async (id) => {
  return await getFotoDetail({ id });
});

export const revalidate = 60;


export async function generateMetadata({ params }) {
  const { id } = await params;
  const fotoDetail = await getFoto(id);

  if (!fotoDetail) {
    return {
      title: "Foto tidak ditemukan - TIMES Indonesia",
      description: "Foto yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${fotoDetail.gal_title} - TIMES Indonesia`,
    description: fotoDetail.gal_description,
    keywords: 'fotografi juranlistik,fotografi TIMESINDONESIA',
    openGraph: {
      locale: 'id_ID',
      title: fotoDetail.gal_title,
      description: fotoDetail.gal_description,
      images: [
        {
          url: fotoDetail.gal_cover,
          alt: fotoDetail.gal_title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fotoDetail.gal_title,
      description: fotoDetail.gal_description,
      images: [
        {
          url: fotoDetail.gal_cover,
          alt: fotoDetail.gal_title,
        },
      ],
    },
  };
}



export default async function page({ params }) {
  const { id } = await params;
  const fotoDetail = await getFoto(id);

  if (!fotoDetail) {
    notFound();
  }

  let writer = {};

  if (fotoDetail.writer_slug) {
    writer = await getWriterDetailServer({ slug: fotoDetail.writer_slug });
  }

  return (
    <FotoDetail initialFotoDetail={fotoDetail} initialWriter={writer} />
  )
}
