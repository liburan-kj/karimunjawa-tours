import Link from "next/link";
import Breadcrumb from "../../../components/Breadcrumb";
import { getHomestayData } from "../../../lib/homestayData";
import HomestayPackageTabs from "../../../components/HomestayPackageTabs";
import FloatingCTA from "../../../components/FloatingCTA";
import type { ItineraryDay } from "../../../components/Itinerary";
import { getReviews } from "../../../lib/reviews";

export const metadata = {
  title: "Paket Wisata Karimunjawa 2 Hari 1 Malam Homestay - Karimunjawa Tours",
  description:
    "Paket wisata 2 hari 1 malam ke Karimunjawa dengan akomodasi homestay, termasuk island hopping, snorkeling, dan transportasi kapal.",
};

const PACKAGE_NAME = "Paket Wisata Karimunjawa 2H1M (Homestay)";

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
      { time: "13:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "14:30", desc: "Perjalanan tour laut." },
      { time: "15:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "15:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju pantai Ujung Gelam." },
      { time: "16:30", desc: "Istirahat dan santai di pantai." },
      { time: "17:00", desc: "Dokumentasi dan menikmati sunset." },
      { time: "17:30", desc: "Kembali ke penginapan." },
      { time: "18:00", desc: "Tiba di penginapan dan bersih-bersih diri." },
      { time: "18:30", desc: "Makan malam di penginapan." },
      { time: "19:30", desc: "Jalan-jalan ke alun-alun." },
      { time: "21:00", desc: "Kembali ke penginapan dan istirahat." },
    ],
  },
  {
    label: "🚢 HARI KEDUA",
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
      { time: "13:30", desc: "Persiapan keberangkatan tour laut." },
      { time: "14:30", desc: "Perjalanan tour laut." },
      { time: "15:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "15:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "16:00", desc: "Menuju pantai Ujung Gelam." },
      { time: "16:30", desc: "Istirahat dan santai di pantai." },
      { time: "17:00", desc: "Dokumentasi dan menikmati sunset." },
      { time: "17:30", desc: "Kembali menuju dermaga Wisata." },
      { time: "17:45", desc: "Dari dermaga wisata kembali ke penginapan." },
      { time: "18:00", desc: "Tiba di penginapan dan bersih-bersih diri." },
      { time: "18:30", desc: "Makan malam di penginapan." },
      { time: "19:30", desc: "Jalan-jalan ke alun-alun." },
      { time: "21:00", desc: "Kembali ke penginapan dan istirahat." },
    ],
  },
  {
    label: "🚢 HARI KEDUA",
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
  const groups = await getHomestayData("2h1m");
  const { reviews, averageRating, reviewCount } = await getReviews();

  const allItems = groups.flatMap((g) => g.items);
  const allSigPrices = allItems.map((r) => r.sig);
  const allExpPrices = allItems.map((r) => r.exp);

  const lowPrice = allSigPrices.length ? Math.min(...allSigPrices) * 1000 : 610000;
  const highPrice = allExpPrices.length ? Math.max(...allExpPrices) * 1000 : 1030000;
  const offerCount = allItems.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PACKAGE_NAME,
    description: metadata.description,
    image: "https://karimunjawa.tours/images/2h1mhomestay.jpg",
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
      url: "https://karimunjawa.tours/paket/2h1m-homestay",
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
          { label: "2 Hari 1 Malam - Homestay" },
        ]}
      />

      <div className="pkg-hero">
        <div className="pkg-hero-label">✈️ PAKET WISATA KARIMUNJAWA</div>
        <h1>Paket Wisata Karimunjawa 2 Hari 1 Malam - Homestay</h1>
        <p>
          Pilih tipe homestay favoritmu dan nikmati petualangan bahari terbaik
          di Kepulauan Karimunjawa bersama kami.
        </p>
      </div>

      <div className="pkg-desc">
        <p>
          Paket wisata Karimunjawa 2 hari 1 malam dengan homestay ini pilihan
          paling terjangkau buat kamu yang waktu liburannya mepet tapi tetap
          pengen ngerasain laut Karimunjawa. Kamu bisa pilih tipe kamar sesuai
          budget, mulai dari fan room kamar mandi luar sampai AC kamar mandi
          dalam, dengan kapasitas 1-4 orang. Setelah check in di siang hari, kamu
          langsung diajak tour laut untuk snorkeling di spot ikan hias dan mampir
          ke pantai Ujung Gelam buat santai sambil nikmatin sunset. Kalau mau
          penginapan dengan fasilitas lebih lengkap, cek juga{" "}
          <Link
            href="/paket/2h1m-hotel"
            className="font-semibold text-[#0a5c8a] underline"
          >
            paket 2 Hari 1 Malam Hotel
          </Link>{" "}
          kami. Penyeberangan Jepara–Karimunjawa tersedia lewat kapal reguler
          (KMP Siginjai) atau kapal cepat (Express Bahari), tinggal pilih tab
          sesuai jadwal dan bujet kamu di bawah. Semua sudah termasuk tour
          laut half day, makan 3x, sewa alat snorkeling, dan guide berlisensi
          HPI — trip singkat yang tetap berkesan.
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
          ["🍽️", "Makan 3x"],
          ["🗺️", "Tour darat 1x"],
          ["⛵", "Tour laut half day 1x"],
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