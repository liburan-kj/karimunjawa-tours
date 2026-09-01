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