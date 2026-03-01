import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" || 
    path === "/forgot-password";

  const token = request.cookies.get("token")?.value;

  // If user is logged in and tries to access public page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // If user is not logged in and tries to access protected page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/login",
    "/signup",
    "/verifyemail",
    "/forgot-password",
  ],
};