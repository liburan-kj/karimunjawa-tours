import Image from "next/image";
import Itinerary from "../../../components/Itinerary";
import FloatingCTA from "../../../components/FloatingCTA";
import Breadcrumb from "../../../components/Breadcrumb";
import type { ItineraryDay } from "../../../components/Itinerary";

export const metadata = {
  title: "Diving Trip Karimunjawa - Karimunjawa Tours",
  description: "Diving trip 2x dive di spot berbeda untuk pemilik lisensi scuba diving. Termasuk kapal, alat dive, dan pemandu selam.",
  alternates: { canonical: "https://karimunjawa.tours/aktivitas/diving-trip" },
  openGraph: {
    title: "Diving Trip Karimunjawa",
    description: "Diving trip 2x dive di spot berbeda untuk pemilik lisensi scuba diving.",
    url: "https://karimunjawa.tours/aktivitas/diving-trip",
    images: ["https://karimunjawa.tours/images/scuba-diving.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Diving Trip Karimunjawa",
    description: "Diving trip 2x dive di spot berbeda untuk pemilik lisensi scuba diving.",
    images: ["https://karimunjawa.tours/images/scuba-diving.jpg"],
  },
};

const PACKAGE_NAME = "Diving Trip Karimunjawa";
const PRICE = 1100000;

const itinerary: ItineraryDay[] = [
  {
    label: "🤿 DIVING TRIP",
    items: [
      { time: "08:30", desc: "Bertemu di dermaga Wisata." },
      { time: "09:00", desc: "Briefing trip (guide/dive master) di kapal wisata." },
      { time: "09:30", desc: "Perjalanan tour laut menuju perairan pulau Menjangan Kecil." },
      { time: "10:00", desc: "Diving dan dokumentasi di perairan pulau Menjangan Kecil." },
      { time: "11:00", desc: "Menuju pulau Cemara." },
      { time: "11:30", desc: "Acara bebas." },
      { time: "12:00", desc: "Makan siang ikan bakar (belum termasuk dalam paket)." },
      { time: "13:00", desc: "Istirahat." },
      { time: "14:00", desc: "Menuju spot Gosong Cemara." },
      { time: "14:30", desc: "Diving dan dokumentasi di Gosong Cemara." },
      { time: "16:30", desc: "Kembali ke dermaga Wisata Karimunjawa." },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PACKAGE_NAME,
  description: metadata.description,
  image: "https://karimunjawa.tours/images/scuba-diving.jpg",
  brand: { "@type": "Brand", name: "Karimunjawa Tours" },
  offers: {
    "@type": "Offer",
    url: "https://karimunjawa.tours/aktivitas/diving-trip",
    priceCurrency: "IDR",
    price: String(PRICE),
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
  },
};

export default function Page() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Aktivitas", href: "/#aktivitas" },
          { label: "Diving Trip" },
        ]}
      />

      <div className="pkg-hero">
        <div className="pkg-hero-label">🤿 AKTIVITAS KARIMUNJAWA</div>
        <h1>Diving Trip Karimunjawa</h1>
        <p>2x dive di spot berbeda, khusus untuk pemilik lisensi scuba diving.</p>
      </div>

      <Image
        src="/images/scuba-diving.jpg"
        alt="Diving Trip Karimunjawa - penyelam di perairan Karimunjawa"
        width={800}
        height={450}
        priority
        sizes="(max-width: 800px) 100vw, 800px"
        style={{ width: "100%", height: "auto", borderRadius: 14, marginBottom: 24 }}
      />

      <div className="pkg-desc">
        <p>
          Diving Trip ini didesain buat kamu yang sudah punya lisensi scuba diving dan pengen eksplor bawah laut Karimunjawa lebih dalam. Kamu bakal diving 2 kali di spot berbeda — perairan pulau Menjangan Kecil dan Gosong Cemara — ditemani dive master berpengalaman. Sudah termasuk kapal, alat scuba dive lengkap, fee pemandu selam, dan extra tank buat dive kedua. Trip ini minimal 2 orang peserta.
        </p>
      </div>

      <div className="pkg-info-box" id="hotel-section">
        <strong>Syarat:</strong> Wajib memiliki lisensi scuba diving (Open Water atau setara). Minimal 2 orang peserta per trip.
      </div>

      <div className="pkg-section-label">💰 HARGA<span className="line" /></div>
      <p style={{ fontSize: 15, marginBottom: 24 }}>
        <strong style={{ fontSize: 22, color: "#0a5c8a" }}>Rp {PRICE.toLocaleString("id-ID")}</strong> / orang
        <span style={{ display: "block", fontSize: 13, color: "#5b6b7b", marginTop: 4 }}>Minimal 2 orang &bull; wajib punya lisensi scuba diving</span>
      </p>

      <div className="pkg-section-label">🗓️ ITINERARY<span className="line" /></div>
      <Itinerary title="Lihat Detail Itinerary" days={itinerary} showInfo={false} />

      <div className="facilities-box" style={{ marginTop: 32 }}>
        <h3 style={{ color: "#073e5e", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>✅ Fasilitas Sudah Termasuk</h3>
        <ul>
          <li><strong>🤿</strong> 2x dive di spot berbeda</li>
          <li><strong>🚤</strong> Sewa kapal</li>
          <li><strong>🎽</strong> Sewa alat scuba dive</li>
          <li><strong>🧑‍🏫</strong> Fee pemandu selam (dive master)</li>
          <li><strong>💨</strong> Extra tank untuk dive kedua</li>
        </ul>
      </div>

      <div className="excluded-box">
        <h3 style={{ color: "#c0392b", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>✕ Tidak Termasuk</h3>
        <ul>
          <li>Makan siang</li>
          <li>Biaya sandar jika singgah ke pulau untuk istirahat</li>
        </ul>
      </div>

      <FloatingCTA lowPrice={PRICE} packageName={PACKAGE_NAME} />
    </div>
  );
}