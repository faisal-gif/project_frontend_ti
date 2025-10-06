import { getAllNewsIndex } from '@/lib/api/newsApi';

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {

    let getNewsData = [];
    try {
        getNewsData = await getAllNewsIndex({ news_type: 'all', offset: 0, limit: 500 });
    } catch (error) {
        console.error("Failed to fetch foto data:", error);
    }

    return getNewsData.map((news) => ({
        url: process.env.NEXT_PUBLIC_URL + news.url_ci4,
        lastModified: new Date(news.news_datepub).toISOString(), // pakai format ISO
        images: [news.news_image_new],
    }));
}
