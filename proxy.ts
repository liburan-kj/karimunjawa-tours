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
  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // --- Admin Route Protection ---
  const isAdminRoute = normalizedPath.startsWith("/admin");
  const isLoginPage = normalizedPath === "/admin/login";

  if (isAdminRoute && !isLoginPage) {
    // @ts-expect-error — req.auth ditambahkan oleh NextAuth auth() wrapper
    const session = req.auth;
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // --- Nonce & Content Security Policy ---
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    img-src 'self' data: blob: https: images.unsplash.com upload.wikimedia.org api.dicebear.com imgur.com *.blogspot.com *.bp.blogspot.com bp.blogspot.com *.googleusercontent.com blogger.googleusercontent.com cdn2.behold.pictures behold.pictures *.cdninstagram.com lh3.googleusercontent.com lh4.googleusercontent.com lh5.googleusercontent.com lh6.googleusercontent.com;
    connect-src 'self' www.google-analytics.com region1.google-analytics.com featurable.com kjawatours.blogspot.com firestore.googleapis.com *.firebaseio.com identitytoolkit.googleapis.com securetoken.googleapis.com firebasestorage.googleapis.com firebaseinstallations.googleapis.com;
    frame-src 'self' www.google.com https://www.youtube.com https://www.youtube-nocookie.com;
    font-src 'self' fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, " ").trim();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", cspHeader);

  // --- Markdown Content Negotiation (existing logic) ---
  const accept = req.headers.get("accept") || "";

  const wantsMarkdown = accept.includes("text/markdown");
  const targetMdPath = MARKDOWN_MAP[normalizedPath];

  if (wantsMarkdown) {
    if (targetMdPath) {
      const url = req.nextUrl.clone();
      url.pathname = targetMdPath;
      const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
      response.headers.set("Vary", "Accept, Accept-Encoding");
      response.headers.set("Content-Security-Policy", cspHeader);
      return response;
    }

    if (normalizedPath.startsWith("/md/")) {
      const response = NextResponse.next({
        request: { headers: requestHeaders },
      });
      response.headers.set("Vary", "Accept, Accept-Encoding");
      response.headers.set("Content-Security-Policy", cspHeader);
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
          "Content-Security-Policy": cspHeader,
        },
      });
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set("Vary", "Accept, Accept-Encoding");
  response.headers.set("Content-Security-Policy", cspHeader);
  return response;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};