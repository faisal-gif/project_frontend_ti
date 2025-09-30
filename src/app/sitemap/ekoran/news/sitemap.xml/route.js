// app/sitemap/news/route.ts
import { getAllEkoran } from "@/lib/api/ekoran";

export async function GET() {
  const news = await getAllEkoran({ offset: 0, limit: 500 });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${news
    .map(
      (item) => `
    <url>
      <loc><![CDATA[ ${process.env.NEXT_PUBLIC_URL}${item.url_ci4} ]]></loc>
      <news:news>
        <news:publication>
          <news:name><![CDATA[ ${item.title} ]]></news:name>
          <news:language><![CDATA[ id ]]></news:language>
        </news:publication>
        <news:publication_date><![CDATA[ ${item.datepub} ]]></news:publication_date>
        <news:title><![CDATA[ ${item.title} ]]></news:title>
        <news:keywords><![CDATA[ ekoran times indonesia,e-koran times indonesia,epaper times indonesia,${item.title} ]]></news:keywords>
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
