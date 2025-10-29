// /middleware.js
import { NextResponse } from 'next/server';

// === CONFIG ===
const RATE_LIMIT = 20; // 20 req per menit
const INTERVAL = 60 * 1000; // 1 menit
const MIN_REQUEST_INTERVAL = 1000; // 1 detik
const ipStore = new Map();

// --- IP & User Agent Blokir ---
const BLOCKED_IPS = ['146.247.137.101', '104.250.56.153', '114.4.82.118', '94.100.26.170'];
const BLOCKED_USER_AGENTS = [
  'BadBot/1.0',
  'python-requests',
  'curl',
  'Chrome/1.0.154.36',
  'Chrome/4.0.223.3',
  'Firefox/3.1b2'
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  console.log(`[REQ] ${pathname} | ${ip} | ${userAgent}`);

  // --- 1️⃣ Blokir IP ---
  if (BLOCKED_IPS.includes(ip)) {
    return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
  }

  // --- 2️⃣ Blokir Bot Berdasarkan User-Agent ---
  for (const agent of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(agent)) {
      return new NextResponse(null, { status: 403, statusText: 'Forbidden' });
    }
  }

  // --- 3️⃣ Proteksi API Key untuk /api/* ---
  if (pathname.startsWith('/api/')) {
    const apiKey = request.headers.get('x-api-key');
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // --- 4️⃣ Smart Rate Limiter ---
  // Aktif hanya untuk API & halaman 3 segmen (misal /tekno/123/judul-berita)
  const threeSegmentPattern = /^\/[^/]+\/[^/]+\/[^/]+$/; // cocokkan /kanal/id/slug
  if (threeSegmentPattern.test(pathname)) {
    if (!ipStore.has(ip)) ipStore.set(ip, []);

    const timestamps = ipStore.get(ip).filter(ts => now - ts < INTERVAL);

    // Hanya tambahkan kalau jarak antar request > 1 detik
    if (timestamps.length === 0 || now - timestamps[timestamps.length - 1] > MIN_REQUEST_INTERVAL) {
      timestamps.push(now);
      ipStore.set(ip, timestamps);
    }

    const remaining = Math.max(0, RATE_LIMIT - timestamps.length);

    if (timestamps.length > RATE_LIMIT) {
      const retryAfter = Math.ceil((INTERVAL - (now - timestamps[0])) / 1000);
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': RATE_LIMIT.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    return response;
  }

  // --- 5️⃣ Lanjutkan request normal ---
  return NextResponse.next();
}

// --- CONFIG ---
// Middleware aktif untuk API + semua halaman dengan struktur /kanal/id/slug
export const config = {
  matcher: [
    '/:kanal/:id/:slug*',
  ],
};
