import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// * This file redirects the initial page (uwaterloopm.com) to the home page (uwaterloopm.com/home)
// * This makes organization easier and a more consistent folder structure with every page be a directory in the app router

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  const pathname = request.nextUrl.pathname;

  // Subdomain routing for applications.domain.com
  if (subdomain === 'applications' && pathname === '/') {
    // Rewrite to /applications but keep the URL as applications.localhost:3000/
    return NextResponse.rewrite(new URL('/applications', request.url));
  }

  // Existing root path redirect to /home for main domain
  if (subdomain !== 'applications' && pathname === '/') {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  // Authentical for /applications
  if (pathname.startsWith("/applications")) {
    const token = request.cookies.get("auth_token")
    if (!token) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  // Continue with default behavior for other requests
  return NextResponse.next();
}

  

export const config = {
  matcher: '/:path*', // Apply to all paths
};