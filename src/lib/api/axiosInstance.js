import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://timesindonesia.co.id/';

// timeout: gagal cepat (15s) jika upstream menggantung, agar request tidak numpuk
// sampai Cloudflare 524 (~100s) dan membebani server saat trafik/bot tinggi.
export const clientAxios = axios.create({
  baseURL: `${baseUrl}/api`,
  timeout: 15000,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});


// 🔹 untuk server (Next.js API Routes), bisa langsung ke API eksternal
export const serverAxios = axios.create({
  baseURL: process.env.API_URL,
  timeout: 15000,
  headers: {
    'x-api-key': process.env.SECRET_KEY,
    'Content-Type': 'application/json',
  },
});
