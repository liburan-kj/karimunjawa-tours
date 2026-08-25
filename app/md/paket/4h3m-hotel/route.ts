import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Paket Wisata Karimunjawa 4 Hari 3 Malam - Hotel

Paket wisata Karimunjawa 4 Hari 3 Malam dengan akomodasi Hotel / Resort partner pilihan. Pengalaman liburan terlengkap dan paling berkesan di Karimunjawa — menikmati kenyamanan resort bintang dengan itinerary lega mencakup tour darat ke Bukit Love serta 2x tour laut seharian (Trip Barat & Trip Timur) ke spot snorkeling favorit, BBQ ikan di pulau, pulau pasir Gosong Putih, dan berenang bersama hiu. Mulai dari Rp2.270.000/orang (KMP Siginjai) atau Rp2.300.000/orang (Express Bahari).

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
- Penginapan hotel / resort 3 malam di Karimunjawa
- Makan 8x (termasuk 2x piknik makan siang BBQ ikan bakar di pulau)
- Tour darat 1x (Pantai Boby & Bukit Love)
- Tour laut full day 2x (Trip Barat & Trip Timur)
- Retribusi Pelabuhan Wisata Karimunjawa
- Sewa kapal tour laut & crew kapal
- Jasa pemandu wisata lokal berlisensi HPI
- Sewa alat snorkeling lengkap (masker, snorkel, pelampung / life jacket, fin / kaki katak)
- Biaya sandar kapal wisata di pulau & spot snorkeling
- Air mineral selama tour laut
- Dokumentasi foto & video (termasuk foto bawah air / underwater)

## Fasilitas Tidak Termasuk
- Transportasi dari kota asal menuju Pelabuhan Kartini Jepara
- Tiket masuk penangkaran hiu / wahana opsional
- Pengeluaran pribadi & oleh-oleh

## Itinerary Perjalanan

### Opsi Kapal Cepat (Express Bahari)

#### Hari 1 — Tour Darat
- **07:30** — Bertemu di Pelabuhan Kartini Jepara
- **08:00** — Pembagian tiket kapal
- **09:00** — Kapal Express Bahari berangkat menuju Karimunjawa
- **12:00** — Kapal tiba di Pelabuhan Karimunjawa
- **12:30** — Penghantaran dan check in ke hotel pilihan
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour darat
- **14:00** — Perjalanan tour darat ke Pantai Boby
- **14:30** — Main pantai di hamparan pasir putih Pantai Boby
- **15:30** — Foto-foto di ayunan pohon kelapa miring
- **16:00** — Perjalanan menuju Bukit Love Karimunjawa
- **16:30** — Hunting foto di ikon Monumen Karimunjawa
- **17:00** — Dokumentasi foto dan menikmati panorama sunset
- **17:30** — Perjalanan kembali ke hotel
- **18:00** — Tiba di hotel dan bersih-bersih diri
- **18:30** — Makan malam di hotel
- **19:30** — Jalan-jalan malam ke Alun-alun Karimunjawa
- **21:00** — Kembali ke hotel dan istirahat

#### Hari 2 — Tour Laut Barat (Full Day)
- **07:00** — Sarapan pagi di hotel
- **07:30** — Persiapan keberangkatan tour laut
- **08:00** — Penghantaran menuju Dermaga Wisata
- **09:00** — Briefing trip oleh guide HPI di kapal wisata
- **09:30** — Perjalanan tour laut menuju area Gosong Cemara
- **10:00** — Snorkeling di spot Nemo / ikan hias karang
- **10:30** — Sesi dokumentasi underwater satu per satu
- **11:00** — Menuju Pulau Cemara
- **11:30** — Menyiapkan piknik makan siang BBQ ikan bakar
- **12:00** — Makan siang ikan bakar & santai di tepi pantai
- **13:30** — Main pantai dan hunting foto estetik
- **14:00** — Menuju Spot Maer untuk snorkeling terumbu karang
- **15:00** — Dokumentasi underwater satu per satu
- **16:00** — Menuju spot Pantai Ujung Gelam
- **16:30** — Bersantai dan foto di ikon kelapa miring
- **17:00** — Menikmati sunset di Pantai Ujung Gelam
- **17:30** — Perjalanan kapal kembali ke Dermaga Karimunjawa
- **17:45** — Diantar kembali ke hotel dan bersih-bersih diri
- **18:00** — Menikmati makan malam di hotel & acara bebas
- **22:00** — Istirahat malam

#### Hari 3 — Tour Laut Timur (Full Day)
- **07:00** — Sarapan pagi di hotel
- **07:30** — Persiapan tour laut hari ke-2
- **08:00** — Penghantaran menuju Dermaga Wisata
- **09:00** — Briefing trip oleh guide di kapal wisata
- **09:30** — Perjalanan tour laut menuju perairan Pulau Cilik
- **10:00** — Snorkeling di spot Nemo & terumbu karang Pulau Cilik
- **10:30** — Dokumentasi underwater satu per satu
- **11:00** — Menuju Pulau Cilik
- **11:30** — Menyiapkan piknik makan siang BBQ ikan bakar
- **12:00** — Makan siang ikan bakar & istirahat di pulau
- **13:00** — Menuju spot Gosong Putih (pulau pasir tak berpenghuni di tengah laut)
- **14:00** — Menuju spot snorkeling Nyamplung Ragas
- **15:00** — Snorkeling dan dokumentasi underwater satu per satu
- **16:00** — Menuju Pulau Menjangan Kecil
- **16:30** — Foto dan berenang bersama ikan hiu di penangkaran
- **17:00** — Hunting foto dan menikmati sunset
- **17:30** — Kembali ke Dermaga Karimunjawa
- **17:45** — Diantar ke hotel dan bersih-bersih diri
- **18:00** — Menikmati makan malam di hotel & acara bebas
- **22:00** — Istirahat malam

