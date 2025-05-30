import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleName = request.cookies.get("roleName")?.value; // Ambil nilai dari cookie atau string kosong
  const token = request.cookies.get("auth_token")?.value; // Ambil nilai dari cookie atau string kosong

  // Middleware login
  if (pathname === "/login") {
    if (roleName === "superUser") {
      return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
    }
    if (roleName === "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  // cek apakah user role nya superUser
  if (
    pathname == "/" ||
    pathname === "/profile" ||
    pathname === "/borrowings" ||
    pathname === "/returns"
  ) {
    if (roleName == "superUser") {
      return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
    }
  }

  // middleware for check user login
  if (
    pathname === "/profile" ||
    pathname === "/borrowings" ||
    pathname === "/returns"
  ) {
    if (!token) {
      return NextResponse.rewrite(new URL("/forbiden", request.nextUrl));
    }
    if (roleName == "superUser") {
      return NextResponse.redirect(new URL("/dashboard/home", request.nextUrl));
    }
  }

  // Middleware for superUser
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (roleName === "user") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next(); // Pastikan untuk melanjutkan proses lainnya
}
