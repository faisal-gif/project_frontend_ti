import axios from 'axios';
import https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: false,
});


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
    'Content-Type': 'application/json',
  },
  params: {
    key: process.env.SECRET_KEY, // hanya server yang boleh tahu ini
  },
});
