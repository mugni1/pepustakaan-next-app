import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = request.cookies;

  if (pathname == "/profile" || pathname == "/borrowings") {
    if (!cookieStore.get("auth_token")) {
      return NextResponse.rewrite(new URL("/forbiden", request.nextUrl));
    }
  }

  if (pathname === "/login") {
    const roleName = request.cookies.get("roleName")?.value; // Ambil nilai dari cookie atau string kosong
    if (roleName === "superUser") {
      return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
    }
    if (roleName === "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    const roleName = request.cookies.get("roleName")?.value; // Ambil nilai dari cookie atau string kosong
    const token = request.cookies.get("auth_token")?.value; // Ambil nilai dari cookie atau string kosong
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (roleName === "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }
}
