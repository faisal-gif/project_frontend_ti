import { getAllNews } from "@/lib/api/newsApi";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

function xmlConvert(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    let news = [];

    try {
        news = await getAllNews({ offset: 0, limit: 1000 }) || [];
    } catch (error) {
        console.error("Error fetch focus:", error);
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
        <lastmod>${item.news_datepub.replace(' ', 'T') + '+07:00'}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      <news:news>
        <news:publication>
          <news:name>TIMES Indonesia</news:name>
          <news:language>id</news:language>
        </news:publication>
        <news:publication_date>${item.news_datepub.replace(' ', 'T') + '+07:00'}</news:publication_date>
        <news:title>${xmlConvert(item.news_title)}</news:title>
        <news:keywords>>${xmlConvert(
                    `${item.news_city.toLowerCase()}, ${item.news_tags}`
                )}</news:keywords>
      </news:news>
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
