import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Karimunjawa Tours

Agen wisata lokal di Karimunjawa, Jepara, sejak 2015. Menyediakan paket tour pulau lengkap: transportasi, akomodasi, dan aktivitas snorkeling.

## Paket Wisata
- 2H1M (2 Hari 1 Malam) — Hotel & Homestay
- 3H2M (3 Hari 2 Malam) — Hotel & Homestay
- 4H3M (4 Hari 3 Malam) — Hotel & Homestay

## Keberangkatan
Seluruh paket berangkat dari Pelabuhan Kartini, Jepara, via KMP Siginjai (±5.5 jam) atau Express Bahari (±2–3 jam).

## Kontak
- WhatsApp: +62 822-2533-6306
- Email: liburan@karimunjawa.tours

Lihat detail lengkap di https://karimunjawa.tours
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}