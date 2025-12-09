import { NextResponse } from "next/server";
import { serverAxios } from "@/lib/api/axiosInstance";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || 10;
    const offset = searchParams.get("offset") || 0;
    const news_type = searchParams.get("news_type") || 'all';
    const cat_id = searchParams.get("cat_id") || '';
    const title = searchParams.get("title") || '';
    const editor_id = searchParams.get("editor_id") || '';

    try {
        const response = await serverAxios.get('/all_news_index/', {
            params: {
                news_type,
                cat_id,
                offset,
                title,
                limit,
                editor_id,
                timeout: 5000,
                validateStatus: () => true,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
