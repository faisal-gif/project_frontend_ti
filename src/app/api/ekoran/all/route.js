import { NextResponse } from "next/server";
import { serverAxios } from "@/lib/api/axiosInstance";


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const offset = searchParams.get("offset") || 0;
    const limit = searchParams.get("limit") || 10;

    try {
        const response = await serverAxios.get('/all_ekoran/', {
            params: {
                offset,
                limit,
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
