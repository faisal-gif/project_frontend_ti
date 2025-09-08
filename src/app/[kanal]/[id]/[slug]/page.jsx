import { getNewsDetail } from '@/lib/api/newsApi';
import React from 'react'
import NewsDetailClient from './NewsDetailClient';

export async function generateMetadata({ params }) {
    const { id } = params;
    const newsDetail = await getNewsDetail({ id });

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
        authors: [{ name: newsDetail.news_writer }],
        openGraph: {
            locale: 'id_ID',
            title: newsDetail.news_title,
            description: newsDetail.news_description,
            images: [
                {
                    url: newsDetail.news_image_new,
                    width: 1200,
                    height: 630,
                    alt: newsDetail.news_title,
                },
            ],
            type: "article",
            url: `https://timesindonesia.co.id${newsDetail.url_ci4}`,
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
    const newsDetail = await getNewsDetail({ id });
    return <NewsDetailClient initialNewsDetail={newsDetail} />;
}