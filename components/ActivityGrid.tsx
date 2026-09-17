import Link from "next/link";
import Image from "next/image";
import { getActivities, type ActivityItem } from "../lib/firestore-service";

export default async function ActivityGrid() {
  let loadedActivities: ActivityItem[] = [];
  try {
    loadedActivities = await getActivities();
  } catch (err) {
    console.warn("Failed to load activities from firestore:", err);
  }

  const activeActivities = loadedActivities.filter((a) => a.isActive !== false);

  return (
    <section className="activity-grid-section" id="aktivitas">
      <h2 className="pages-grid-title">
        <span className="pages-grid-subtitle">JELAJAHI</span>
        Aktivitas Seru di Karimunjawa
      </h2>
      <div className="activity-grid">
        {activeActivities.map((act) => (
          <div className="activity-card" key={act.slug}>
            <Link className="activity-card-image-wrap" href={`/aktivitas/${act.slug}`}>
              <Image
                className="activity-card-img"
                alt={act.title}
                src={act.img || "/images/satu.png"}
                width={1280}
                height={720}
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 400px"
                quality={85}
              />
              <div className="page-card-badge">
                <span className="badge-text">{act.priceLabel}</span>
              </div>
            </Link>
            <div className="activity-card-body">
              <span className="activity-card-category">AKTIVITAS</span>
              <h3 className="activity-card-title">
                <Link href={`/aktivitas/${act.slug}`}>{act.title}</Link>
              </h3>
              <p className="activity-card-desc">{act.desc}</p>
              <div className="activity-card-footer">
                <Link className="activity-card-link" href={`/aktivitas/${act.slug}`}>
                  Lihat Detail →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}