import { getAllNewsIndex } from "@/lib/api/newsApi";

export const dynamic = "force-dynamic"; 

function xmlConvert(str) {
    // Tambahkan pengaman: jika str kosong/null, kembalikan string kosong
    if (!str) return ""; 
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
        news = await getAllNewsIndex({ offset: 0, limit: 500 }) || [];
    } catch (error) {
        console.error("Error fetch focus:", error);
        news = []; 
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${news
            .map((item) => {
                // Formatting tanggal (pastikan format defaultnya memang "YYYY-MM-DD HH:MM:SS")
                const dateMod = item.news_datepub ? item.news_datepub.replace(' ', 'T') + '+07:00' : '';
                
                // Amankan pembacaan properti objek
                const city = item.news_city ? item.news_city.toLowerCase() : '';
                const tags = item.news_tags || '';
                const keywords = [city, tags].filter(Boolean).join(", ");

                return `
    <url>
        <loc>${process.env.NEXT_PUBLIC_URL}${item.url_ci4}</loc>
        <lastmod>${dateMod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      <news:news>
        <news:publication>
          <news:name>TIMES Indonesia</news:name>
          <news:language>id</news:language>
        </news:publication>
        <news:publication_date>${dateMod}</news:publication_date>
        <news:title>${xmlConvert(item.news_title)}</news:title>
        <news:keywords>${xmlConvert(keywords)}</news:keywords>
      </news:news>
    </url>`;
            })
            .join("")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            // Cache control untuk memastikan browser/bot tidak meng-cache file ini secara paksa
            "Cache-Control": "s-maxage=0, stale-while-revalidate", 
        },
    });
}