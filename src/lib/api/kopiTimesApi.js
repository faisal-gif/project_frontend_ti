const getWriterKopiTimes = async ({ id }) => {
    try {
        // 1. Buat URL lengkap ke endpoint API
        const apiUrl = `https://kopi.times.co.id/api/news/show/${id}`;

        const response = await fetch(apiUrl, {
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


export { getWriterKopiTimes };