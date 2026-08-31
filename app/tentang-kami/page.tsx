import Breadcrumb from "../../components/Breadcrumb";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "../../lib/jsonld";

export const metadata = {
  title: "Tentang Kami - Karimunjawa Tours",
  description: "Karimunjawa Tours melayani wisatawan sejak 2015. Tim lokal berpengalaman siap membantu liburanmu ke Kepulauan Karimunjawa jadi lebih berkesan.",
};

export default function TentangKamiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "Tentang Kami" },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Tentang Kami" },
          ]}
        />
      </div>
    
    <div className="kjt-about-wrap">
      <div className="kjt-card">
        <div className="kjt-dot" style={{ width: 120, height: 120, background: "var(--sun)", top: -30, right: 60 }} />
        <div className="kjt-dot" style={{ width: 60, height: 60, background: "var(--palm)", top: 40, right: -10, opacity: 0.3 }} />

        <div className="kjt-content">
          <span className="kjt-eyebrow">
            <span className="kjt-dotmark" />
            Sejak 2015 &middot; Dipercaya Wisatawan Lokal &amp; Mancanegara
          </span>

          <h1 className="kjt-headline">
            Karimunjawa bukan sekadar destinasi,
            <br />
            ini <em>pengalaman</em>.
          </h1>

          <p className="kjt-body">
            Air laut sejernih kaca, pulau-pulau kecil berjajar seperti lukisan, dan senja yang bikin susah pulang — Karimunjawa Tours paham betul dari mana keajaiban Karimunjawa harus dimulai.
          </p>

          <p className="kjt-body">
            Trip bareng sahabat, snorkeling di spot rahasia, berburu kuliner khas pesisir, sampai foto-foto paling{" "}
            <em style={{ fontStyle: "normal", color: "var(--sun)", fontWeight: 600 }}>Instagramable</em> buat feed kamu — semua kami rancang biar liburanmu bukan cuma seru, tapi worth every penny.
          </p>

          <p className="kjt-body">Tim lokal kami hafal Karimunjawa luar dalam. Kamu tinggal duduk manis, sisanya kami yang urus.</p>

          <div className="kjt-stats">
            <div>
              <div className="kjt-stat-num">10+</div>
              <div className="kjt-stat-label">
                Tahun Melayani
                <br />
                Wisatawan
              </div>
            </div>
            <div>
              <div className="kjt-stat-num">1000+</div>
              <div className="kjt-stat-label">
                Wisatawan Puas
                <br />
                Domestik &amp; Manca
              </div>
            </div>
            <div>
              <div className="kjt-stat-num">6</div>
              <div className="kjt-stat-label">
                Paket Wisata
                <br />
                Pilihan
              </div>
            </div>
          </div>

          <div className="kjt-cta-row">
            <a className="kjt-btn" href="https://wa.me/6282225336306" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.13-2.9-7C17.17 3.03 14.69 2 12.04 2zm0 18.12c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.15.82.84-3.07-.2-.32a8.07 8.07 0 0 1-1.24-4.3c0-4.48 3.65-8.12 8.13-8.12 2.17 0 4.21.85 5.75 2.38a8.05 8.05 0 0 1 2.38 5.75c0 4.48-3.65 8.2-8.12 8.2h-.01z" />
              </svg>
              Chat via WhatsApp
            </a>
            <span className="kjt-phone-note">
              atau hubungi langsung <a href="tel:+6282225336306">+62 822-2533-6306</a>
            </span>
          </div>

          <div className="kjt-video-label">Lihat Keseruannya</div>
          <div className="kjt-video-frame">
            <iframe
              src="https://www.youtube.com/embed/lCo2wihP5LA"
              title="Karimunjawa Tours"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="kjt-waves">
          <svg viewBox="0 0 1000 140" preserveAspectRatio="none">
            <path d="M0,90 C150,60 300,110 500,80 C700,50 850,100 1000,70 L1000,140 L0,140 Z" fill="#0B5D73" opacity="0.55" />
            <path d="M0,110 C180,80 320,130 520,100 C720,70 880,120 1000,95 L1000,140 L0,140 Z" fill="#0E7A93" opacity="0.6" />
            <path d="M0,125 C200,105 350,140 550,118 C750,96 900,132 1000,115 L1000,140 L0,140 Z" fill="#4FD1C5" opacity="0.35" />
          </svg>
        </div>
      </div>
    </div>
    </>
  );
}