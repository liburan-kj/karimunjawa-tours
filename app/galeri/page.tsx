import Breadcrumb from "../../components/Breadcrumb";
import { getInstagramFeed } from "../../lib/instagramFeed";

export const metadata = {
  title: "Galeri - Karimunjawa Tours",
  description: "Lihat momen-momen seru dari perjalanan wisatawan Karimunjawa Tours di Kepulauan Karimunjawa.",
};

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

export default async function GaleriPage() {
  const { profile, posts } = await getInstagramFeed();

  return (
    <div style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px" }}>
      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Galeri" },
        ]}
      />

      {/* Profil Instagram */}
      <div className="ig-profile-card">
        <div className="ig-avatar-wrap">
          <img className="ig-avatar" src={profile.profilePictureUrl} alt="Logo Karimunjawa Tours" />
        </div>
        <div className="ig-info">
          <div className="ig-username-row">
            <h2 className="ig-username">karimunjawa.tours</h2>
            <a className="ig-follow-btn" href="https://www.instagram.com/karimunjawa.tours" target="_blank" rel="noopener">
              Ikuti
            </a>
          </div>
          <div className="ig-stats">
            <span className="ig-stat">
              <strong>{formatCount(profile.followersCount)}</strong> pengikut
            </span>
            <span className="ig-stat">
              <strong>{formatCount(profile.followsCount)}</strong> diikuti
            </span>
          </div>
          <div className="ig-bio">
            {profile.biography}
            <br />
            <a href="https://www.instagram.com/karimunjawa.tours" target="_blank" rel="noopener">
              instagram.com/karimunjawa.tours
            </a>
          </div>
        </div>
      </div>

      {/* Grid Foto/Video */}
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>Belum ada foto yang bisa ditampilkan.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener"
              style={{
                display: "block",
                aspectRatio: "1 / 1",
                borderRadius: 12,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={post.thumbUrl}
                alt={post.caption.slice(0, 80) || "Karimunjawa Tours"}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {(post.mediaType === "VIDEO" || post.isReel) && (
                <span
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                  }}
                >
                  ▶
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}