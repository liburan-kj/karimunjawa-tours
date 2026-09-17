import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

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

// Wrap dengan auth() agar req.auth tersedia untuk cek session admin
export const proxy = auth(function proxyHandler(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Admin Route Protection ---
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage) {
    // @ts-expect-error — req.auth ditambahkan oleh NextAuth auth() wrapper
    const session = req.auth;
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // --- Markdown Content Negotiation (existing logic) ---
  const accept = req.headers.get("accept") || "";
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  const wantsMarkdown = accept.includes("text/markdown");
  const targetMdPath = MARKDOWN_MAP[normalizedPath];

  if (wantsMarkdown) {
    if (targetMdPath) {
      const url = req.nextUrl.clone();
      url.pathname = targetMdPath;
      const response = NextResponse.rewrite(url);
      response.headers.set("Vary", "Accept, Accept-Encoding");
      return response;
    }

    if (normalizedPath.startsWith("/md/")) {
      const response = NextResponse.next();
      response.headers.set("Vary", "Accept, Accept-Encoding");
      return response;
    }

    if (
      !normalizedPath.startsWith("/artikel") &&
      !normalizedPath.startsWith("/images") &&
      !normalizedPath.startsWith("/favicon.ico") &&
      !normalizedPath.startsWith("/robots.txt") &&
      !normalizedPath.startsWith("/sitemap.xml") &&
      !normalizedPath.startsWith("/llms.txt") &&
      !normalizedPath.startsWith("/llms-full.txt")
    ) {
      const notFoundMarkdown = `# 404 - Not Found\n\nHalaman yang Anda cari tidak ditemukan.\n\nDokumentasi dan indeks resmi yang tersedia:\n- Full Documentation: https://karimunjawa.tours/llms-full.txt\n- Quick Index (llms.txt): https://karimunjawa.tours/llms.txt\n- Sitemap: https://karimunjawa.tours/sitemap.xml\n- Paket Wisata: https://karimunjawa.tours/#paket-wisata\n- Beranda: https://karimunjawa.tours/\n`;
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
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};