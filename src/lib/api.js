import axios from 'axios';


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



export {
    apiEkoran,
    apiGallery,
};