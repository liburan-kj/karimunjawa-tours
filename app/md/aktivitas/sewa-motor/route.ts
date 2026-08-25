import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Sewa Motor Karimunjawa (Rental Motor Harian)

Layanan rental sepeda motor matic harian untuk kemudahan mobilitas dan eksplorasi bebas di Kepulauan Karimunjawa.

- **Harga**: Rp75.000 / hari
- **Jenis Kendaraan**: Sepeda motor matic terawat (Honda Beat / Vario / sekelasnya)
- **Kelengkapan**: 2 Helm standar SNI

## Pilihan Pengambilan & Pengantaran Unit
- **Pelabuhan Karimunjawa**: Serah terima unit langsung begitu Anda tiba dari kapal penyeberangan.
- **Penginapan**: Unit motor diantar langsung ke lobi homestay atau hotel tempat Anda menginap.

## Cara Pemesanan
- Hubungi WhatsApp kami dengan mencantumkan nama, tanggal sewa, jumlah unit, dan lokasi penyerahan (pelabuhan / penginapan).
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Halaman Resmi**: https://karimunjawa.tours/aktivitas/sewa-motor
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}
