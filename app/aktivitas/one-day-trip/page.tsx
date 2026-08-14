import Itinerary from "../../../components/Itinerary";
import FloatingCTA from "../../../components/FloatingCTA";
import type { ItineraryDay } from "../../../components/Itinerary";

export const metadata = {
  title: "One Day Trip Karimunjawa - Karimunjawa Tours",
  description: "Tur laut sehari penuh di Karimunjawa: island hopping, snorkeling, dan makan siang BBQ ikan. Cocok buat yang sudah punya tiket kapal & penginapan sendiri.",
};

const PACKAGE_NAME = "One Day Trip Karimunjawa";
const PRICE = 180000;

const itinerary: ItineraryDay[] = [
  {
    label: "⛵ TOUR LAUT SEHARI",
    items: [
      { time: "08:30", desc: "Berkumpul di dermaga Wisata." },
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
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PACKAGE_NAME,
  description: metadata.description,
  image: "https://karimunjawa.tours/images/island-hopping.png",
  brand: { "@type": "Brand", name: "Karimunjawa Tours" },
  offers: {
    "@type": "Offer",
    url: "https://karimunjawa.tours/aktivitas/one-day-trip",
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

      <div className="pkg-hero">
        <div className="pkg-hero-label">🏝️ AKTIVITAS KARIMUNJAWA</div>
        <h1>One Day Trip Karimunjawa</h1>
        <p>Tur laut sehari penuh buat kamu yang sudah punya tiket penyeberangan dan penginapan sendiri.</p>
      </div>

      <div className="pkg-desc">
        <p>
          One Day Trip ini cocok buat kamu yang sudah booking tiket kapal dan penginapan sendiri di Karimunjawa, tapi mau nambah pengalaman tour laut full day dari pagi sampai sore. Kamu bakal diajak snorkeling di beberapa spot terumbu karang dan ikan hias, island hopping ke pulau-pulau kecil, makan siang BBQ ikan di pulau, sampai foto-foto di ikon pantai Ujung Gelam sambil nikmatin sunset. Semua sudah termasuk kapal, alat snorkeling, guide berlisensi HPI, dan dokumentasi.
        </p>
      </div>

      <div className="pkg-info-box" id="hotel-section">
        <strong>Info:</strong> Spot snorkeling dan pulau yang dikunjungi menyesuaikan kondisi cuaca saat trip berlangsung.
      </div>

      <div className="pkg-section-label">💰 HARGA<span className="line" /></div>
      <p style={{ fontSize: 15, marginBottom: 24 }}>
        <strong style={{ fontSize: 22, color: "#0a5c8a" }}>Rp {PRICE.toLocaleString("id-ID")}</strong> / orang
      </p>

      <div className="pkg-section-label">🗓️ ITINERARY<span className="line" /></div>
      <Itinerary title="Lihat Detail Itinerary" days={itinerary} showInfo={false} />

      <div className="facilities-box" style={{ marginTop: 32 }}>
        <h3 style={{ color: "#073e5e", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>✅ Fasilitas Sudah Termasuk</h3>
        <ul>
          <li><strong>🚤</strong> Sewa kapal tour laut (share dengan peserta lain)</li>
          <li><strong>🤿</strong> Sewa alat snorkeling & pelampung</li>
          <li><strong>🎓</strong> Jasa Tour Guide HPI</li>
          <li><strong>📸</strong> Dokumentasi selama tour</li>
          <li><strong>⚓</strong> Biaya sandar kapal</li>
          <li><strong>🍽️</strong> Makan siang BBQ ikan</li>
          <li><strong>💧</strong> Air minum saat tour</li>
        </ul>
      </div>

      <div className="excluded-box">
        <h3 style={{ color: "#c0392b", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>✕ Tidak Termasuk</h3>
        <ul>
          <li>Tiket masuk penangkaran hiu</li>
          <li>Tiket masuk pulau (jika ada)</li>
          <li>Belanja pribadi</li>
        </ul>
      </div>

      <FloatingCTA lowPrice={PRICE} packageName={PACKAGE_NAME} />
    </div>
  );
}