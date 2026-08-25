import { NextResponse } from "next/server";

export async function GET() {
  const notFoundMarkdown = `# 404 - Not Found

Halaman markdown yang Anda cari tidak ditemukan.

Silakan merujuk ke dokumentasi dan indeks yang tersedia:
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
