const points = [
  {
    title: "Armada Resmi & Aman",
    desc: "Berangkat dari Pelabuhan Kartini, Jepara dengan kapal cepat (Express Bahari) atau KMP Siginjai sesuai pilihanmu.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 17h18l-2 4H5l-2-4Z" strokeLinejoin="round" />
        <path d="M5 17V9l7-4 7 4v8" strokeLinejoin="round" />
        <path d="M9 17V11h6v6" />
      </svg>
    ),
  },
  {
    title: "Alat Snorkeling Disediakan",
    desc: "Fin, masker, dan life jacket sudah termasuk di setiap paket — tinggal berangkat dan nikmati lautnya.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="9" r="5" />
        <path d="M9 9h6M7 14c0 3 2 6 5 6s5-3 5-6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Guide & Kru Lokal Berpengalaman",
    desc: "Dipandu warga asli Karimunjawa yang paham betul spot terbaik dan cerita di baliknya.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Booking Fleksibel & Transparan",
    desc: "DP ringan, sistem pembayaran jelas dari awal, tanpa biaya tersembunyi di akhir.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 14h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="why-section">
      <div className="why-eyebrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        Kenapa Karimunjawa Tours
      </div>
      <h2 className="why-heading">Liburan Tenang, Kami yang Urus Detailnya</h2>

      <div className="why-grid">
        <div className="why-media">
          <img src="/images/stand.jpg" alt="Suasana pantai Karimunjawa" />
        </div>

        <div className="why-list">
          {points.map((p) => (
            <div className="why-item" key={p.title}>
              <div className="why-icon">{p.icon}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}