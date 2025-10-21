// /middleware.js
import { NextResponse } from 'next/server';

// Daftar User-Agent bot yang ingin Anda blokir
const BLOCKED_USER_AGENTS = ['BadBot/1.0', 'python-requests', 'curl'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get('user-agent') || '';

  // --- LOGIKA 1: Melindungi API Routes ---
  if (pathname.startsWith('/api/')) {
    const apiKey = request.headers.get('x-api-key');
    
    // Gunakan process.env.API_KEY (BUKAN NEXT_PUBLIC_)
    if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // Jika API key valid, lanjutkan ke API route
    return NextResponse.next();
  }

  // --- LOGIKA 2: Memblokir Bot Scraper di Halaman Berita ---
  // (Ini hanya contoh, Anda bisa kembangkan dengan IP, dll)
  for (const agent of BLOCKED_USER_AGENTS) {
    if (userAgent.includes(agent)) {
      // Kirim 403 Forbidden (Dilarang)
      return new NextResponse(null, { status: 403, statusText: "Forbidden" });
    }
  }

  // Jika bukan bot dan bukan API, biarkan permintaan ke halaman berlanjut
  return NextResponse.next();
}

// --- CONFIG BARU ---
// Jalankan middleware di SEMUA rute, KECUALI file statis dan gambar
export const config = {
  matcher: [
   
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp)$).*)',
  ],
};