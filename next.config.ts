import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'bp.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '1.bp.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '2.bp.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '3.bp.blogspot.com',
      },
      {
        protocol: 'https',
        hostname: '4.bp.blogspot.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com www.google-analytics.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com;
              img-src 'self' data: images.unsplash.com upload.wikimedia.org api.dicebear.com imgur.com *.blogspot.com;
              connect-src 'self' www.google-analytics.com region1.google-analytics.com featurable.com kjawatours.blogspot.com;
              frame-src 'self' www.google.com;
              font-src 'self' fonts.gstatic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
            `.replace(/\s+/g, ' ').trim(),
          },
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
        ],
      },
    ];
  },
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

      // Semua artikel Blogger (format /YYYY/MM/slug.html) -> /artikel/slug
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:slug.html",
        destination: "/artikel/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;