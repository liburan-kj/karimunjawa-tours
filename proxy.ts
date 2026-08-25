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
  "/aktivitas/one-day-trip": "/md/aktivitas/one-day-trip",
  "/aktivitas/diving-trip": "/md/aktivitas/diving-trip",
  "/aktivitas/sewa-motor": "/md/aktivitas/sewa-motor",
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

  if (wantsMarkdown) {
    if (targetMdPath) {
      const url = request.nextUrl.clone();
      url.pathname = targetMdPath;
      const response = NextResponse.rewrite(url);
      response.headers.set("Vary", "Accept, Accept-Encoding");
      return response;
    }

    // If client requested markdown on a path that starts with /md/, let Next.js route handler handle it
    if (normalizedPath.startsWith("/md/")) {
      const response = NextResponse.next();
      response.headers.set("Vary", "Accept, Accept-Encoding");
      return response;
    }

    // If an AI agent specifically asked for markdown on an unknown / unmapped path, return 404 markdown
    if (
      !normalizedPath.startsWith("/artikel") &&
      !normalizedPath.startsWith("/images") &&
      !normalizedPath.startsWith("/favicon.ico") &&
      !normalizedPath.startsWith("/robots.txt") &&
      !normalizedPath.startsWith("/sitemap.xml") &&
      !normalizedPath.startsWith("/llms.txt") &&
      !normalizedPath.startsWith("/llms-full.txt")
    ) {
      const notFoundMarkdown = `# 404 - Not Found

Halaman yang Anda cari tidak ditemukan.

Dokumentasi dan indeks resmi yang tersedia:
- Full Documentation: https://karimunjawa.tours/llms-full.txt
- Quick Index (llms.txt): https://karimunjawa.tours/llms.txt
- Sitemap: https://karimunjawa.tours/sitemap.xml
- Paket Wisata: https://karimunjawa.tours/#paket-wisata
- Beranda: https://karimunjawa.tours/
`;
      return new NextResponse(notFoundMarkdown, {
        status: 404,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept, Accept-Encoding",
        },
      });
    }
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