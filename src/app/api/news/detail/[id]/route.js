import { serverAxios } from "@/lib/api/axiosInstance";
import { NextResponse } from "next/server";

export async function GET(_, context) {
    const { id } = await context.params;

    try {
        const response = await serverAxios.get(`/news_detail/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}