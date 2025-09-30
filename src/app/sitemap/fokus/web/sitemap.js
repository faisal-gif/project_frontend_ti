import { getAllFocus } from "@/lib/api/focus";

export default async function sitemap() {
    const getFocusData = await getAllFocus({ offset: 0, limit: 500 });

    return getFocusData.map((focus) => ({
        url: `${process.env.NEXT_PUBLIC_URL}${focus.urlPath}`,
        lastModified: focus.created ? new Date(focus.created) : new Date(),
        changeFrequency: "weekly",
        priority: 0.5, 
    }));
}
