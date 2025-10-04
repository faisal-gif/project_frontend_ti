import { getAllNews, getAllNewsServer } from "./api/newsApi";

export const getSportsNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 6,
    offset: 0,
    limit: 5,
  });
};

export const getBusinessNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 8,
    offset: 0,
    limit: 5,
  });
};

export const getEntertainmentNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 12,
    offset: 0,
    limit: 5,
  });
};

export const getLipsusNews = async () => {
  return await getAllNewsServer({
    news_type: "tag",
    title: "liputan_khusus",
    offset: 0,
    limit: 5,
  });
};

export const getWansusNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 50,
    offset: 0,
    limit: 10,
  });
}

export const getIndoPositifNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 30,
    offset: 0,
    limit: 5,
  });
};

export const getKopiTimesNews = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 15,
    offset: 0,
    limit: 5,
  });
};

export const getCekFaktaNews = async () => {
  return await getAllNewsServer({
    news_type: "focus",
    cat_id: 221,
    offset: 0,
    limit: 3,
  });
};

// --- UBAH FUNGSI INI ---
export const getNewsFirstSections = async () => {
    // 1. Panggil semua fungsi tanpa 'await' untuk mendapatkan promises
    const sportsPromise = getSportsNews();
    const businessPromise = getBusinessNews();
    const lipsusPromise = getLipsusNews();

    // 2. Jalankan semua promise secara bersamaan
    const [sportsNews, businessNews, lipsusNews] = await Promise.all([
        sportsPromise,
        businessPromise,
        lipsusPromise,
    ]);

    // 3. Susun hasilnya setelah semua data diterima
    return [
        {
            title: "Olahraga",
            news: sportsNews,
            layout: 'normal',
        },
        {
            title: "Ekonomi",
            news: businessNews,
            layout: 'grid',
        },
        {
            title: "Liputan Khusus",
            news: lipsusNews,
            layout: 'reverse',
        },
    ];
};

// --- UBAH FUGSI INI JUGA ---
export const getNewsSecondSections = async () => {
    // 1. Panggil semua fungsi tanpa 'await'
    const entertainmentPromise = getEntertainmentNews();
    const indoPositifPromise = getIndoPositifNews();
    const kopiTimesPromise = getKopiTimesNews();

    // 2. Jalankan semua promise secara bersamaan
    const [entertainmentNews, indoPositifNews, kopiTimesNews] = await Promise.all([
        entertainmentPromise,
        indoPositifPromise,
        kopiTimesPromise,
    ]);

    // 3. Susun hasilnya
    return [
        {
            title: "Gaya Hidup",
            layout: 'normal',
            news: entertainmentNews,
        },
        {
            title: "Indonesia Positif",
            layout: 'grid',
            news: indoPositifNews,
        },
        {
            title: "Kopi Times",
            layout: 'reverse',
            news: kopiTimesNews,
        },
    ];
};
