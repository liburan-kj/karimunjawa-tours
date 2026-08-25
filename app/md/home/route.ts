import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Karimunjawa Tours — Paket Wisata & Liburan Karimunjawa Terpercaya

> Agen wisata lokal resmi di Karimunjawa, Jepara, Jawa Tengah sejak 2015. Menyediakan paket tour all-inclusive, transportasi kapal penyeberangan, penginapan hotel resort & homestay, tour laut snorkeling terumbu karang, makan, dokumentasi underwater, dan guide berlisensi HPI.

Dokumentasi lengkap untuk AI Agent: https://karimunjawa.tours/llms-full.txt
Indeks Agent (llms.txt): https://karimunjawa.tours/llms.txt

---

## Pilihan Paket Wisata Karimunjawa

### 1. Paket 2 Hari 1 Malam (2H1M)
- **Homestay**: Mulai Rp610.000/orang (KMP Siginjai) | Rp690.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/2h1m-homestay
- **Hotel Resort**: Mulai Rp1.280.000/orang (KMP Siginjai) | Rp1.300.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/2h1m-hotel
- *Fasilitas*: Tiket kapal PP, penginapan 1 malam, makan 3x, tour laut half day, snorkeling spot Nemo, sunset Pantai Ujung Gelam, alat snorkeling, guide HPI, dokumentasi underwater.

### 2. Paket 3 Hari 2 Malam (3H2M) — Paling Populer
- **Homestay**: Mulai Rp920.000/orang (KMP Siginjai) | Rp1.020.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/3h2m-homestay
- **Hotel Resort**: Mulai Rp1.770.000/orang (KMP Siginjai) | Rp1.790.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/3h2m-hotel
- *Fasilitas*: Tiket kapal PP, penginapan 2 malam, makan 5-6x (termasuk 1x piknik BBQ ikan di pulau), 1x tour darat (Pantai Boby & Bukit Love), 1x tour laut full day (spot Maer, spot Nemo, renang dengan hiu, Pantai Ujung Gelam), alat snorkeling, guide HPI, dokumentasi underwater.

### 3. Paket 4 Hari 3 Malam (4H3M) — Eksplorasi Maksimal
- **Homestay**: Mulai Rp1.180.000/orang (KMP Siginjai) | Rp1.340.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/4h3m-homestay
- **Hotel Resort**: Mulai Rp2.270.000/orang (KMP Siginjai) | Rp2.300.000/orang (Express Bahari)
  Detail: https://karimunjawa.tours/md/paket/4h3m-hotel
- *Fasilitas*: Tiket kapal PP, penginapan 3 malam, makan 8x (termasuk 2x BBQ ikan bakar di pulau), 1x tour darat, 2x tour laut full day (Trip Barat & Trip Timur jelajah Gosong Cemara, Pulau Cilik, pulau pasir Gosong Putih, penangkaran hiu), alat snorkeling, guide HPI, dokumentasi underwater.

---

## Aktivitas Wisata & Rental
- **One Day Trip Karimunjawa**: Tour laut harian full day (snorkeling spot nemo, island hopping, BBQ ikan bakar, sunset). Rp200.000/orang. Detail: https://karimunjawa.tours/md/aktivitas/one-day-trip
- **Diving Trip Karimunjawa**: Scuba diving 2x dive untuk pemilik lisensi diving. Rp1.100.000/orang (min 2 pax). Detail: https://karimunjawa.tours/md/aktivitas/diving-trip
- **Sewa Motor Karimunjawa**: Rental sepeda motor harian, ambil di pelabuhan atau diantar ke penginapan. Rp75.000/hari. Detail: https://karimunjawa.tours/md/aktivitas/sewa-motor

---

## Hotel Partner
Java Paradise Resort, HALO Resort, Happinezz Hills, Omah Alchy.

---

## Titik Keberangkatan & Pemesanan
- **Keberangkatan**: Pelabuhan Kartini, Jepara, Jawa Tengah via Express Bahari (±2–3 jam) atau KMP Siginjai (±5.5 jam).
- **Deposit**: 50% (Hotel) atau Rp500.000/orang (Homestay). Transfer BCA 0095341611 a.n. Fransisca Frisca Yuwanita.
- **WhatsApp Reservasi**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Website**: https://karimunjawa.tours
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}