import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const expiresAt = request.cookies.get("accessTokenExpiresAt")?.value;
  if (request.nextUrl.pathname.startsWith("/user/dash")) {
    if (!expiresAt || Date.now() > JSON.parse(expiresAt)) {
      request.cookies.delete("accessToken");
      request.cookies.delete("accessTokenExpiresAt");
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/login")) {
    if (expiresAt && Date.now() < JSON.parse(expiresAt)) {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/logout")) {
    const response = NextResponse.rewrite(new URL("/user/logout", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("accessTokenExpiresAt");
    return response;
  }
}
