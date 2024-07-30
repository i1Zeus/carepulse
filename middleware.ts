import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const path = request.nextUrl.pathname;
  // const isAdmin = request.cookies.get("isAdmin");

  // console.log("isAdmin:", isAdmin?.name, isAdmin?.value);

  // if (!isAdmin || isAdmin?.value !== "true") {
  //   return NextResponse.redirect(new URL("/403", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
