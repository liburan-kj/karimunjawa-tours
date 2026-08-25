import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Diving Trip Karimunjawa (Scuba Diving)

Trip Scuba Diving 2x dive di spot karang eksotis Kepulauan Karimunjawa khusus bagi pemilik lisensi diving bersertifikat.

- **Harga**: Rp1.100.000 / orang
- **Ketentuan Peserta**: Minimal 2 orang peserta
- **Syarat Wajib**: Memiliki sertifikasi selam (Open Water Diver atau setara)
- **Titik Kumpul**: Dermaga Wisata Karimunjawa

## Fasilitas Termasuk
- 2x dive di 2 spot berbeda (Perairan Pulau Menjangan Kecil & Gosong Cemara)
- Sewa perahu diving khusus
- Peralatan scuba dive lengkap (BCD, regulator, wetsuit, masker, fin, weight belt)
- Fee Pemandu Selam bersertifikat (Dive Master)
- Extra tank (tabung selam tambahan) untuk dive kedua
- Dokumentasi underwater

## Fasilitas Tidak Termasuk
- Makan siang
- Biaya sandar jika singgah ke pulau saat istirahat

## Itinerary
- **08:30** — Bertemu di Dermaga Wisata Karimunjawa
- **09:00** — Briefing trip & cek peralatan bersama Dive Master di kapal
- **09:30** — Menuju perairan Pulau Menjangan Kecil
- **10:00** — Dive 1 & dokumentasi underwater di Menjangan Kecil
- **11:00** — Menuju Pulau Cemara & istirahat permukaan (surface interval)
- **12:00** — Makan siang & santai di pantai
- **14:00** — Menuju spot Gosong Cemara
- **14:30** — Dive 2 & dokumentasi underwater di Gosong Cemara
- **16:30** — Kembali ke Dermaga Wisata Karimunjawa. Trip selesai

## Pemesanan
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Halaman Resmi**: https://karimunjawa.tours/aktivitas/diving-trip
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}
