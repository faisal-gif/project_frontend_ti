import SearchDetail from "./SearchDetail";

export async function generateMetadata({ searchParams }) {
    // ✅ harus di-await dulu
    const params = await searchParams;
    const q = params?.q || "";

    return {
        title: q ? `Hasil pencarian untuk "${q}" | Times Indonesia` : "Pencarian | Times Indonesia",
        description: q
            ? `Temukan berita terkait dengan "${q}" di Times Indonesia.`
            : "Cari berita terbaru dan terlengkap di Times Indonesia.",
        openGraph: {
            title: q ? `Hasil pencarian untuk "${q}" | Times Indonesia` : "Pencarian | Times Indonesia",
            description: q
                ? `Temukan berita terkait dengan "${q}" di Times Indonesia.`
                : "Cari berita terbaru dan terlengkap di Times Indonesia.",
            url: `https://timesindonesia.co.id/search?q=${q}`,
            siteName: "Times Indonesia",
            type: "website",
        },
    };
}

export default async function SearchPage({ searchParams }) {
    // ✅ harus di-await dulu
    const params = await searchParams;
    const q = params?.q || "";
    return <SearchDetail keyword={q} />;
}