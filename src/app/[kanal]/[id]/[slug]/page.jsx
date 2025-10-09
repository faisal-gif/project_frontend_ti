import { getNewsDetail } from '@/lib/api/newsApi';
import React, { cache } from 'react'
import NewsDetailClient from './NewsDetailClient';
import { getWriterDetail, getWriterDetailServer } from '@/lib/api/jurnalist';

const getNews = cache(async (id) => {
    return await getNewsDetail({ id });
});

export const revalidate = 60;

export async function generateMetadata({ params }) {
    const { id } = await params;
    const newsDetail = await getNews(id);
    const correctedDateString = newsDetail.news_datepub.replace(' ', 'T') + '+07:00';

    if (!newsDetail) {
        return {
            title: "Berita tidak ditemukan - TIMES Indonesia",
            description: "Berita yang Anda cari tidak tersedia.",
        };
    }

    return {
        title: `${newsDetail.news_title} - TIMES Indonesia`,
        description: newsDetail.news_description,
        keywords: newsDetail.news_tags,
        authors: [{ name: newsDetail.news_writer, url: 'https://timesindonesia.co.id' }],
        keywords: newsDetail.news_tags,
        lastModified: correctedDateString,
        openGraph: {
            locale: 'id_ID',
            title: newsDetail.news_title,
            keywords: newsDetail.news_tags,
            description: newsDetail.news_description,
            publisher: 'https://timesindonesia.co.id',
            images: [
                {
                    url: newsDetail.news_image_new,
                    width: 1200,
                    height: 630,
                    alt: newsDetail.news_title,
                },
            ],
            type: "article",
            url: `https://timesindonesia.co.id${newsDetail.url_ci4 || ''}`,
            publishedTime: correctedDateString,
            authors: [{ name: newsDetail.news_writer }],
            tags: newsDetail.news_tags,
            siteName: 'TIMES Indonesia',
        },
        twitter: {
            card: "summary_large_image",
            title: newsDetail.news_title,
            description: newsDetail.news_description,
            images: [newsDetail.news_image_new],
        },
    };
}

export default async function page({ params }) {
    const { id } = params;

    const initialNewsDetail = await getNews(id);

    if (!initialNewsDetail) {
        notFound();
    }

    let writer = {};

    if (initialNewsDetail.writer_slug) {
        writer = await getWriterDetailServer({ slug: initialNewsDetail.writer_slug });
    }

    const correctedDateString = initialNewsDetail.news_datepub.replace(' ', 'T') + '+07:00';

    // --- MULAI PENAMBAHAN SCHEMA ---
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_URL}${initialNewsDetail.url_ci4 || ''}`,
        },
        'headline': initialNewsDetail.news_title,
        'description': initialNewsDetail.news_description,
        'image': [
            initialNewsDetail.news_image_new,
        ],
        'datePublished': correctedDateString,
        'dateModified': correctedDateString,
        'author': {
            '@type': 'Person',
            'name': initialNewsDetail.news_writer,
            // Jika Anda punya halaman profil penulis, URL-nya bisa ditambahkan di sini
            'url': `${process.env.NEXT_PUBLIC_URL}/writer/${initialNewsDetail.writer_slug}`
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'TIMES Indonesia',
            'logo': {
                '@type': 'ImageObject',
                // GANTI DENGAN URL LOGO ANDA YANG VALID
                'url': `${process.env.NEXT_PUBLIC_URL}/icon.png`,
            }
        },
    };


    const newsDetailForClient = {
        ...initialNewsDetail,
        news_datepub: correctedDateString, // Kirim tanggal yang sudah benar ke client
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            {/* Kirim data yang sudah diperbaiki ke komponen client */}
            <NewsDetailClient initialNewsDetail={newsDetailForClient} initialWriter={writer} />
        </>
    );
}