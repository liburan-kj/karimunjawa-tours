import Link from "next/link";

type Package = {
  slug: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  img: string;
};

const packages: Package[] = [
  { slug: "2h1m-hotel", title: "2 Hari 1 Malam Hotel", duration: "2 Hari 1 Malam", price: "Mulai 1280K",
    desc: "Perjalanan seru, fasilitas lengkap, serta istirahat nyaman di hotel pilihan. Cocok untuk kamu yang ingin melepas penat dengan liburan singkat namun berkesan.",
    img: "/images/2h1mhotel.webp" },
  { slug: "3h2m-hotel", title: "3 Hari 2 Malam Hotel", duration: "3 Hari 2 Malam", price: "Mulai 1770K",
    desc: "Menikmati aktivitas seru, dan tetap beristirahat nyaman di hotel pilihan. Cocok untuk liburan santai dengan jadwal fleksibel.",
    img: "/images/3h2mhotel.webp" },
  { slug: "4h3m-hotel", title: "4 Hari 3 Malam Hotel", duration: "4 Hari 3 Malam", price: "Mulai 2270K",
    desc: "Cocok untuk kamu yang ingin liburan santai sekaligus mendalam, dengan waktu cukup untuk merasakan semua keindahan dan keseruan perjalanan.",
    img: "/images/4h3mhotel.webp" },
  { slug: "2h1m-homestay", title: "2 Hari 1 Malam Homestay", duration: "2 Hari 1 Malam", price: "Mulai 610K",
    desc: "Pengalaman hangat dan ramah. Dengan fasilitas sederhana namun nyaman, liburanmu tetap berkesan dan penuh cerita.",
    img: "/images/2h1mhomestay.webp" },
  { slug: "3h2m-homestay", title: "3 Hari 2 Malam Homestay", duration: "3 Hari 2 Malam", price: "Mulai 920K",
    desc: "Menikmati suasana ramah khas warga lokal, sekaligus menjelajahi destinasi dengan waktu lebih leluasa.",
    img: "/images/3h2mhomestay.webp" },
  { slug: "4h3m-homestay", title: "4 Hari 3 Malam Homestay", duration: "4 Hari 3 Malam", price: "Mulai 1180K",
    desc: "Merasakan keramahan warga lokal, menikmati aktivitas wisata lebih lengkap, dan beristirahat nyaman dalam suasana akrab.",
    img: "/images/4h3mhomestay.webp" },
];

export default function PackageGrid() {
  return (
    <section className="pages-grid-section" id="paket-wisata">
      <h2 className="pages-grid-title">
        <span className="pages-grid-subtitle">REKOMENDASI</span>
        Paket Wisata Terpopuler
      </h2>
      <div className="pages-grid">
        {packages.map((pkg) => (
          <div className="page-card" key={pkg.slug}>
            <Link className="page-card-image-wrap" href={`/paket/${pkg.slug}`}>
              <img className="page-card-img" loading="lazy" alt={pkg.title} src={pkg.img} />
              <div className="page-card-badge"><span className="badge-text">{pkg.price}</span></div>
            </Link>
            <div className="page-card-body">
              <span className="page-card-category">PAKET WISATA</span>
              <h3 className="page-card-title"><Link href={`/paket/${pkg.slug}`}>{pkg.title}</Link></h3>
              <p className="page-card-desc">{pkg.desc}</p>
              <div className="page-card-footer">
                <span className="page-card-meta">🗓️ {pkg.duration}</span>
                <Link className="page-card-link" href={`/paket/${pkg.slug}`}>Lihat Detail →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}