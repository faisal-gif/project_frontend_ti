import { getAllEkoran } from "@/lib/api/ekoran";


export default async function sitemap() {
    const getEkoranData = await getAllEkoran({ offset: 0, limit: 500 });

    return getEkoranData.map((ekoran) => ({
        url: `${process.env.NEXT_PUBLIC_URL}${ekoran.url_ci4}`,
        lastModified: ekoran.gal_datepub ? new Date(ekoran.datepub) : new Date(),
        changeFrequency: "weekly",
        priority: 0.5, // default untuk artikel/ekoran
    }));
}
