import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# One Day Trip Karimunjawa (Tour Laut 1 Hari)

Tour laut sehari penuh di Kepulauan Karimunjawa bagi Anda yang sudah memiliki tiket kapal dan akomodasi penginapan sendiri di Karimunjawa.

- **Harga**: Rp200.000 / orang
- **Durasi**: 1 Hari (08:30 – 17:30 WIB)
- **Titik Kumpul**: Dermaga Wisata Karimunjawa

## Fasilitas Termasuk
- Sewa kapal tour laut (sharing dengan peserta lain)
- Sewa alat snorkeling lengkap (masker, snorkel, pelampung / life jacket)
- Jasa Tour Guide bersertifikat HPI
- Dokumentasi foto selama tour & foto bawah air (underwater)
- Biaya sandar kapal di pulau & spot snorkeling
- Makan siang piknik BBQ ikan bakar di pantai pulau
- Air minum selama tour

## Fasilitas Tidak Termasuk
- Tiket masuk penangkaran hiu (opsional)
- Tiket masuk pulau (bila ada)
- Pengeluaran pribadi & jajan

## Itinerary Tour Laut
- **08:30** — Berkumpul di Dermaga Wisata Karimunjawa
- **09:00** — Briefing keselamatan oleh Guide HPI di kapal wisata
- **09:30** — Perjalanan tour laut menuju spot Maer
- **10:00** — Snorkeling di spot Nemo / ikan hias karang
- **10:30** — Dokumentasi underwater satu per satu
- **11:00** — Menuju Pulau Menjangan Kecil / Pulau Cemara
- **11:30** — Menyiapkan makan siang BBQ ikan bakar di pantai
- **12:00** — Makan siang ikan bakar bersama & istirahat santai
- **13:00** — Main pantai, hunting foto & berenang bersama hiu
- **14:00** — Snorkeling di spot habitat terumbu karang alami
- **15:00** — Dokumentasi underwater bersama biota laut
- **16:00** — Menuju Pantai Ujung Gelam
- **16:30** — Bersantai dan foto di ikon kelapa miring
- **17:00** — Hunting foto dan menikmati pemandangan sunset
- **17:30** — Kembali ke Dermaga Wisata Karimunjawa. Trip selesai

## Pemesanan
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Halaman Resmi**: https://karimunjawa.tours/aktivitas/one-day-trip
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}
