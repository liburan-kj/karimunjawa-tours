import { NextResponse } from "next/server";

export async function GET() {
  const markdown = `# Tanya Jawab Umum (FAQ) — Karimunjawa Tours

Berikut adalah jawaban atas pertanyaan yang paling sering diajukan mengenai liburan ke Kepulauan Karimunjawa:

---

### 1. Bagaimana cara menuju ke Karimunjawa?
Saat ini penyeberangan utama menuju Karimunjawa berangkat dari **Pelabuhan Kartini, Jepara, Jawa Tengah**. Semua tiket penyeberangan kapal (Express Bahari / KMP Siginjai) sudah diatur dan diurus lengkap di dalam paket wisata kami.

### 2. Berapa lama waktu perjalanan kapal ke Karimunjawa?
- **Express Bahari (Kapal Cepat)**: Memakan waktu sekitar 2 – 3 jam.
- **KMP Siginjai (Kapal Feri Reguler)**: Memakan waktu sekitar 5,5 jam.
*Waktu tempuh dapat menyesuaikan kondisi cuaca dan gelombang laut.*

### 3. Apa perbedaan paket 2H1M, 3H2M, dan 4H3M?
- **2H1M (2 Hari 1 Malam)**: Cocok untuk wisatawan dengan waktu liburan singkat/akhir pekan (tour laut half day, snorkeling spot nemo, sunset Pantai Ujung Gelam).
- **3H2M (3 Hari 2 Malam)**: Paket paling populer dan seimbang (1x tour darat Bukit Love/Pantai Boby + 1x full day tour laut BBQ ikan di pulau & renang bersama hiu).
- **4H3M (4 Hari 3 Malam)**: Eksplorasi maksimal seluruh kawasan Karimunjawa (1x tour darat + 2x full day tour laut menjelajahi zona barat dan timur pulau).

### 4. Apa perbedaan menginap di Hotel dan Homestay?
- **Hotel / Resort**: Menawarkan kenyamanan fasilitas modern, kamar ber-AC, kamar mandi dalam, kolam renang, dan privasi penuh. Mitra kami: Java Paradise Resort, HALO Resort, Happinezz Hills, dan Omah Alchy.
- **Homestay**: Memberikan suasana tinggal lokal yang ramah, bersih, dan hemat budget (pilihan Fan Kamar Mandi Luar/Dalam atau AC Kamar Mandi Dalam).

### 5. Kapan waktu terbaik untuk liburan ke Karimunjawa?
Bulan **April hingga Oktober** adalah musim kemarau dengan kondisi cuaca cerah, laut sangat tenang, dan visibilitas bawah air jernih maksimal untuk snorkeling dan diving.

### 6. Apakah tetap bisa berlibur saat musim hujan?
Bisa, namun perlu fleksibilitas terkait jadwal kapal karena keberangkatan sangat bergantung pada izin syahbandar dan prakiraan cuaca BMKG. Kami selalu memberikan update kondisi cuaca sebelum keberangkatan.

### 7. Bagaimana cara booking dan sistem pembayaran?
- **Homestay**: Down Payment (DP) sebesar Rp500.000 per orang.
- **Hotel**: Down Payment (DP) sebesar 50% dari total harga paket.
- **Rekening Pembayaran**: BCA 0095341611 a.n. Fransisca Frisca Yuwanita.
- **Pelunasan**: Sisa pembayaran dilunasi pada hari keberangkatan saat tiba di Karimunjawa.

### 8. Apa kebijakan pembatalan (cancellation/refund)?
Jika peserta membatalkan sepihak, dikenakan potongan biaya administrasi sebesar Rp50.000 per peserta. Pengembalian dana tiket kapal dan hotel mengikuti kebijakan dari masing-masing pihak operator kapal penyeberangan dan hotel mitra.

### 9. Apa saja barang yang wajib dibawa?
Sunscreen ramah terumbu karang, obat-obatan pribadi, baju ganti/baju renang, kacamata hitam, sandal pantai, dan kamera underwater bila ada. (Peralatan snorkeling fin, masker, dan life jacket sudah kami sediakan lengkap).

### 10. Bagaimana tarif untuk anak-anak?
- **Infant (di bawah 2 tahun)**: Hanya dikenakan tiket infant Rp100.000 pulang-pergi.
- **Anak tanpa extra bed (berbagi kasur dengan orang tua)**: Tarif lebih hemat (hanya tiket kapal + extra breakfast).
- **Anak dengan extra bed**: Dikenakan tarif dewasa.

---

## Butuh Bantuan Lain?
- **WhatsApp**: [+62 822-2533-6306](https://wa.me/6282225336306)
- **Halaman FAQ Resmi**: https://karimunjawa.tours/faq
`;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, Accept-Encoding",
    },
  });
}