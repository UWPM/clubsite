import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// * This file redirects the initial page (uwaterloopm.com) to the home page (uwaterloopm.com/home)
// * This makes organization easier and a more consistent folder structure with every page be a directory in the app router

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  const pathname = request.nextUrl.pathname;

  // Existing root path redirect to /home for main domain
  // if (pathname === '/') {
  //   return NextResponse.redirect(new URL('/home', request.url));
  // }
  // Authentication for /applications
  if (pathname.startsWith("/applications")) {
    const token = request.cookies.get("auth_token")
    if (!token) {
      return NextResponse.redirect(new URL('/hidden-login', request.url));
    }
  }

  // Continue with default behavior for other requests
  return NextResponse.next();
}

  

export const config = {
  matcher: '/:path*', // Apply to all paths
};