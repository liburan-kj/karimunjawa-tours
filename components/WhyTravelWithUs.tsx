const points = [
  {
    title: "Armada Resmi & Aman",
    desc: "Berangkat dari Pelabuhan Kartini, Jepara dengan kapal cepat (Express Bahari) atau KMP Siginjai sesuai pilihanmu.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2m0 5.189V13m7-1V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
        <path d="M19.38 19A11.6 11.6 0 0 0 21 13l-8.188-3.639a2 2 0 0 0-1.624 0L3 13.001a11.6 11.6 0 0 0 2.81 7.76" />
        <path d="M2 20c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1" />
      </svg>
    ),
  },
  {
    title: "Alat Snorkeling Disediakan",
    desc: "Fin, masker, dan life jacket sudah termasuk di setiap paket — tinggal berangkat dan nikmati lautnya.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h12a1 1 0 0 1 1 1v4.5a2.5 2.5 0 0 1-2.5 2.5H14a2 2 0 0 1-2-2a2 2 0 1 0-4 0a2 2 0 0 1-2 2h-.5A2.5 2.5 0 0 1 3 12.5V8a1 1 0 0 1 1-1" />
        <path d="M10 17a2 2 0 0 0 2 2h3.5a5.5 5.5 0 0 0 5.5-5.5V4" />
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
        {points.map((p) => (
          <div className="why-item" key={p.title}>
            <div className="why-icon">{p.icon}</div>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
