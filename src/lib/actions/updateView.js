// File: app/lib/actions.js

"use server";

import { serverAxios } from "../api/axiosInstance";


export async function incrementView(newsId) {
    if (!newsId) {
        return { success: false, error: "News ID is required." };
    }

    try {
        const response = await serverAxios.get(`/news_pageviews/${newsId}`);

        const newViewCount = response.data.data.pageviews;
         

        return { success: true, newViewCount: newViewCount };

    } catch (error) {
        console.error('Error in incrementView action:', error.message);
        return { success: false, error: 'Failed to update view count.' };
    }
}