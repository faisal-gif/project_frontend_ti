import { getAllFoto } from "@/lib/api/fotoApi";


export default async function sitemap() {
    const getFotoData = await getAllFoto({ news_type: "all", offset: 0, limit: 500 });

    return getFotoData.map((foto) => ({
        url: `${process.env.NEXT_PUBLIC_URL}${foto.url_ci4}`,
        lastModified: foto.gal_datepub ? new Date(foto.gal_datepub) : new Date(),
        changeFrequency: "weekly",
        priority: 0.5, 
    }));
}
