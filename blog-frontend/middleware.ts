import { NextRequest, NextResponse } from "next/server";
import { fetchSettings } from "./app/_providers/api/apiUtil";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == "/onboarding") {
    const settings = await fetchSettings();
    if (settings && !settings.toOnBoard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  const roleCookie = request.cookies.get("userRole");

  const redirectToLogin = () => {
    if (!roleCookie) {
      return NextResponse.redirect(new URL("/user/logout", request.url));
    }
    return null;
  };

  if (request.nextUrl.pathname.startsWith("/user/dash")) {
    const resp = redirectToLogin();
    if (resp != null) return resp;
  }
  if (request.nextUrl.pathname.startsWith("/user/login")) {
    if (roleCookie) {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/admin")) {
    const resp = redirectToLogin();
    if (resp != null) return resp;
    if (roleCookie?.value != "ROLE_ADMIN") {
      return NextResponse.redirect(new URL("/user/dash", request.url));
    }
  }
  if (request.nextUrl.pathname.startsWith("/user/logout")) {
    const response = NextResponse.next();
    response.cookies.delete("userRole");
    response.cookies.delete("accessToken");
    return response;
  }
}
