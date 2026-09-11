import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin-cookie";

/**
 * Gate the editor at the edge, so an unauthenticated request never reaches a
 * page that renders content or a form that writes it.
 *
 * The signature itself is verified in the page and the server actions, which
 * run in Node and hold the signing key. This checks only for the presence and
 * shape of a session, which is enough to redirect and cheap enough for the
 * edge. Authorisation is never decided here alone.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && token.split(".").length === 3) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
