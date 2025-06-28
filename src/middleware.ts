
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const {pathname} = request.nextUrl;

  // If trying to access admin routes without a session, redirect to login
  if (!session && pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If logged in and trying to access login page, redirect to admin dashboard
  if (session && pathname === '/admin/login') {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
