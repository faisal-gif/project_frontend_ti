import axios from 'axios';


const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://timesindonesia.co.id';

const TIMEOUT_MS = 5000;

export const clientAxios = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: TIMEOUT_MS,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});


// 🔹 untuk server (Next.js API Routes), bisa langsung ke API eksternal
export const serverAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: TIMEOUT_MS * 2,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.SECRET_KEY, // hanya server yang boleh tahu ini
  },
});
