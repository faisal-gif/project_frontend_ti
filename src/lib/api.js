import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.tin.co.id/v1/all_ekoran/?key=NyEIwDL51eeaoVhYGPaF', // ganti dengan URL API
    headers: {
        'Content-Type': 'application/json',
    },
});


const apiEkoran = axios.create({
    baseURL: 'https://api.tin.co.id/v1/all_ekoran/?key=NyEIwDL51eeaoVhYGPaF', // ganti dengan URL API
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiGallery = axios.create({
    baseURL: 'https://api.tin.co.id/v1/all_gallery/?key=NyEIwDL51eeaoVhYGPaF', // ganti dengan URL API
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiNews = axios.create({
    baseURL: 'https://api.tin.co.id/v1/all_news/?key=NyEIwDL51eeaoVhYGPaF',
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiDetailKanal = axios.create({
    baseURL: 'https://api.tin.co.id/v1/cat_detail/{slug}/?key=NyEIwDL51eeaoVhYGPaF',
    headers: {
        'Content-Type': 'application/json',
    },
});


apiEkoran.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

apiGallery.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

apiNews.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);




export {
    apiEkoran,
    apiGallery,
    apiNews,
};