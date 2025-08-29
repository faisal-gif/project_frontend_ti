import { serverAxios } from "@/lib/api/axiosInstance";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { id } = params;

    try {
        const response = await serverAxios.get(`/koran_detail/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: error.response?.status || 500 }
        );
    }
}