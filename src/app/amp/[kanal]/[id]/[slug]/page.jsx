import React, { cache } from 'react';
import { notFound } from 'next/navigation';

import { getNewsDetail, getAllNews } from '@/lib/api/newsApi';
import { getWriterDetailServer } from '@/lib/api/jurnalist';
import { getEditorDetail } from '@/lib/api/editor';
import { getFocusDetail } from '@/lib/api/focus';
import { getNewsFirstSectionsClient } from '@/lib/data'; // Asumsi ini bisa jalan di server
import { incrementView } from '@/lib/actions/updateView'; // Impor server action
import NewsDetailAMP from './NewsDetailAMP';


export const config = {
    amp: true,
};
// -------------------------

export const revalidate = 60;

// Fungsi cache yang sama
const getNews = cache(async (id) => {
    return await getNewsDetail({ id });
});

// Metadata untuk halaman AMP
export async function generateMetadata({ params }) {
    const { id } = await params;
    const newsDetail = await getNews(id);

    if (!newsDetail) {
        return {
            title: "Berita tidak ditemukan - TIMES Indonesia",
        };
    }

    const correctedDateString = newsDetail.news_datepub.replace(' ', 'T') + '+07:00';
    const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}${newsDetail.url_ci4 || ''}`;

    // Metadata AMP hampir sama, tapi HANYA punya 'canonical'
    return {
        title: `${newsDetail.news_title} - TIMES Indonesia`,
        description: newsDetail.news_description,
        keywords: newsDetail.news_tags,
        authors: [{ name: newsDetail.news_writer, url: 'https://timesindonesia.co.id' }],
        lastModified: correctedDateString,
        alternates: {
            canonical: canonicalUrl, // Menunjuk kembali ke halaman standar
        },
        openGraph: {
            // ... (Data OG bisa disalin dari page.jsx utama)
            locale: 'id_ID',
            title: newsDetail.news_title,
            description: newsDetail.news_description,
            images: [ /* ... */ ],
            type: "article",
            url: canonicalUrl,
        },
        twitter: {
            // ... (Data Twitter bisa disalin)
            card: "summary_large_image",
            title: newsDetail.news_title,
            description: newsDetail.news_description,
            images: [newsDetail.news_image_new],
        },
    };
}

// Halaman AMP adalah Server Component yang mengambil SEMUA data
export default async function AmpPage({ params }) {
    const { id } = params;

    // 1. Ambil data utama (sama seperti page.jsx)
    const initialNewsDetail = await getNews(id);
    if (!initialNewsDetail) {
        notFound();
    }

    let writer = {};
    if (initialNewsDetail.writer_slug) {
        writer = await getWriterDetailServer({ slug: initialNewsDetail.writer_slug });
    }

    // 2. Ambil data yang sebelumnya diambil di useEffect NewsDetailClient
    let editorDetail = null;
    let focusDetail = null;
    let relatedNews = [];
    let newsFirstSections = [];
    
    try {
        editorDetail = await getEditorDetail({ slug: initialNewsDetail.editor_alias });

        if (Number(initialNewsDetail.focnews_id) !== 0) {
            focusDetail = await getFocusDetail({ id: initialNewsDetail.focnews_id });
        }

        const firstTag = (initialNewsDetail.news_tags?.split(',').map(tag => tag.trim()).filter(Boolean)[0]) || '';
        if (firstTag) {
            relatedNews = await getAllNews({ news_type: 'tag', title: firstTag, limit: 5, offset: 0 });
        }

        newsFirstSections = await getNewsFirstSectionsClient();
        
    } catch (error) {
        console.error("Gagal mengambil data tambahan untuk AMP:", error);
        // Biarkan halaman tetap render walau data tambahan gagal
    }

    // 3. Panggil Server Action untuk increment view
    let displayViews = initialNewsDetail.views || 0;
    try {
        const viewResult = await incrementView(initialNewsDetail.news_id);
        if (viewResult.success && viewResult.newViewCount) {
            displayViews = viewResult.newViewCount;
        }
    } catch (error) {
        console.error("Gagal increment view di server AMP:", error);
    }


    // 4. Siapkan Schema (sama seperti page.jsx)
    const correctedDateString = initialNewsDetail.news_datepub.replace(' ', 'T') + '+07:00';
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        // ... (Salin semua data schema dari page.jsx Anda)
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_URL}${initialNewsDetail.url_ci4 || ''}`,
        },
        'headline': initialNewsDetail.news_title,
        'description': initialNewsDetail.news_description,
        'image': [ initialNewsDetail.news_image_new, ],
        'datePublished': correctedDateString,
        'dateModified': correctedDateString,
        'author': {
            '@type': 'Person',
            'name': initialNewsDetail.news_writer,
            'url': `${process.env.NEXT_PUBLIC_URL}/writer/${initialNewsDetail.writer_slug}`
        },
        'publisher': {
            '@type': 'Organization',
            'name': 'TIMES Indonesia',
            'logo': { '@type': 'ImageObject', 'url': `${process.env.NEXT_PUBLIC_URL}/icon.png`, }
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            {/* Render komponen NewsDetailAMP dan lemparkan SEMUA data
              sebagai props.
            */}
            <NewsDetailAMP
                newsDetail={initialNewsDetail}
                writerDetail={writer}
                editorDetail={editorDetail}
                focusDetail={focusDetail}
                relatedNews={relatedNews}
                newsViews={displayViews}
                newsFirstSections={newsFirstSections}
            />
        </>
    );
}