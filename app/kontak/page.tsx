import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "../../components/Breadcrumb";

export const metadata: Metadata = {
  title: "Hubungi Kami - Karimunjawa Tours",
  description:
    "Hubungi Karimunjawa Tours via WhatsApp (+62 822-2533-6306) atau email untuk konsultasi gratis, jadwal penyeberangan kapal, dan reservasi paket wisata Karimunjawa.",
  alternates: {
    canonical: "https://karimunjawa.tours/kontak",
  },
  openGraph: {
    type: "website",
    url: "https://karimunjawa.tours/kontak",
    title: "Hubungi Kami | Karimunjawa Tours",
    description:
      "Hubungi Karimunjawa Tours via WhatsApp atau email untuk konsultasi paket wisata dan pemesanan trip ke Kepulauan Karimunjawa.",
    images: [
      {
        url: "https://karimunjawa.tours/images/satu.jpg",
        width: 1200,
        height: 630,
        alt: "Hubungi Karimunjawa Tours",
      },
    ],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Hubungi Kami - Karimunjawa Tours",
    description:
      "Hubungi Karimunjawa Tours via WhatsApp atau email untuk konsultasi paket wisata dan pemesanan trip ke Kepulauan Karimunjawa.",
    url: "https://karimunjawa.tours/kontak",
    mainEntity: {
      "@type": "TravelAgency",
      name: "Karimunjawa Tours",
      url: "https://karimunjawa.tours",
      logo: "https://karimunjawa.tours/images/satu.jpg",
      image: "https://karimunjawa.tours/images/satu.jpg",
      telephone: "+62-822-2533-6306",
      email: "liburan@karimunjawa.tours",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karimunjawa, Jepara",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "07:00",
          closes: "21:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/karimunjawa.tours",
        "https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5",
      ],
    },
  };

  return (
    <div className="contact-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Hubungi Kami" },
        ]}
      />

      {/* Hero Header */}
      <div className="pkg-hero">
        <div className="pkg-hero-label">📞 HUBUNGI KAMI</div>
        <h1>Kontak &amp; Layanan Wisatawan</h1>
        <p>
          Punya pertanyaan tentang paket wisata Karimunjawa, ingin konsultasi custom itinerary rombongan, atau siap reservasi trip? Tim lokal kami siap membantu dengan ramah dan cepat.
        </p>
      </div>

      {/* Saluran Komunikasi Grid */}
      <div className="pkg-section-label">
        💬 SALURAN KOMUNIKASI RESMI
        <span className="line" />
      </div>

      <div className="contact-channels-grid">
        {/* WhatsApp Card */}
        <div className="contact-card featured">
          <span className="contact-badge">Paling Cepat</span>
          <div className="contact-icon-wrapper contact-icon-whatsapp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2zm0 18.12c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.15.82.84-3.07-.2-.32a8.07 8.07 0 0 1-1.24-4.3c0-4.48 3.65-8.12 8.13-8.12 2.17 0 4.21.85 5.75 2.38a8.05 8.05 0 0 1 2.38 5.75c0 4.48-3.65 8.2-8.12 8.2h-.01z" />
            </svg>
          </div>
          <h3>WhatsApp</h3>
          <p className="contact-card-desc">
            Respon instan dalam hitungan menit untuk tanya ketersediaan kuota, cek jadwal kapal, dan pemesanan trip.
          </p>
          <div className="contact-card-value">+62 822-2533-6306</div>
          <a
            href="https://wa.me/6282225336306"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn-whatsapp"
          >
            Chat via WhatsApp
          </a>
        </div>

        {/* Email Card */}
        <div className="contact-card">
          <div className="contact-icon-wrapper contact-icon-email">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <h3>Email</h3>
          <p className="contact-card-desc">
            Untuk penawaran harga khusus rombongan/corporate gathering, kerja sama bisnis, atau permohonan invoice.
          </p>
          <div className="contact-card-value">liburan@karimunjawa.tours</div>
          <a
            href="mailto:liburan@karimunjawa.tours"
            className="contact-btn contact-btn-outline"
          >
            Kirim Email
          </a>
        </div>

        {/* Instagram Card */}
        <div className="contact-card">
          <div className="contact-icon-wrapper contact-icon-instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </div>
          <h3>Instagram</h3>
          <p className="contact-card-desc">
            Lihat dokumentasi harian, story seru trip wisatawan, review jujur, dan update suasana terbaru Karimunjawa.
          </p>
          <div className="contact-card-value">@karimunjawa.tours</div>
          <a
            href="https://www.instagram.com/karimunjawa.tours"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn-outline"
          >
            Buka Instagram
          </a>
        </div>
      </div>

      {/* Lokasi & Meeting Point */}
      <div className="pkg-section-label">
        📍 LOKASI &amp; TITIK KEBERANGKATAN
        <span className="line" />
      </div>

      <div className="contact-location-box">
        <div className="contact-location-grid">
          <div>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <span className="contact-info-icon">🏝️</span>
                <div>
                  <div className="contact-info-title">Operasional di Karimunjawa</div>
                  <div className="contact-info-text">
                    Kepulauan Karimunjawa, Kabupaten Jepara, Jawa Tengah. Tim lokal kami standby 24 jam untuk mendampingi trip Anda.
                  </div>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon">🚢</span>
                <div>
                  <div className="contact-info-title">Titik Kumpul Penyeberangan</div>
                  <div className="contact-info-text">
                    Pelabuhan Kartini, Jepara. Penyeberangan menggunakan kapal cepat <strong>Express Bahari</strong> (±2 jam) atau kapal feri <strong>KMP Siginjai</strong> (±5 jam).
                  </div>
                </div>
              </li>
              <li className="contact-info-item">
                <span className="contact-info-icon">🚐</span>
                <div>
                  <div className="contact-info-title">Layanan Penjemputan</div>
                  <div className="contact-info-text">
                    Seluruh peserta paket tour akan langsung dijemput oleh tour guide kami begitu tiba di Pelabuhan Karimunjawa menuju penginapan.
                  </div>
                </div>
              </li>
            </ul>

            <div style={{ marginTop: 22 }}>
              <a
                href="https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn contact-btn-outline"
                style={{ width: "auto", display: "inline-flex" }}
              >
                Buka di Google Maps →
              </a>
            </div>
          </div>

          <div className="contact-map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126839.81666675549!2d110.37059732101909!3d-5.856987178652077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e73ce64c9ca4d97%3A0x88981f9a26365a6c!2sKarimunjawa%20Tours!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              title="Peta Lokasi Karimunjawa Tours"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Jam Layanan & Fasilitas Dukungan */}
      <div className="pkg-section-label">
        ⏰ JAM LAYANAN &amp; DUKUNGAN
        <span className="line" />
      </div>

      <div className="pkg-info-box" style={{ marginBottom: 0 }}>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Layanan Chat &amp; Telepon:</strong> Setiap hari (Senin – Minggu) pukul <strong>07:00 – 21:00 WIB</strong>.
        </p>
        <p style={{ margin: 0 }}>
          Mengingat fleksibilitas perjalanan wisata, tim kami siap merespons kebutuhan mendesak dan konfirmasi tiket bahkan di luar jam kerja reguler.
        </p>
      </div>

      {/* FAQ Banner */}
      <div className="contact-faq-banner">
        <div className="contact-faq-text">
          <h3>Punya pertanyaan umum seputar tiket, DP, atau fasilitas?</h3>
          <p>
            Temukan jawaban lengkap seputar cara booking, kebijakan refund, dan persiapan trip di halaman FAQ kami.
          </p>
        </div>
        <Link href="/faq" className="contact-faq-btn">
          Lihat FAQ Lengkap →
        </Link>
      </div>
    </div>
  );
}