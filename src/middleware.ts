import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE_NAME, verifySessionTokenEdge } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle /admin routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const session = await verifySessionTokenEdge(sessionToken);

    // If visiting /admin/login while already authenticated, redirect to /admin
    if (isLoginPage) {
      if (session) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // If trying to access any other /admin route without a valid session, redirect to /admin/login
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
