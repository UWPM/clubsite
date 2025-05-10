import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// * This file redirects the initial page (uwaterloopm.com) to the home page (uwaterloopm.com/home)
// * This makes organization easier and a more consistent folder structure with every page be a directory in the app router

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];
  const pathname = request.nextUrl.pathname;

  // Skip API routes
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Skip /dashboard and /hidden-login
  const isBypassPath = pathname.startsWith("/dashboard") || pathname.startsWith("/hidden-login");
  if (isBypassPath) {
    // Additional dashboard auth logic
    if (pathname.startsWith("/dashboard")) {
      const token = request.cookies.get("auth_token");
      if (!token) {
        return NextResponse.redirect(new URL("/hidden-login", request.url));
      }
    }
    return NextResponse.next();
  }

  // Redirect all other web access to /apply
  if (pathname === "/" || pathname === "/home" || pathname === "/about" || pathname === "/events" || pathname === "/alumni") {
    const url = request.nextUrl.clone();
    url.pathname = "/apply";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: '/:path*', // Apply to all paths
};