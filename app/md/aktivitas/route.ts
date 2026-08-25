import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Aktivitas Wisata & Rental Karimunjawa

Selain paket liburan lengkap menginap, Karimunjawa Tours menyediakan aktivitas harian dan rental kendaraan bagi wisatawan yang sudah mengatur perjalanan atau penginapan secara mandiri:

---

## 1. One Day Trip Karimunjawa (Tour Laut 1 Hari)
- **Harga**: Rp200.000 / orang
- **Waktu**: 08:30 – 17:30 WIB
- **Fasilitas Termasuk**: Sewa kapal tour (sharing), alat snorkeling lengkap & life jacket, pemandu HPI, makan siang BBQ ikan bakar di pantai, air minum, tiket sandar kapal, dokumentasi underwater.
- **Spot**: Spot Nemo Maer, Pulau Cemara / Menjangan Kecil (BBQ), habitat terumbu karang, renang bersama hiu, sunset Pantai Ujung Gelam.
- Detail: https://karimunjawa.tours/md/aktivitas/one-day-trip

---

## 2. Diving Trip Karimunjawa (Scuba Diving)
- **Harga**: Rp1.100.000 / orang (Minimal 2 orang)
- **Syarat**: Wajib memiliki lisensi scuba diving (Open Water Diver atau setara).
- **Fasilitas Termasuk**: 2x dive di spot berbeda (Perairan Pulau Menjangan Kecil & Gosong Cemara), kapal dive, alat scuba lengkap (BCD, regulator, wetsuit, masker, fin, weight), dive master berpengalaman, extra tank untuk dive ke-2, dokumentasi underwater.
- Detail: https://karimunjawa.tours/md/aktivitas/diving-trip

---

## 3. Sewa Motor Karimunjawa (Rental Motor Harian)
- **Harga**: Rp75.000 / hari
- **Fasilitas**: Unit sepeda motor matic terawat, helm, serah terima unit di Pelabuhan Karimunjawa saat tiba atau diantar langsung ke lobi penginapan.
- Detail: https://karimunjawa.tours/md/aktivitas/sewa-motor

---

## Kontak Reservasi
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Website**: https://karimunjawa.tours/aktivitas
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}