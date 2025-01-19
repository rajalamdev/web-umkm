import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Daftar path yang tidak menggunakan layout
  const excludedPaths = ['/register', '/login'];

  // Jika path cocok, tambahkan header khusus
  if (excludedPaths.includes(pathname)) {
    const response = NextResponse.next();
    response.headers.set('x-no-layout', 'true');
    return response;
  }

  return NextResponse.next();
}
