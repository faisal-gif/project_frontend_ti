import React from 'react'
import WriterRegistration from './WriterRegistration';

export async function generateMetadata() {
  
  return {
    title: `Writer Registration - TIMES Indonesia`,
    description:'Daftar penulis TIMES Indonesia disini',
    keywords: 'daftar,penulis,kopi-times,jurnalis',
    openGraph: {
      locale: 'id_ID',
      title: 'Writer Registration - TIMES Indonesia',
      description: "Daftar penulis TIMES Indonesia disini",
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
      title: 'Writer Registration - TIMES Indonesia',
      description: "Daftar penulis TIMES Indonesia disini",
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


export default async function page() {

  return <WriterRegistration />;
}