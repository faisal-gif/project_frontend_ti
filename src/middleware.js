// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {

  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const apiKey = request.headers.get('x-api-key');


  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
