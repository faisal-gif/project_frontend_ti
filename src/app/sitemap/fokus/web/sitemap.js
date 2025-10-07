import { getAllFocus } from "@/lib/api/focus";

export const dynamic = "force-dynamic"; // sitemap selalu runtime

export default async function sitemap() {

    let getFocusData = [];
    try {
        getFocusData = await getAllFocus({ offset: 0, limit: 500 });
    } catch (error) {
        console.error("Failed to fetch focus data:", error);
    }

    return getFocusData.map((focus) => ({
        url: `${process.env.NEXT_PUBLIC_URL}${focus.urlPath}`,
        lastModified: focus.created ? focus.created.replace(' ', 'T') + '+07:00' : new Date(),
    }));
}
