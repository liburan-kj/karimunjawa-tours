import Image from "next/image";
import CTASection from "../../../components/CTASection";
import Breadcrumb from "../../../components/Breadcrumb";

export const metadata = {
  title: "Sewa Motor Karimunjawa - Karimunjawa Tours",
  description: "Sewa motor harian di Karimunjawa, bisa ambil di pelabuhan atau diantar ke penginapan. Cocok buat eksplorasi bebas selama liburan.",
  alternates: { canonical: "https://karimunjawa.tours/aktivitas/sewa-motor" },
  openGraph: {
    title: "Sewa Motor Karimunjawa",
    description: "Sewa motor harian di Karimunjawa, bisa ambil di pelabuhan atau diantar ke penginapan.",
    url: "https://karimunjawa.tours/aktivitas/sewa-motor",
    images: ["https://karimunjawa.tours/images/sewa-motor.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sewa Motor Karimunjawa",
    description: "Sewa motor harian di Karimunjawa, bisa ambil di pelabuhan atau diantar ke penginapan.",
    images: ["https://karimunjawa.tours/images/sewa-motor.jpg"],
  },
};

const PACKAGE_NAME = "Sewa Motor Karimunjawa";
const PRICE = 75000;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: PACKAGE_NAME,
  description: metadata.description,
  image: "https://karimunjawa.tours/images/sewa-motor.jpg",
  brand: { "@type": "Brand", name: "Karimunjawa Tours" },
  offers: {
    "@type": "Offer",
    url: "https://karimunjawa.tours/aktivitas/sewa-motor",
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
          { label: "Sewa Motor" },
        ]}
      />

      <div className="pkg-hero">
        <div className="pkg-hero-label">🛵 AKTIVITAS KARIMUNJAWA</div>
        <h1>Sewa Motor Karimunjawa</h1>
        <p>Penuhi kebutuhan transportasi selama di Karimunjawa dengan bebas sesuai jadwalmu sendiri.</p>
      </div>

      <Image
        src="/images/sewa-motor.jpg"
        alt="Sewa Motor Karimunjawa - motor yang siap disewa untuk transportasi wisata"
        width={800}
        height={450}
        priority
        fetchPriority="high"
        sizes="(max-width: 800px) 100vw, 800px"
        style={{ width: "100%", height: "auto", borderRadius: 14, marginBottom: 24 }}
      />

      <div className="pkg-desc">
        <p>
          Buat kamu yang mau eksplor Karimunjawa dengan lebih leluasa tanpa terikat jadwal tour, sewa motor harian jadi pilihan pas. Motor bisa diambil langsung di pelabuhan begitu kamu tiba, atau diantar ke penginapan sesuai permintaan — tinggal koordinasi waktu dan lokasinya lewat WhatsApp.
        </p>
      </div>

      <div className="pkg-section-label">💰 HARGA<span className="line" /></div>
      <p style={{ fontSize: 15, marginBottom: 24 }}>
        <strong style={{ fontSize: 22, color: "#0a5c8a" }}>Rp {PRICE.toLocaleString("id-ID")}</strong> / hari
      </p>

      <div className="facilities-box" style={{ marginTop: 8 }} id="hotel-section">
        <h3 style={{ color: "#073e5e", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>✅ Pilihan Pengambilan</h3>
        <ul>
          <li><strong>⚓</strong> Ambil langsung di pelabuhan</li>
          <li><strong>🏨</strong> Diantar ke penginapan</li>
        </ul>
      </div>

      <div style={{ margin: "40px -20px 0" }}><CTASection /></div>
    </div>
  );
}