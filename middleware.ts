import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("user_session")?.value;

  const pathname = req.nextUrl.pathname;

const isAuthPage =
  pathname === "/login" ||
  pathname === "/register" ||
  pathname === "/register/survey" ||
  pathname === "/forgot-password";

  //  API routes ko bypass karo
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  //  Not logged in → redirect
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //  Logged in → login pe nahi jana
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\..*).*)",
  ],
};