import { NextRequest, NextResponse } from "next/server";
import { fetchSettings } from "./app/_providers/api/apiUtil";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == "/") {
    const settings = await fetchSettings();
    if (settings && settings.toOnBoard) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  if (request.nextUrl.pathname == "/onboarding") {
    const settings = await fetchSettings();
    if (settings && !settings.toOnBoard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const roleCookie = request.cookies.get("userRole")?.value;

  const redirectToLogin = () => {
    if (!roleCookie) {
      request.cookies.delete("accessToken");
      request.cookies.delete("userRole");
      return NextResponse.redirect(new URL("/user/login", request.url));
    }
  };

  if (request.nextUrl.pathname.startsWith("/user/dash")) {
    redirectToLogin();
  }
  if (request.nextUrl.pathname.startsWith("/user/login")) {
    if (roleCookie) {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/admin")) {
    redirectToLogin();
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
