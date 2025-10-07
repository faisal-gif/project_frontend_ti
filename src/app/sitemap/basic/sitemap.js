import { getAllFocus } from "@/lib/api/focus";
import { formatInTimeZone } from "date-fns-tz";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {


    const urls = [
        `${process.env.NEXT_PUBLIC_URL}`,
        `${process.env.NEXT_PUBLIC_URL}/piala-dunia-2022`,
        `${process.env.NEXT_PUBLIC_URL}/page/terms-and-conditions`,
        `${process.env.NEXT_PUBLIC_URL}/page/tentang-kami`,
        `${process.env.NEXT_PUBLIC_URL}/page/redaksi`,
        `${process.env.NEXT_PUBLIC_URL}/page/jurnalisme-positif`,
        `${process.env.NEXT_PUBLIC_URL}/page/info-iklan`,
        `${process.env.NEXT_PUBLIC_URL}/page/privacy-policy`,
        `${process.env.NEXT_PUBLIC_URL}/page/about-us`,
        `${process.env.NEXT_PUBLIC_URL}/page/contact-us`,
    ];

    const lastmod = formatInTimeZone(new Date(), 'Asia/Jakarta', "yyyy-MM-dd'T'HH:mm:ssXXX");


    return urls.map((sitemap) => ({
        url: `${sitemap}`,
        lastModified: lastmod,
        changeFrequency: "daily",
        priority: 1.0,
    }));
}
