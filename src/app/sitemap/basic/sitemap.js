import { getAllFocus } from "@/lib/api/focus";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {


    const urls = [
        "https://timesindonesia.co.id",
        "https://timesindonesia.co.id/piala-dunia-2022",
        "https://timesindonesia.co.id/page/terms-and-conditions",
        "https://timesindonesia.co.id/page/tentang-kami",
        "https://timesindonesia.co.id/page/redaksi",
        "https://timesindonesia.co.id/page/jurnalisme-positif",
        "https://timesindonesia.co.id/page/info-iklan",
        "https://timesindonesia.co.id/page/privacy-policy",
        "https://timesindonesia.co.id/page/about-us",
        "https://timesindonesia.co.id/page/contact-us",
    ];

    const lastmod = new Date().toISOString(); // otomatis update waktu


    return urls.map((sitemap) => ({
        url: `${sitemap}`,
        lastModified: lastmod,
        changeFrequency: "daily",
        priority: 1.0,
    }));
}
