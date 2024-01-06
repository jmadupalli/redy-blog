import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const roleCookie = request.cookies.get("userRole")?.value;
  if (request.nextUrl.pathname.startsWith("/user/dash")) {
    if (!roleCookie) {
      request.cookies.delete("accessToken");
      request.cookies.delete("userRole");
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/login")) {
    if (roleCookie) {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/admin")) {
    if (!roleCookie) {
      request.cookies.delete("accessToken");
      request.cookies.delete("userRole");
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
    if (roleCookie != "ROLE_ADMIN") {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/logout")) {
    const response = NextResponse.rewrite(new URL("/user/logout", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("userRole");
    return response;
  }
}
