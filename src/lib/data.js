import { getAllNews } from "./api/newsApi";

export const getSportsNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 6,
    offset: 0,
    limit: 5,
  });
};

export const getBusinessNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 2,
    offset: 0,
    limit: 5,
  });
};

export const getEntertainmentNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 12,
    offset: 0,
    limit: 5,
  });
};

export const getLipsusNews = async () => {
  return await getAllNews({
    news_type: "tag",
    title: "liputan_khusus",
    offset: 0,
    limit: 5,
  });
};

export const getIndoPositifNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 30,
    offset: 0,
    limit: 5,
  });
};

export const getKopiTimesNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 15,
    offset: 0,
    limit: 5,
  });
};

export const getNewsFirstSections = async () => {
  return [
    {
      title: "Olahraga",
      news: await getSportsNews(),
    },
    {
      title: "Ekonomi",
      news: await getBusinessNews(),
    },
    {
      title: "Gaya Hidup",
      news: await getEntertainmentNews(),
    },
  ];
};

export const getNewsSecondSections = async () => {
  return [
    {
      title: "Liputan Khusus",
      news: await getLipsusNews(),
    },
    {
      title: "Indonesia Positif",
      news: await getIndoPositifNews(),
    },
    {
      title: "Kopi Times",
      news: await getKopiTimesNews(),
    },
  ];
};
