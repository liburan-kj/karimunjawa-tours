import Link from "next/link";
import Breadcrumb from "../../../components/Breadcrumb";
import { getHomestayData } from "../../../lib/homestayData";
import { getPackagePricing } from "../../../lib/packagePricing";
import HomestayPackageTabs from "../../../components/HomestayPackageTabs";
import FloatingCTA from "../../../components/FloatingCTA";
import type { ItineraryDay } from "../../../components/Itinerary";
import { getReviews } from "../../../lib/reviews";

export const metadata = {
  title: "Paket Wisata Karimunjawa 4 Hari 3 Malam Homestay - Karimunjawa Tours",
  description:
    "Paket wisata 4 hari 3 malam ke Karimunjawa dengan akomodasi homestay, termasuk island hopping, snorkeling, dan transportasi kapal.",
};

const PACKAGE_NAME = "Paket Wisata Karimunjawa 4H3M (Homestay)";

const itineraryExpress: ItineraryDay[] = [
  {
    label: "🌅 HARI PERTAMA",
    items: [
      { time: "07:30", desc: "Bertemu di pelabuhan Kartini Jepara." },
      { time: "08:00", desc: "Pembagian tiket kapal." },
      { time: "09:00", desc: "Kapal berangkat menuju Karimunjawa." },
      { time: "12:00", desc: "Kapal tiba di Karimunjawa." },
      { time: "12:30", desc: "Penghantaran check in ke penginapan." },
      { time: "13:00", desc: "Welcome drink dan makan siang." },
      { time: "13:30", desc: "Persiapan keberangkatan tour darat." },
      { time: "14:00", desc: "Perjalanan tour darat ke pantai Boby." },
      { time: "14:30", desc: "Main pantai di hamparan pasir putih." },
      { time: "15:30", desc: "Foto + main ayunan di kelapa miring." },
      { time: "16:00", desc: "Perjalanan menuju Bukit Love." },
      { time: "16:30", desc: "Foto di monumen Karimunjawa." },
      { time: "17:00", desc: "Dokumentasi dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke penginapan." },
      { time: "18:00", desc: "Tiba di penginapan dan bersih-bersih diri." },
      { time: "18:30", desc: "Makan malam di penginapan." },
      { time: "19:30", desc: "Jalan-jalan ke alun-alun." },
      { time: "21:00", desc: "Kembali ke penginapan dan istirahat." },
    ],
  },
  {
    label: "⛵ HARI KEDUA",
    items: [
      { time: "07:00", desc: "Sarapan pagi di penginapan." },
      { time: "07:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "08:00", desc: "Penghantaran menuju dermaga Wisata." },
      { time: "09:00", desc: "Briefing trip (guide HPI) di kapal wisata." },
      { time: "09:30", desc: "Perjalanan tour laut menuju area Gosong Cemara." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Cemara." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:30", desc: "Main pantai dan foto." },
      { time: "14:00", desc: "Menuju Spot Maer." },
      { time: "15:00", desc: "Dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju spot pantai Ujung Gelam." },
      { time: "16:30", desc: "Main pantai foto di icon kelapa miring." },
      { time: "17:00", desc: "Hunting foto dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke dermaga Karimunjawa." },
      { time: "17:45", desc: "Menuju penginapan dan bersih-bersih diri." },
      { time: "18:00", desc: "Menikmati makan malam & free acara." },
      { time: "22:00", desc: "Istirahat malam." },
    ],
  },
  {
    label: "⛵ HARI KETIGA",
    items: [
      { time: "07:00", desc: "Sarapan pagi di penginapan." },
      { time: "07:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "08:00", desc: "Penghantaran menuju dermaga Wisata." },
      { time: "09:00", desc: "Briefing trip (guide HPI) di kapal wisata." },
      { time: "09:30", desc: "Perjalanan tour laut menuju perairan pulau Cilik." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Cilik." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:00", desc: "Menuju spot Gosong Putih, pulau pasir di tengah laut." },
      { time: "14:00", desc: "Menuju spot Nyamplung Ragas." },
      { time: "15:00", desc: "Snorkeling dan dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju Pulau Menjangan Kecil." },
      { time: "16:30", desc: "Foto bersama hiu." },
      { time: "17:00", desc: "Hunting foto dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke dermaga Karimunjawa." },
      { time: "17:45", desc: "Menuju penginapan dan bersih-bersih diri." },
      { time: "18:00", desc: "Menikmati makan malam & free acara." },
      { time: "22:00", desc: "Istirahat malam." },
    ],
  },
  {
    label: "🚢 HARI KEEMPAT",
    items: [
      { time: "08:30", desc: "Sarapan pagi, persiapan check-out." },
      { time: "10:30", desc: "Pembagian tiket dan boarding kapal." },
      { time: "10:45", desc: "Check out ke pelabuhan Karimunjawa." },
      { time: "11:00", desc: "Perjalanan kapal menuju Jepara." },
      { time: "13:30", desc: "Kapal tiba di pelabuhan Kartini Jepara." },
    ],
  },
];

const itinerarySiginjai: ItineraryDay[] = [
  {
    label: "🌅 HARI PERTAMA",
    items: [
      { time: "05:30", desc: "Bertemu di pelabuhan Kartini Jepara." },
      { time: "06:00", desc: "Pembagian tiket kapal." },
      { time: "07:00", desc: "Kapal berangkat menuju Karimunjawa." },
      { time: "12:00", desc: "Kapal tiba di Karimunjawa." },
      { time: "12:30", desc: "Penghantaran check in ke penginapan." },
      { time: "13:00", desc: "Welcome drink dan makan siang." },
      { time: "13:30", desc: "Persiapan keberangkatan tour darat." },
      { time: "14:00", desc: "Perjalanan tour darat ke pantai Boby." },
      { time: "14:30", desc: "Main pantai di hamparan pasir putih." },
      { time: "15:30", desc: "Foto + main ayunan di kelapa miring." },
      { time: "16:00", desc: "Perjalanan menuju Bukit Love." },
      { time: "16:30", desc: "Foto di monumen Karimunjawa." },
      { time: "17:00", desc: "Dokumentasi dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke penginapan." },
      { time: "18:00", desc: "Tiba di penginapan dan bersih-bersih diri." },
      { time: "18:30", desc: "Makan malam di penginapan." },
      { time: "19:30", desc: "Jalan-jalan ke alun-alun." },
      { time: "21:00", desc: "Kembali ke penginapan dan istirahat." },
    ],
  },
  {
    label: "⛵ HARI KEDUA",
    items: [
      { time: "07:00", desc: "Sarapan pagi di penginapan." },
      { time: "07:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "08:00", desc: "Penghantaran menuju dermaga Wisata." },
      { time: "09:00", desc: "Briefing trip (guide HPI) di kapal wisata." },
      { time: "09:30", desc: "Perjalanan tour laut menuju area Gosong Cemara." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Cemara." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:30", desc: "Main pantai dan foto." },
      { time: "14:00", desc: "Menuju Spot Maer." },
      { time: "15:00", desc: "Dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju spot pantai Ujung Gelam." },
      { time: "16:30", desc: "Main pantai foto di icon kelapa miring." },
      { time: "17:00", desc: "Hunting foto dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke dermaga Karimunjawa." },
      { time: "17:45", desc: "Menuju penginapan dan bersih-bersih diri." },
      { time: "18:00", desc: "Menikmati makan malam & free acara." },
      { time: "22:00", desc: "Istirahat malam." },
    ],
  },
  {
    label: "⛵ HARI KETIGA",
    items: [
      { time: "07:00", desc: "Sarapan pagi di penginapan." },
      { time: "07:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "08:00", desc: "Penghantaran menuju dermaga Wisata." },
      { time: "09:00", desc: "Briefing trip (guide HPI) di kapal wisata." },
      { time: "09:30", desc: "Perjalanan tour laut menuju perairan pulau Cilik." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Cilik." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:00", desc: "Menuju spot Gosong Putih, pulau pasir di tengah laut." },
      { time: "14:00", desc: "Menuju spot Nyamplung Ragas." },
      { time: "15:00", desc: "Snorkeling dan dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju Pulau Menjangan Kecil." },
      { time: "16:30", desc: "Foto bersama hiu." },
      { time: "17:00", desc: "Hunting foto dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke dermaga Karimunjawa." },
      { time: "17:45", desc: "Menuju penginapan dan bersih-bersih diri." },
      { time: "18:00", desc: "Menikmati makan malam & free acara." },
      { time: "22:00", desc: "Istirahat malam." },
    ],
  },
  {
    label: "🚢 HARI KEEMPAT",
    items: [
      { time: "05:30", desc: "Sarapan pagi, persiapan check-out." },
      { time: "06:15", desc: "Check out ke pelabuhan Karimunjawa." },
      { time: "06:30", desc: "Pembagian tiket dan boarding kapal." },
      { time: "07:00", desc: "Perjalanan kapal menuju Jepara." },
      { time: "11:30", desc: "Kapal tiba di pelabuhan Kartini Jepara." },
    ],
  },
];

export default async function Page() {
  const groups = await getHomestayData("4h3m");
  const { reviews, averageRating, reviewCount } = await getReviews();

  const { lowPrice, highPrice, offerCount } = await getPackagePricing("4h3m-homestay");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PACKAGE_NAME,
    description: metadata.description,
    image: "https://karimunjawa.tours/images/4h3mhomestay.jpg",
    brand: { "@type": "Brand", name: "Karimunjawa Tours" },
    aggregateRating: reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviewCount,
    } : undefined,
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      datePublished: r.publishedAt,
    })),
    offers: {
      "@type": "AggregateOffer",
      url: "https://karimunjawa.tours/paket/4h3m-homestay",
      priceCurrency: "IDR",
      lowPrice: String(lowPrice),
      highPrice: String(highPrice),
      offerCount: String(offerCount),
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
    },
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Paket Wisata", href: "/#paket-wisata" },
          { label: "4 Hari 3 Malam - Homestay" },
        ]}
      />

      <div className="pkg-hero">
        <div className="pkg-hero-label">✈️ PAKET WISATA KARIMUNJAWA</div>
        <h1>Paket Wisata Karimunjawa 4 Hari 3 Malam - Homestay</h1>
        <p>
          Pilih tipe homestay favoritmu dan nikmati petualangan bahari terbaik
          di Kepulauan Karimunjawa bersama kami.
        </p>
      </div>

      <div className="pkg-desc">
        <p>
          Paket wisata Karimunjawa 4 hari 3 malam dengan homestay ini pas buat
          kamu yang cari liburan hemat tapi nggak mau kompromi soal keseruan tour
          laut. Selama 3 malam kamu bisa pilih tipe kamar homestay sesuai budget,
          mulai dari fan room kamar mandi luar sampai AC kamar mandi dalam,
          dengan kapasitas 1-4 orang. Aktivitasnya lengkap: 2x tour laut full
          day ke berbagai spot snorkeling seperti Gosong Cemara, pulau Cilik,
          Gosong Putih, sampai berenang bareng hiu di Pulau Menjangan Kecil,
          plus tour darat di hari pertama. Kalau mau penginapan dengan fasilitas
          lebih lengkap, cek juga{" "}
          <Link
            href="/paket/4h3m-hotel"
            className="font-semibold text-[#0a5c8a] underline"
          >
            paket 4 Hari 3 Malam Hotel
          </Link>{" "}
          kami. Penyeberangan Jepara–Karimunjawa tersedia lewat kapal reguler
          (KMP Siginjai) atau kapal cepat (Express Bahari), tinggal pilih tab
          sesuai jadwal dan bujet kamu di bawah. Semua sudah termasuk makan 6x
          (termasuk 2x BBQ ikan di pulau), sewa alat snorkeling, dan guide
          berlisensi HPI — liburan puas, kantong tetap aman.
        </p>
      </div>

      <HomestayPackageTabs
        groups={groups}
        packageName={PACKAGE_NAME}
        itineraryExpress={itineraryExpress}
        itinerarySiginjai={itinerarySiginjai}
        facilities={[
          ["⚓", "Retribusi Penumpang Pelabuhan Jepara"],
          ["🚢", "Tiket kapal Jepara–Karimunjawa (PP)"],
          ["🛡️", "Asuransi perjalanan kapal"],
          ["🚐", "Transportasi check in–check out"],
          ["🏨", "Penginapan di Karimunjawa"],
          ["🍽️", "Makan 8x (incl. 2x BBQ ikan di pulau)"],
          ["🗺️", "Tour darat 1x"],
          ["⛵", "Tour laut full day 2x"],
          ["🏝️", "Retribusi Pelabuhan Wisata Karimunjawa"],
          ["🚤", "Sewa kapal tour laut & crew"],
          ["🎓", "Jasa Tour Guide HPI"],
          ["🤿", "Sewa alat snorkeling, pelampung, fin"],
          ["⚓", "Biaya sandar kapal"],
          ["💧", "Air mineral saat tour laut"],
          ["📸", "Dokumentasi (termasuk bawah air)"],
        ]}
      />

      <FloatingCTA lowPrice={lowPrice} packageName={PACKAGE_NAME} />
    </div>
  );
}