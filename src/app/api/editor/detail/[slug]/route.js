import { serverAxios } from "@/lib/api/axiosInstance";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
    const { params } = await context;
    const { slug } = params;

    try {
        const response = await serverAxios.get('/editor/', {
            params: {
                name: slug
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