const getViewAds = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API
        const apiUrl = `${process.env.API_URL}/ads/view/1/${id}`;

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
        if (data && data.data.unique_id) {
            return data.data; // Kembalikan data jika valid
        } else {
            return null; // BAGUS: Kembalikan null jika data kosong atau tidak valid
        }

    } catch (error) {
        // 6. Tangani error dan kembalikan null agar halaman bisa menampilkan pesan "tidak ditemukan"
        console.error(`Error fetching news detail for id ${id}:`, error);
        return null;
    }
};


export {
    getViewAds
}