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

export const getWansusNews = async () => {
  return await getAllNews({
    news_type: "cat",
    cat_id: 50,
    offset: 0,
    limit: 10,
  });
}

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
      layout: 'normal',
    },
    {
      title: "Ekonomi",
      news: await getBusinessNews(),
      layout: 'grid',
    },
    {
      title: "Liputan Khusus",
      news: await getLipsusNews(),
      layout: 'reverse',
    },

  ];
};

export const getNewsSecondSections = async () => {
  return [
    {
      title: "Gaya Hidup",
      layout: 'normal',
      news: await getEntertainmentNews(),
    },
    {
      title: "Indonesia Positif",
      layout: 'grid',
      news: await getIndoPositifNews(),
    },
    {
      title: "Kopi Times",
      layout: 'reverse',
      news: await getKopiTimesNews(),
    },
  ];
};
