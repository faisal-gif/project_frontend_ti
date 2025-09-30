import { getAllFocus } from "@/lib/api/focus";


export async function GET() {
  const news = await getAllFocus({ offset: 0, limit: 500 });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${news
    .map(
      (item) => `
    <url>
      <loc><![CDATA[ ${process.env.NEXT_PUBLIC_URL}${item.urlPath} ]]></loc>
      <news:news>
        <news:publication>
          <news:name><![CDATA[ ${item.focnews_title} ]]></news:name>
          <news:language><![CDATA[ id ]]></news:language>
        </news:publication>
        <news:publication_date><![CDATA[ ${item.created} ]]></news:publication_date>
        <news:title><![CDATA[ ${item.focnews_title} ]]></news:title>
        <news:keywords><![CDATA[ ${item.focnews_keyword} ]]></news:keywords>
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
