// middleware.js — Next.js route protection
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookie (set by Supabase after OTP login)
  const token = request.cookies.get("sb-access-token")?.value ||
                request.cookies.get("supabase-auth-token")?.value;

  // Protected dashboard routes — redirect to login if no token
  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protected superadmin routes — extra check
  if (pathname.startsWith("/superadmin")) {
    const adminToken = request.cookies.get("admin-token")?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Onboarding redirect — if seller already has store, go to dashboard
  if (pathname === "/onboarding") {
    const onboarded = request.cookies.get("onboarded")?.value;
    if (onboarded === "true") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If logged in user tries to access auth pages, redirect to dashboard
  if ((pathname === "/auth/login" || pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/superadmin/:path*",
    "/onboarding",
    "/auth/:path*",
  ],
};