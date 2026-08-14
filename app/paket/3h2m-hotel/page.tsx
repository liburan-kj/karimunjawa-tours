import { getHotelData } from "../../../lib/hotelData";
import PackageTabs from "../../../components/PackageTabs";
import FloatingCTA from "../../../components/FloatingCTA";
import type { ItineraryDay } from "../../../components/Itinerary";

export const metadata = {
  title: "Paket Wisata Karimunjawa 3 Hari 2 Malam Hotel - Karimunjawa Tours",
  description: "Paket wisata 3 hari 2 malam ke Karimunjawa dengan akomodasi hotel, termasuk island hopping, snorkeling, dan transportasi kapal.",
};

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
      { time: "09:30", desc: "Perjalanan tour laut menuju area Maer." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Menjangan kecil/Cemara." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:00", desc: "Main pantai, foto & renang dengan hiu." },
      { time: "14:00", desc: "Snorkeling spot habitat terumbu karang." },
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
    label: "🚢 HARI KETIGA",
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
      { time: "12:00", desc: "Kapal feri Siginjai tiba di Karimunjawa." },
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
      { time: "09:30", desc: "Perjalanan tour laut menuju area Maer." },
      { time: "10:00", desc: "Snorkeling di spot nemo/ikan hias." },
      { time: "10:30", desc: "Dokumentasi underwater satu persatu." },
      { time: "11:00", desc: "Menuju pulau Menjangan kecil/Cemara." },
      { time: "11:30", desc: "Menyiapkan picnic lunch (BBQ)." },
      { time: "12:00", desc: "Makan siang (ikan bakar) & istirahat." },
      { time: "13:00", desc: "Main pantai, foto & renang dengan hiu." },
      { time: "14:00", desc: "Snorkeling spot habitat terumbu karang." },
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
    label: "🚢 HARI KETIGA",
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
  const hotels = await getHotelData("3h2m");
  const PACKAGE_NAME = "Paket Wisata Karimunjawa 3H2M (Hotel)";
  const allSigPrices = Object.values(hotels).flat().map((r) => r.sig);
  const allExpPrices = Object.values(hotels).flat().map((r) => r.exp);
  const lowPrice = allExpPrices.length ? Math.min(...allExpPrices) * 1000 : 1770000;
  const highPrice = allSigPrices.length ? Math.max(...allSigPrices) * 1000 : 5010000;
  const offerCount = Object.values(hotels).flat().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PACKAGE_NAME,
    description: metadata.description,
    image: "https://karimunjawa.tours/images/3h2mhotel.jpg",    
    brand: { "@type": "Brand", name: "Karimunjawa Tours" },
    offers: {
      "@type": "AggregateOffer",
      url: "https://karimunjawa.tours/paket/3h2m-hotel",
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

      <div className="pkg-hero">
        <div className="pkg-hero-label">✈️ PAKET WISATA KARIMUNJAWA</div>
        <h1>Paket Wisata Karimunjawa 3 Hari 2 Malam - Hotel</h1>
        <p>Pilih penginapan favoritmu dan nikmati petualangan bahari terbaik di Kepulauan Karimunjawa bersama kami.</p>
      </div>

      <div className="pkg-desc">
        <p>
          Paket wisata Karimunjawa 3 hari 2 malam ini cocok buat kamu yang pengen liburan santai tapi tetap dapet pengalaman laut yang lengkap — snorkeling di beberapa spot terumbu karang, island hopping ke pulau-pulau kecil, sampai foto-foto di ikon Karimunjawa kayak Bukit Love dan pantai pasir putih. Selama 2 malam, kamu bisa pilih menginap di salah satu dari 4 hotel rekanan kami (Java Paradise Resort, HALO Resort, Happinezz Hills, atau Omah Alchy), masing-masing dengan beberapa tipe kamar sesuai budget. Penyeberangan Jepara–Karimunjawa tersedia lewat kapal reguler (KMP Siginjai) atau kapal cepat (Express Bahari), tinggal pilih tab sesuai jadwal dan bujet kamu di bawah. Semua sudah termasuk tour darat, tour laut full day, makan 6x, dokumentasi bawah air, dan guide berlisensi HPI.
        </p>
      </div>

      <PackageTabs
        hotels={hotels}
        packageName={PACKAGE_NAME}
        itineraryExpress={itineraryExpress}
        itinerarySiginjai={itinerarySiginjai}
        facilities={[
          ["⚓", "Retribusi Penumpang Pelabuhan Jepara"],
          ["🚢", "Tiket kapal Jepara–Karimunjawa (PP)"],
          ["🛡️", "Asuransi perjalanan kapal"],
          ["🚐", "Transportasi check in–check out"],
          ["🏨", "Penginapan di Karimunjawa"],
          ["🍽️", "Makan 6x (incl. BBQ ikan di pulau)"],
          ["🗺️", "Tour darat 1x"],
          ["⛵", "Tour laut full day 1x"],
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