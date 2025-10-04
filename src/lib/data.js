import { getAllNews, getAllNewsServer } from "./api/newsApi";

export const getSportsNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 6,
    offset: 0,
    limit: 5,
  });
};

export const getBusinessNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 8,
    offset: 0,
    limit: 5,
  });
};

export const getSportsNewsClient = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 6,
    offset: 0,
    limit: 5,
  });
};

export const getBusinessNewsClient = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 8,
    offset: 0,
    limit: 5,
  });
};

export const getEntertainmentNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 12,
    offset: 0,
    limit: 5,
  });
};

export const getLipsusNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "tag",
    title: "liputan_khusus",
    offset: 0,
    limit: 5,
  });
};

export const getLipsusNewsClient = async () => {
  return await getAllNews({
    news_type: "tag",
    title: "liputan_khusus",
    offset: 0,
    limit: 5,
  });
};

export const getWansusNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 50,
    offset: 0,
    limit: 10,
  });
}

export const getIndoPositifNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 30,
    offset: 0,
    limit: 5,
  });
};

export const getKopiTimesNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "cat",
    cat_id: 15,
    offset: 0,
    limit: 5,
  });
};

export const getCekFaktaNewsServer = async () => {
  return await getAllNewsServer({
    news_type: "focus",
    cat_id: 221,
    offset: 0,
    limit: 3,
  });
};

// --- UBAH FUNGSI INI ---
export const getNewsFirstSectionsServer = async () => {
    // 1. Panggil semua fungsi tanpa 'await' untuk mendapatkan promises
    const sportsPromise = getSportsNewsServer();
    const businessPromise = getBusinessNewsServer();
    const lipsusPromise = getLipsusNewsServer();

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

export const getNewsFirstSectionsClient = async () => {
    // 1. Panggil semua fungsi tanpa 'await' untuk mendapatkan promises
    const sportsPromise = getSportsNewsClient();
    const businessPromise = getBusinessNewsClient();
    const lipsusPromise = getLipsusNewsClient();

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
export const getNewsSecondSectionsServer = async () => {
    // 1. Panggil semua fungsi tanpa 'await'
    const entertainmentPromise = getEntertainmentNewsServer();
    const indoPositifPromise = getIndoPositifNewsServer();
    const kopiTimesPromise = getKopiTimesNewsServer();

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
