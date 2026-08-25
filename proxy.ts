import { NextRequest, NextResponse } from "next/server";

const MARKDOWN_MAP: Record<string, string> = {
  "/": "/md/home",
  "/paket/2h1m-homestay": "/md/paket/2h1m-homestay",
  "/paket/2h1m-hotel": "/md/paket/2h1m-hotel",
  "/paket/3h2m-homestay": "/md/paket/3h2m-homestay",
  "/paket/3h2m-hotel": "/md/paket/3h2m-hotel",
  "/paket/4h3m-homestay": "/md/paket/4h3m-homestay",
  "/paket/4h3m-hotel": "/md/paket/4h3m-hotel",
  "/aktivitas": "/md/aktivitas",
  "/faq": "/md/faq",
  "/kontak": "/md/kontak",
  "/contact": "/md/kontak",
  "/tentang-kami": "/md/tentang-kami",
  "/about": "/md/tentang-kami",
};

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const { pathname } = request.nextUrl;
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const wantsMarkdown = accept.includes("text/markdown");
  const targetMdPath = MARKDOWN_MAP[normalizedPath];

  if (wantsMarkdown && targetMdPath) {
    const url = request.nextUrl.clone();
    url.pathname = targetMdPath;
    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept, Accept-Encoding");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};