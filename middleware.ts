// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nhost } from '@/lib/nhost';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const refreshToken = request.cookies.get('nhostRefreshToken')?.value;

  if (!refreshToken) {
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Get user role from JWT or Hasura
  const user = nhost.auth.getUser();
  const role = user?.metadata?.role || 'user';  // Nhost mein custom claim add karo role ka

  // Admin routes protect
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // User routes
  if (pathname.startsWith('/dashboard') && role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
};