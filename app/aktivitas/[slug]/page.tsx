import { notFound } from "next/navigation";

type Activity = {
  slug: string;
  title: string;
  label: string;
  desc: string;
};

const activities: Record<string, Activity> = {
  "one-day-trip": {
    slug: "one-day-trip",
    title: "One Day Trip Karimunjawa",
    label: "🏝️ AKTIVITAS KARIMUNJAWA",
    desc: "Detail lengkap aktivitas One Day Trip segera hadir. Untuk info harga dan jadwal, silakan hubungi tim kami langsung.",
  },
  "diving-trip": {
    slug: "diving-trip",
    title: "Diving Trip Karimunjawa",
    label: "🤿 AKTIVITAS KARIMUNJAWA",
    desc: "Detail lengkap aktivitas Diving Trip segera hadir. Untuk info harga dan jadwal, silakan hubungi tim kami langsung.",
  },
  "sewa-motor": {
    slug: "sewa-motor",
    title: "Sewa Motor Karimunjawa",
    label: "🛵 AKTIVITAS KARIMUNJAWA",
    desc: "Detail lengkap aktivitas Sewa Motor segera hadir. Untuk info harga dan jadwal, silakan hubungi tim kami langsung.",
  },
};

export async function generateStaticParams() {
  return Object.keys(activities).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activities[slug];
  if (!activity) return {};
  return {
    title: `${activity.title} - Karimunjawa Tours`,
    description: activity.desc,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const activity = activities[slug];
  if (!activity) notFound();

  return (
    <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
      <div className="pkg-hero">
        <div className="pkg-hero-label">{activity.label}</div>
        <h1>{activity.title}</h1>
      </div>

      <div className="pkg-desc">
        <p>{activity.desc}</p>
      </div>

      <div style={{ textAlign: "center", margin: "40px 0" }}>
        <a
          className="btn-cta-whatsapp"
          href="https://wa.me/+6282225336306"
          target="_blank"
          rel="noopener"
        >
          Tanya Detail via WhatsApp
        </a>
      </div>
    </div>
  );
}