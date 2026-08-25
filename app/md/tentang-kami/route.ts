import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Tentang Kami — Karimunjawa Tours

**Karimunjawa Tours** adalah penyedia layanan paket wisata dan biro perjalanan wisata lokal resmi yang berbasis langsung di Kepulauan Karimunjawa, Jepara, Jawa Tengah.

---

## Perjalanan & Pengalaman Kami Sejak 2015
Sejak tahun 2015, kami telah melayani ribuan wisatawan domestik maupun mancanegara — mulai dari solo traveler, pasangan honeymoon, keluarga, hingga rombongan gathering perusahaan.

Kami mengutamakan:
1. **Transparansi Harga**: Seluruh fasilitas tertera jelas tanpa biaya tersembunyi.
2. **Pemandu Bersertifikat**: Seluruh tur laut dipandu oleh Tour Guide lokal berlisensi resmi Himpunan Pramuwisata Indonesia (HPI).
3. **Peralatan Standar & Aman**: Seluruh alat snorkeling, pelampung/life jacket, dan kapal wisata rutin dirawat dan memenuhi standar keselamatan laut.
4. **Dokumentasi Bawah Air Berkualitas**: Kami menyediakan dokumentasi foto & video underwater untuk mengabadikan momen berenang bersama biota laut dan terumbu karang.

---

## Layanan yang Disediakan
- Paket Wisata Karimunjawa 2H1M, 3H2M, dan 4H3M (Hotel & Homestay)
- One Day Trip Tour Laut
- Scuba Diving Trip
- Sewa Motor Harian & Transportasi Lokal

---

## Kontak
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Email**: liburan@karimunjawa.tours
- **Website**: https://karimunjawa.tours/tentang-kami
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}