import { NextResponse } from "next/server";
import { serverAxios } from "@/lib/api/axiosInstance";


export async function GET(req) {
    const { searchParams } = new URL(req.url);

    try {
        const response = await serverAxios.get('/kanal/');

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}
