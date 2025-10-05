// app/sitemap/news/route.ts
import { getAllKanal } from "@/lib/api/kanalApi";

export const dynamic = "force-dynamic";

export async function GET() {

    const basic = [
        `${process.env.NEXT_PUBLIC_URL}/sitemap/basic/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/ekoran/news/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/ekoran/web/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/fokus/news/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/fokus/web/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/foto/news/sitemap.xml`,
        `${process.env.NEXT_PUBLIC_URL}/sitemap/foto/web/sitemap.xml`,
    ];

    let kanal = [];

    try {
        kanal = await getAllKanal() || [];

    } catch (error) {
        console.error("Error fetch ekoran:", error);
        kanal = []; // fallback supaya tidak crash
    }

    const lastmod = new Date().toISOString();
    const xml = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    ${basic.map((item) =>
        `
    <sitemap>
        <loc>${item}</loc>
        <lastmod>${lastmod}</lastmod>
    </sitemap>
    `
    ).join("")}
  ${kanal.map((item) => `
    <sitemap>
        <loc>${process.env.NEXT_PUBLIC_URL}/sitemap/kanal/news/${item.slug}/sitemap.xml</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </sitemap>
    <sitemap>
        <loc>${process.env.NEXT_PUBLIC_URL}/sitemap/kanal/web/${item.slug}/sitemap.xml</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </sitemap>
    `
    )
            .join("")}
</sitemapindex>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
