import Link from "next/link";
import Image from "next/image";

type Activity = {
  slug: string;
  title: string;
  desc: string;
  img: string;
  priceLabel: string;
};

const activities: Activity[] = [
  {
    slug: "one-day-trip",
    title: "One Day Trip",
    desc: "Jelajahi pulau-pulau kecil di sekitar Karimunjawa dengan kapal, mampir ke spot snorkeling dan pantai-pantai tersembunyi.",
    img: "/images/island-hopping.png",
    priceLabel: "Mulai 200K",
  },
  {
    slug: "diving-trip",
    title: "Diving Trip",
    desc: "Trip menyelam ke spot-spot terbaik Karimunjawa, cocok untuk pemula maupun diver berpengalaman.",
    img: "/images/scuba-diving.jpg",
    priceLabel: "Mulai 1.100K",
  },
  {
    slug: "sewa-motor",
    title: "Sewa Motor",
    desc: "Sewa motor harian buat eksplorasi Karimunjawa dengan bebas sesuai jadwalmu sendiri.",
    img: "/images/sewa-motor.jpg",
    priceLabel: "Mulai 75K",
  },
];

export default function ActivityGrid() {
  return (
    <section className="activity-grid-section" id="aktivitas">
      <h2 className="pages-grid-title">
        <span className="pages-grid-subtitle">JELAJAHI</span>
        Aktivitas Seru di Karimunjawa
      </h2>
      <div className="activity-grid">
        {activities.map((act) => (
          <div className="activity-card" key={act.slug}>
            <Link className="activity-card-image-wrap" href={`/aktivitas/${act.slug}`}>
              <Image 
                className="activity-card-img" 
                alt={act.title} 
                src={act.img} 
                width={400} 
                height={300}
              />
              <div className="page-card-badge">
                <span className="badge-text">{act.priceLabel}</span>
              </div>
            </Link>
            <div className="activity-card-body">
              <span className="activity-card-category">AKTIVITAS</span>
              <h3 className="activity-card-title"><Link href={`/aktivitas/${act.slug}`}>{act.title}</Link></h3>
              <p className="activity-card-desc">{act.desc}</p>
              <div className="activity-card-footer">
                <Link className="activity-card-link" href={`/aktivitas/${act.slug}`}>Lihat Detail →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}