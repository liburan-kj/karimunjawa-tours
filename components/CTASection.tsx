import { Icon } from "@iconify/react";

export default function CTASection() {
  return (
    <div className="cta-container">
      <section className="cta-section">
        <div className="cta-text">
          <h2>Siap Memulai Petualanganmu?</h2>
          <p>Konsultasikan rencana liburanmu gratis bersama tim kami sekarang.</p>
        </div>
        <div className="cta-action">
          <a className="btn-cta-whatsapp" href="https://wa.me/+6282225336306" target="_blank" rel="noopener">
            <Icon icon="lucide:message-circle" />
            Konsultasi Gratis
          </a>
          <a className="btn-cta-outline" href="/kontak">
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  );
}
