import NotFound from "@/app/not-found";
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
            NotFound();
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

const getRelatedNews = async (
    { related = 'no', news_id = '', cat_id = '', rel_title = '' }
) => {
    try {
        // 1. Siapkan URL dan query parameters
        const baseUrl = process.env.API_URL;
        const apiUrl = new URL(`${baseUrl}/news_related/?news_id=${news_id}&cat_id=${cat_id}&rel_title=${rel_title}&key=${process.env.SECRET_KEY}`);

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

// Variable cache diletakkan di luar fungsi agar persisten selama sesi aplikasi berjalan
const newsCache = new Map();

const getBajaJugaNews = async ({ news_type = 'tag', offset = 0, limit = 5, title, cat_id }) => {
    // 1. Buat Unique Cache Key berdasarkan parameter
    const cacheKey = `${news_type}-${title}-${cat_id}-${offset}-${limit}`;

    // 2. Cek apakah data sudah ada di cache
    if (newsCache.has(cacheKey)) {
        console.log("Mengambil data dari cache...");
        return newsCache.get(cacheKey);
    }

    try {
        // 3. Request pertama: Berdasarkan Tag (menggunakan parameter title)
        let response = await clientAxios.get("news/all", {
            params: {
                news_type: 'tag',
                title: title, // Slug dari tag pertama
                offset: offset,
                limit: limit,
            },
        });

        let data = response.data?.data || [];

        // 4. Jika data < 5, ambil berdasarkan Category (menggunakan parameter cat_id)
        if (data.length < 5) {
            console.log("Data tag kurang dari 5, mengambil dari category...");
            
            const fallbackResponse = await clientAxios.get("news/all", {
                params: {
                    news_type: 'cat',
                    cat_id: cat_id, // Berdasarkan ID Kategori
                    offset: offset,
                    limit: limit,
                },
            });

            const fallbackData = fallbackResponse.data?.data || [];
            
            // Gabungkan data tag dan category (opsional: jika ingin mencampur)
            // Atau timpa jika ingin full category saat tag dikit
            data = [...data, ...fallbackData].slice(0, limit);
        }

        // 5. Simpan hasil ke cache sebelum dikembalikan
        newsCache.set(cacheKey, data);
        
        return data;

    } catch (error) {
        console.error("Error fetching news:", error);
        return []; 
    }
};

export {
    getAllNews,
    getAllNewsIndex,
    getAllNewsServer,
    getNewsDetail,
    getNewsDetailUniq,
    getRelatedNews,
    getBajaJugaNews,
    updateView,
}