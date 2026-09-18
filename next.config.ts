import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 0. Fix untuk jsdom ESM/CJS conflict (html-encoding-sniffer -> @exodus/bytes)
  serverExternalPackages: ['jsdom'],

  // 1. Optimasi Gambar
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'api.dicebear.com' },
      { protocol: 'https', hostname: 'imgur.com' },
      { protocol: 'https', hostname: 'blogger.googleusercontent.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' }, // Menggunakan wildcard ganda **
      { protocol: 'https', hostname: '**.bp.blogspot.com' },       // Menggunakan wildcard ganda **
      { protocol: 'https', hostname: 'bp.blogspot.com' },
      { protocol: 'https', hostname: 'cdn2.behold.pictures' },
      { protocol: 'https', hostname: 'behold.pictures' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
    ],
  },

  // 2. Custom Headers Security & Cache Control
  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // MEMUDAHKAN REVALIDATE: Melarang browser menyimpan permanent-cache di lokal PC
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },

  // 3. Redirects
  async redirects() {
    return [
      // Halaman paket wisata
      { source: "/p/2-hari-1-malam-hotel.html", destination: "/paket/2h1m-hotel", permanent: true },
      { source: "/p/3-hari-2-malam-hotel.html", destination: "/paket/3h2m-hotel", permanent: true },
      { source: "/p/4-hari-3-malam-hotel.html", destination: "/paket/4h3m-hotel", permanent: true },
      { source: "/p/2-hari-1-malam-homestay.html", destination: "/paket/2h1m-homestay", permanent: true },
      { source: "/p/3-hari-2-malam-homestay.html", destination: "/paket/3h2m-homestay", permanent: true },
      { source: "/p/4-hari-3-malam-homestay.html", destination: "/paket/4h3m-homestay", permanent: true },

      // Halaman statis
      { source: "/p/faq.html", destination: "/faq", permanent: true },
      { source: "/p/tentang-kami.html", destination: "/tentang-kami", permanent: true },
      { source: "/p/instagram.html", destination: "/galeri", permanent: true },

      // Redirect artikel Blogger (/YYYY/MM/slug.html -> /artikel/slug)
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug.html",
        destination: "/artikel/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;