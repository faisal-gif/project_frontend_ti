import { clientAxios, serverAxios } from "./axiosInstance";

const getAllNews = async (
    { news_type = 'all', offset = 0, limit = 10, cat_id, title, editor_id }
) => {
    try {
        const response = await clientAxios.get("news/all", {
            params: {
                news_type: news_type,
                cat_id: cat_id,
                offset: offset,
                title: title,
                limit: limit,
                editor_id: editor_id
            },
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getAllNewsIndex = async (
    { news_type = 'all', offset = 0, limit = 10, cat_id, title, editor_id }
) => {
    try {
        const response = await clientAxios.get("news/all-index", {
            params: {
                news_type: news_type,
                cat_id: cat_id,
                offset: offset,
                title: title,
                limit: limit,
                editor_id: editor_id
            },
        });
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

const getAllNewsServer = async (
    { news_type = 'all', offset = 0, limit = 10, cat_id, title, editor_id }
) => {
    try {
        // 1. Siapkan URL dan query parameters
        const baseUrl = process.env.API_URL;
        const apiUrl = new URL(`${baseUrl}/all_news/`);
        const params = { news_type, offset, limit, cat_id, title, editor_id, key: process.env.SECRET_KEY, };

        // Tambahkan parameter ke URL hanya jika nilainya ada
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                apiUrl.searchParams.append(key, value);
            }
        });

        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            next: { revalidate: 60 },
        });

        // 3. Cek jika respons tidak berhasil
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Ambil data JSON dan kembalikan
        const data = await response.json();
        return data.data; // Sesuaikan dengan struktur respons API Anda

    } catch (error) {
        // 5. Tangani error dan kembalikan nilai default agar aplikasi tidak crash
        console.error("Error fetching news:", error);
        return []; // Mengembalikan array kosong adalah praktik yang aman
    }
};

const getNewsDetail = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API
        const apiUrl = `${process.env.API_URL}/news_detail/${id}`;

        // Tambahkan query parameter untuk key
        const apiUrlWithKey = `${apiUrl}?key=${process.env.SECRET_KEY}`;

        const response = await fetch(apiUrlWithKey, {

            next: { revalidate: 300 },
        });


        // 3. Cek jika respons dari server tidak berhasil (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Ambil data dalam format JSON
        const data = await response.json();

        // 5. Kembalikan data yang dibutuhkan
        return data.data;

    } catch (error) {
        // 6. Tangani error dan kembalikan null agar halaman bisa menampilkan pesan "tidak ditemukan"
        console.error(`Error fetching news detail for id ${id}:`, error);
        return null;
    }
};

const getNewsDetailUniq = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API
        const apiUrl = `${process.env.API_URL}/news_detail/uniq/${id}`;

        // Tambahkan query parameter untuk key
        const apiUrlWithKey = `${apiUrl}?key=${process.env.SECRET_KEY}`;

        const response = await fetch(apiUrlWithKey, {

            next: { revalidate: 300 },
        });


        // 3. Cek jika respons dari server tidak berhasil (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Ambil data dalam format JSON
        const data = await response.json();

        // 5. Kembalikan data yang dibutuhkan
        return data.data;

    } catch (error) {
        // 6. Tangani error dan kembalikan null agar halaman bisa menampilkan pesan "tidak ditemukan"
        console.error(`Error fetching news detail for id ${id}:`, error);
        return null;
    }
};


const updateView = async ({ id }) => {
    try {
        const response = await clientAxios.get(`news/view/${id}`);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};

export {
    getAllNews,
    getAllNewsIndex,
    getAllNewsServer,
    getNewsDetail,
    getNewsDetailUniq,
    updateView,
}