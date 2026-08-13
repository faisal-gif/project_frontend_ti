const getViewAds = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API (tanpa query key)
        const apiUrl = `${process.env.API_URL}/ads/view/1/${id}`;

        const response = await fetch(apiUrl, {
            // Tambahkan x-api-key di headers
            headers: {
                'x-api-key': process.env.SECRET_KEY
            },
            next: { revalidate: 300 },
            // Timeout: iklan opsional, jangan tahan render/build kalau API lambat.
            signal: AbortSignal.timeout(5000),
        });

        // 3. Cek jika respons dari server tidak berhasil (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Ambil data dalam format JSON
        const data = await response.json();

        // 5. Kembalikan data yang dibutuhkan
        if (data && data.data && data.data.unique_id) {
            return data.data; // Kembalikan data jika valid
        } else {
            return null; // BAGUS: Kembalikan null jika data kosong atau tidak valid
        }

    } catch (error) {
        // 6. Tangani error dan kembalikan null agar iklan cukup disembunyikan.
        console.error(`Error fetching ad for id ${id}:`, error);
        return null;
    }
};

const getViewAdsList = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API (tanpa query key)
        const apiUrl = `${process.env.API_URL}/ads/view/all/1/${id}`;

        const response = await fetch(apiUrl, {
            // Tambahkan x-api-key di headers
            headers: {
                'x-api-key': process.env.SECRET_KEY
            },
            next: { revalidate: 300 },
            // Timeout: iklan opsional, jangan tahan render/build kalau API lambat.
            signal: AbortSignal.timeout(5000),
        });


        // 3. Cek jika respons dari server tidak berhasil (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // 4. Ambil data dalam format JSON
        const data = await response.json();

        // 5. Kembalikan data yang dibutuhkan
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            return data.data; // Kembalikan data jika valid
        } else {
            return null; // BAGUS: Kembalikan null jika data kosong atau tidak valid
        }

    } catch (error) {
        // 6. Tangani error dan kembalikan null agar iklan cukup disembunyikan.
        console.error(`Error fetching ad list for id ${id}:`, error);
        return null;
    }
};

export {
    getViewAds,
    getViewAdsList,
}