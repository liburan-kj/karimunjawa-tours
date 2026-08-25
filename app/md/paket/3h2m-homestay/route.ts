import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Paket Wisata Karimunjawa 3 Hari 2 Malam - Homestay

Paket wisata Karimunjawa 3 Hari 2 Malam dengan akomodasi Homestay. Pilihan paling favorit dan hemat untuk menikmati keindahan Karimunjawa secara lengkap — memadukan tour darat, island hopping, snorkeling terumbu karang, dan berenang bersama ikan hiu. Mulai dari Rp920.000/orang (KMP Siginjai) atau Rp1.020.000/orang (Express Bahari).

## Pilihan Tipe Kamar Homestay
- **Fan · Kamar Mandi Luar**: Kapasitas 1–4 orang per kamar
- **Fan · Kamar Mandi Dalam**: Kapasitas 1–4 orang per kamar
- **AC · Kamar Mandi Dalam**: Kapasitas 1–4 orang per kamar

## Pilihan Kapal Penyeberangan
- **Express Bahari (Kapal Cepat)**: Waktu tempuh ±2–3 jam dari Pelabuhan Kartini Jepara
- **KMP Siginjai (Kapal Feri)**: Waktu tempuh ±5.5 jam dari Pelabuhan Kartini Jepara

## Fasilitas Termasuk
- Retribusi Penumpang Pelabuhan Jepara
- Tiket kapal Jepara–Karimunjawa PP (Express Bahari / KMP Siginjai)
- Asuransi perjalanan kapal
- Transportasi lokal check in & check out di Karimunjawa
- Penginapan homestay 2 malam di Karimunjawa
- Makan 5x (termasuk 1x piknik makan siang BBQ ikan bakar di pulau)
- Tour darat 1x (Pantai Boby & Bukit Love Karimunjawa)
- Tour laut full day 1x (spot Maer, spot Nemo, Pulau Menjangan Kecil/Cemara, Pantai Ujung Gelam)
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
- **12:30** — Penghantaran dan check in ke homestay
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour darat
- **14:00** — Perjalanan tour darat menuju Pantai Boby
- **14:30** — Menikmati suasana pantai dan hamparan pasir putih
- **15:30** — Foto-foto di spot ayunan pohon kelapa miring
- **16:00** — Perjalanan menuju Bukit Love
- **16:30** — Hunting foto di ikon Monumen Karimunjawa
- **17:00** — Dokumentasi dan menikmati pemandangan sunset dari ketinggian
- **17:30** — Perjalanan kembali ke penginapan
- **18:00** — Tiba di penginapan dan bersih-bersih diri
- **18:30** — Makan malam di penginapan
- **19:30** — Jalan-jalan malam ke Alun-alun Karimunjawa
- **21:00** — Kembali ke penginapan dan istirahat

#### Hari 2 — Tour Laut Full Day
- **07:00** — Sarapan pagi di penginapan
- **07:30** — Persiapan keberangkatan tour laut
- **08:00** — Penghantaran menuju Dermaga Wisata Karimunjawa
- **09:00** — Briefing keselamatan oleh Guide HPI di kapal wisata
- **09:30** — Perjalanan tour laut menuju perairan area Maer
- **10:00** — Snorkeling di spot Nemo / ikan hias warna-warni
- **10:30** — Sesi dokumentasi underwater satu per satu
- **11:00** — Menuju Pulau Menjangan Kecil / Pulau Cemara
- **11:30** — Menyiapkan piknik makan siang BBQ ikan bakar di pantai
- **12:00** — Makan siang BBQ ikan bakar bersama & istirahat santai
- **13:00** — Main pantai, hunting foto & berenang bersama ikan hiu
- **14:00** — Snorkeling di spot habitat terumbu karang alami
- **15:00** — Dokumentasi foto bawah air bersama biota laut
- **16:00** — Menuju spot Pantai Ujung Gelam
- **16:30** — Bersantai dan foto di ikon pohon kelapa miring
- **17:00** — Menikmati pemandangan sunset eksotis di ufuk barat
- **17:30** — Perjalanan kapal kembali ke Dermaga Karimunjawa
- **17:45** — Dari dermaga diantar kembali ke homestay
- **18:00** — Tiba di homestay dan bersih-bersih diri
- **18:30** — Makan malam dan acara santai bebas
- **22:00** — Istirahat malam

#### Hari 3 — Check Out & Kembali
- **08:30** — Sarapan pagi di penginapan dan persiapan check out
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
- **12:30** — Penghantaran dan check in ke homestay
- **13:00** — Welcome drink dan makan siang
- **13:30** — Persiapan keberangkatan tour darat
- **14:00** — Perjalanan tour darat menuju Pantai Boby
- **14:30** — Santai di pantai pasir putih
- **15:30** — Foto di ayunan kelapa miring
- **16:00** — Perjalanan menuju Bukit Love
- **16:30** — Foto di monumen Karimunjawa
- **17:00** — Menikmati sunset dari Bukit Love
- **17:30** — Kembali ke penginapan
- **18:00** — Tiba di penginapan dan bersih-bersih diri
- **18:30** — Makan malam di penginapan
- **19:30** — Jalan-jalan ke Alun-alun Karimunjawa
- **21:00** — Kembali ke penginapan dan istirahat

#### Hari 2 — Tour Laut Full Day
- **07:00** — Sarapan pagi di penginapan
- **07:30** — Persiapan keberangkatan tour laut
- **08:00** — Penghantaran menuju Dermaga Wisata
- **09:00** — Briefing trip (guide HPI) di kapal wisata
- **09:30** — Perjalanan tour laut menuju spot Maer
- **10:00** — Snorkeling di spot Nemo / ikan hias
- **10:30** — Dokumentasi underwater satu per satu
- **11:00** — Menuju Pulau Cemara / Menjangan Kecil
- **11:30** — Menyiapkan picnic lunch BBQ ikan bakar
- **12:00** — Makan siang ikan bakar & istirahat di pantai
- **13:00** — Main pantai, foto & renang dengan ikan hiu
- **14:00** — Snorkeling di spot habitat terumbu karang
- **15:00** — Dokumentasi underwater satu per satu
- **16:00** — Menuju spot Pantai Ujung Gelam
- **16:30** — Main pantai & foto di ikon kelapa miring
- **17:00** — Hunting foto dan menikmati sunset
- **17:30** — Perjalanan kembali ke Dermaga Karimunjawa
- **17:45** — Kembali ke penginapan dan bersih-bersih diri
- **18:00** — Makan malam & free acara
- **22:00** — Istirahat malam

#### Hari 3 — Check Out & Kembali
- **05:30** — Sarapan pagi di penginapan dan persiapan check out
- **06:15** — Check out menuju Pelabuhan Karimunjawa
- **06:30** — Pembagian tiket dan boarding kapal
- **07:00** — Kapal feri KMP Siginjai berangkat kembali menuju Jepara
- **11:30** — Kapal tiba di Pelabuhan Kartini Jepara. Trip selesai

## Pemesanan & Syarat Ketentuan
- **Deposit / DP**: Rp500.000 / orang
- **Pelunasan**: Dibayar pada hari keberangkatan
- **Kebijakan Pembatalan**: Biaya administrasi Rp50.000 / orang
- **Pemesanan via WhatsApp**: +62 822-2533-6306

*Catatan: Harga dan jadwal kapal dapat berubah sewaktu-waktu. Cek ketersediaan dan harga terbaru di https://karimunjawa.tours/paket/3h2m-homestay*
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}