#### Hari 4 — Check Out & Kembali
- **08:30** — Sarapan pagi di hotel dan persiapan check out
- **10:30** — Pembagian tiket dan proses boarding kapal
- **10:45** — Check out menuju Pelabuhan Karimunjawa
- **11:00** — Kapal Express Bahari berangkat kembali menuju Jepara
- **13:30** — Kapal tiba di Pelabuhan Kartini Jepara. Trip selesai

---

### Opsi Kapal Feri (KMP Siginjai)

#### Hari 1 — Tour Darat
- **05:30** — Bertemu di Pelabuhan Kartini Jepara
- **06:00** — Pembagian tiket kapal
- **07:00** — Kapal feri KMP Siginjai berangkat menuju Karimunjawa
- **12:00** — Kapal tiba di Pelabuhan Karimunjawa
- **12:30** — Penghantaran dan check in ke hotel pilihan
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour darat
- **14:00** — Perjalanan tour darat ke Pantai Boby
- **14:30** — Main pantai pasir putih di Pantai Boby
- **15:30** — Foto di ayunan kelapa miring
- **16:00** — Perjalanan menuju Bukit Love
- **16:30** — Foto di monumen Karimunjawa
- **17:00** — Menikmati sunset dari Bukit Love
- **17:30** — Perjalanan kembali ke hotel
- **18:00** — Tiba di hotel dan bersih-bersih diri
- **18:30** — Makan malam di hotel
- **19:30** — Jalan-jalan malam ke Alun-alun Karimunjawa
- **21:00** — Kembali ke hotel dan istirahat

#### Hari 2 — Tour Laut Barat (Full Day)
- **07:00** — Sarapan pagi di hotel
- **07:30** — Persiapan tour laut
- **08:00** — Menuju Dermaga Wisata
- **09:00** — Briefing trip oleh guide HPI
- **09:30** — Menuju area Gosong Cemara
- **10:00** — Snorkeling spot ikan hias / Nemo
- **10:30** — Dokumentasi underwater
- **11:00** — Menuju Pulau Cemara & persiapan BBQ
- **12:00** — Makan siang BBQ ikan bakar di pantai
- **13:30** — Main pantai dan foto
- **14:00** — Menuju Spot Maer untuk snorkeling terumbu karang
- **15:00** — Dokumentasi underwater
- **16:00** — Menuju spot Pantai Ujung Gelam
- **16:30** — Santai dan foto kelapa miring
- **17:00** — Hunting sunset
- **17:30** — Kembali ke Dermaga Karimunjawa & diantar ke hotel
- **18:00** — Makan malam di hotel & free acara
- **22:00** — Istirahat malam

#### Hari 3 — Tour Laut Timur (Full Day)
- **07:00** — Sarapan pagi di hotel
- **07:30** — Persiapan tour laut hari ke-2
- **08:00** — Menuju Dermaga Wisata
- **09:00** — Briefing trip
- **09:30** — Menuju perairan Pulau Cilik
- **10:00** — Snorkeling spot Nemo & terumbu karang
- **10:30** — Dokumentasi underwater
- **11:00** — Menuju Pulau Cilik & persiapan BBQ
- **12:00** — Makan siang BBQ ikan bakar
- **13:00** — Menuju spot Gosong Putih (pulau pasir)
- **14:00** — Menuju spot Nyamplung Ragas
- **15:00** — Snorkeling & dokumentasi underwater
- **16:00** — Menuju Pulau Menjangan Kecil
- **16:30** — Foto & berenang bersama ikan hiu
- **17:00** — Hunting sunset
- **17:30** — Kembali ke dermaga & hotel
- **18:00** — Makan malam di hotel & free acara
- **22:00** — Istirahat malam

#### Hari 4 — Check Out & Kembali
- **05:30** — Sarapan pagi di hotel dan persiapan check out
- **06:15** — Check out menuju Pelabuhan Karimunjawa
- **06:30** — Pembagian tiket dan boarding kapal
- **07:00** — Kapal feri KMP Siginjai berangkat menuju Jepara
- **11:30** — Kapal tiba di Pelabuhan Kartini Jepara. Trip selesai

## Pemesanan & Syarat Ketentuan
- **Deposit / DP**: 50% dari total harga paket
- **Pelunasan**: Dibayar pada hari keberangkatan
- **Kebijakan Pembatalan**: Biaya administrasi Rp50.000 / orang
- **Pemesanan via WhatsApp**: +62 822-2533-6306

*Catatan: Harga dan jadwal kapal dapat berubah sewaktu-waktu. Cek ketersediaan dan harga terbaru di https://karimunjawa.tours/paket/4h3m-hotel*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}