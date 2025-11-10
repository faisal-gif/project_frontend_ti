import { getAllEkoran } from "@/lib/api/ekoran";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {
    let getEkoranData = [];
    try {
        getEkoranData = await getAllEkoran({ offset: 0, limit: 500 });
    } catch (error) {
        console.error("Failed to fetch ekoran data:", error);
    }

    return getEkoranData.map((ekoran) => ({
        url: `${process.env.NEXT_PUBLIC_URL}${ekoran.url_ci4}`,
        lastModified: ekoran.gal_datepub ? ekoran.created.replace(' ', 'T') + '+07:00' : new Date(),
        changeFrequency: "weekly",
        priority: 0.5, // default untuk artikel/ekoran
    }));
}
