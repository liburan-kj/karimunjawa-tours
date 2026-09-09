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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
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
