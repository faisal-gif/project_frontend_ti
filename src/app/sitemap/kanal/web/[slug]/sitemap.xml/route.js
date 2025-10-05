import { getKanalDetail } from "@/lib/api/kanalApi";
import { getAllNews, getAllNewsIndex } from "@/lib/api/newsApi";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export async function GET(request, { params }) {
    const { slug } = await params;
    let news = [];


    try {
        const kanal = await getKanalDetail({ slug });
        news = await getAllNewsIndex({ news_type: 'cat', cat_id: kanal.catnews_id, offset: 0, limit: 500 }) || [];
    } catch (error) {
        console.error("Error fetch ekoran:", error);
        news = []; // fallback supaya tidak crash
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${news
            .map(
                (item) => `
    <url>
        <loc>${process.env.NEXT_PUBLIC_URL}${item.url_ci4}</loc>
          <lastmod>${new Date().toISOString(item.news_datepub)}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`
            )
            .join("")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
