import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Paket Wisata Karimunjawa 2 Hari 1 Malam - Hotel

Paket wisata Karimunjawa 2 Hari 1 Malam dengan akomodasi Hotel / Resort partner pilihan. Cocok bagi Anda yang memiliki waktu liburan terbatas namun menginginkan kenyamanan ekstra dan pengalaman wisata bahari terbaik. Mulai dari Rp1.280.000/orang (KMP Siginjai) atau Rp1.300.000/orang (Express Bahari).

## Pilihan Hotel Partner
- **Java Paradise Resort**
- **HALO Resort**
- **Happinezz Hills**
- **Omah Alchy**

## Pilihan Kapal Penyeberangan
- **Express Bahari (Kapal Cepat)**: Waktu tempuh ±2–3 jam dari Pelabuhan Kartini Jepara
- **KMP Siginjai (Kapal Feri)**: Waktu tempuh ±5.5 jam dari Pelabuhan Kartini Jepara

## Fasilitas Termasuk
- Retribusi Penumpang Pelabuhan Jepara
- Tiket kapal Jepara–Karimunjawa PP (Express Bahari / KMP Siginjai)
- Asuransi perjalanan kapal
- Transportasi lokal check in & check out di Karimunjawa
- Penginapan hotel / resort 1 malam di Karimunjawa
- Makan 3x
- Tour laut half day 1x (spot ikan hias/nemo & Pantai Ujung Gelam)
- Retribusi Pelabuhan Wisata Karimunjawa
- Sewa kapal tour laut & crew kapal
- Jasa pemandu wisata lokal berlisensi HPI
- Sewa alat snorkeling lengkap (masker, snorkel, pelampung / life jacket, fin / kaki katak)
- Biaya sandar kapal wisata di spot snorkeling & pantai
- Air mineral selama tour laut
- Dokumentasi foto & video (termasuk foto bawah air / underwater)

## Fasilitas Tidak Termasuk
- Transportasi dari kota asal menuju Pelabuhan Kartini Jepara
- Pengeluaran pribadi & oleh-oleh
- Tiket masuk wahana opsional / spot di luar paket

## Itinerary Perjalanan

### Opsi Kapal Cepat (Express Bahari)

#### Hari 1
- **07:30** — Bertemu di Pelabuhan Kartini Jepara
- **08:00** — Pembagian tiket kapal
- **09:00** — Kapal Express Bahari berangkat menuju Karimunjawa
- **12:00** — Kapal tiba di Pelabuhan Karimunjawa
- **12:30** — Penghantaran dan check in ke hotel pilihan
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour laut
- **14:30** — Perjalanan tour laut menuju spot snorkeling
- **15:00** — Snorkeling di spot Nemo / ikan hias
- **15:30** — Dokumentasi underwater satu per satu
- **16:00** — Menuju Pantai Ujung Gelam
- **16:30** — Istirahat dan santai di pantai pasir putih
- **17:00** — Dokumentasi foto dan menikmati sunset
- **17:30** — Perjalanan kembali ke hotel
- **18:00** — Tiba di hotel dan bersih-bersih diri
- **18:30** — Makan malam di hotel
- **19:30** — Jalan-jalan malam ke Alun-alun Karimunjawa (wisata kuliner & belanja oleh-oleh)
- **21:00** — Kembali ke hotel dan istirahat

#### Hari 2
- **08:30** — Sarapan pagi di hotel dan persiapan check out
- **10:30** — Pembagian tiket dan proses boarding kapal
- **10:45** — Check out menuju Pelabuhan Karimunjawa
- **11:00** — Kapal Express Bahari berangkat kembali menuju Jepara
- **13:30** — Kapal tiba di Pelabuhan Kartini Jepara. Trip selesai

---

### Opsi Kapal Feri (KMP Siginjai)

#### Hari 1
- **05:30** — Bertemu di Pelabuhan Kartini Jepara
- **06:00** — Pembagian tiket kapal
- **07:00** — Kapal feri KMP Siginjai berangkat menuju Karimunjawa
- **12:00** — Kapal tiba di Pelabuhan Karimunjawa
- **12:30** — Penghantaran dan check in ke hotel pilihan
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour laut
- **14:30** — Perjalanan tour laut menuju spot snorkeling
- **15:00** — Snorkeling di spot Nemo / ikan hias
- **15:30** — Dokumentasi underwater satu per satu
- **16:00** — Menuju Pantai Ujung Gelam
- **16:30** — Istirahat dan santai di pantai pasir putih
- **17:00** — Dokumentasi foto dan menikmati sunset
- **17:30** — Perjalanan kembali menuju Dermaga Wisata
- **17:45** — Dari dermaga wisata kembali ke hotel
- **18:00** — Tiba di hotel dan bersih-bersih diri
- **18:30** — Makan malam di hotel
- **19:30** — Jalan-jalan malam ke Alun-alun Karimunjawa
- **21:00** — Kembali ke hotel dan istirahat

#### Hari 2
- **05:30** — Sarapan pagi di hotel dan persiapan check out
- **06:15** — Check out menuju Pelabuhan Karimunjawa
- **06:30** — Pembagian tiket dan boarding kapal
- **07:00** — Kapal feri KMP Siginjai berangkat kembali menuju Jepara
- **11:30** — Kapal tiba di Pelabuhan Kartini Jepara. Trip selesai

## Pemesanan & Syarat Ketentuan
- **Deposit / DP**: 50% dari total harga paket
- **Pelunasan**: Dibayar pada hari keberangkatan
- **Kebijakan Pembatalan**: Biaya administrasi Rp50.000 / orang
- **Pemesanan via WhatsApp**: +62 822-2533-6306

*Catatan: Harga dan jadwal kapal dapat berubah sewaktu-waktu. Cek ketersediaan dan harga terbaru di https://karimunjawa.tours/paket/2h1m-hotel*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}