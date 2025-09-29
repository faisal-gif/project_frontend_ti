import axios from 'axios';


export const clientAxios = axios.create({
  baseURL: process.env.PUBLIC_API + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


// 🔹 untuk server (Next.js API Routes), bisa langsung ke API eksternal
export const serverAxios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.SECRET_KEY, // hanya server yang boleh tahu ini
  },
});
