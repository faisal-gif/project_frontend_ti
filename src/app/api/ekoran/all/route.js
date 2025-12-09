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
        console.error("Axios Error:", error.message);

        // Cek jika error adalah error jaringan (timeout, ENOTFOUND, dll)
        if (error.code === 'ETIMEDOUT') {
            return NextResponse.json(
                { message: "Timeout koneksi ke API eksternal.", detail: error.message },
                { status: 504 } // Gateway Timeout
            );
        }

        // Cek jika ada respons dari API (status 4xx/5xx)
        if (error.response) {
            return NextResponse.json(
                { message: "API merespons dengan error.", detail: error.response.data },
                { status: error.response.status }
            );
        }

        // Error lainnya
        return NextResponse.json(
            { message: "Kesalahan Server Internal.", detail: error.message },
            { status: 500 }
        );
    }
}
