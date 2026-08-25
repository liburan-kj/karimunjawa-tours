import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Kontak & Layanan Pelanggan — Karimunjawa Tours

Tim layanan pelanggan dan reservasi kami siap membantu perencanaan liburan Anda ke Kepulauan Karimunjawa setiap hari.

---

## Kontak Resmi
- **WhatsApp Reservasi & Konsultasi**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Email Resmi**: liburan@karimunjawa.tours
- **Website**: https://karimunjawa.tours
- **Instagram**: [@karimunjawa.tours](https://www.instagram.com/karimunjawa.tours)
- **Google Maps**: [Karimunjawa Tours](https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5)

---

## Alamat Operasional
- **Lokasi**: Karimunjawa, Kabupaten Jepara, Jawa Tengah 59455, Indonesia
- **Pelabuhan Keberangkatan**: Pelabuhan Kartini, Jepara, Jawa Tengah

---

## Informasi Pembayaran Resmi
- **Bank**: BCA (Bank Central Asia)
- **Nomor Rekening**: 0095341611
- **Atas Nama**: Fransisca Frisca Yuwanita

*Catatan Keamanan: Pastikan pembayaran DP hanya ditransfer ke rekening resmi BCA di atas. Kami tidak bertanggung jawab atas pembayaran ke rekening selain atas nama tersebut.*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}