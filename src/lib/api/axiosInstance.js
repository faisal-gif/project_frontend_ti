import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://timesindonesia.co.id/';

export const clientAxios = axios.create({
  baseURL: `${baseUrl}/api`,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});


// 🔹 untuk server (Next.js API Routes), bisa langsung ke API eksternal
export const serverAxios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'x-api-key': process.env.SECRET_KEY,
    'Content-Type': 'application/json',
  },
});
