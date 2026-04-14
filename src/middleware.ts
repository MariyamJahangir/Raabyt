import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // www → non-www redirect
  if (hostname.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js routes and static files
    "/((?!_next/static|_next/image|favicon.ico|images|models|.*\\..*$).*)",
  ],
};
