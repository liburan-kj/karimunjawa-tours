import Link from "next/link";
import { getAllArticles } from "../../lib/blogger";

export const metadata = {
  title: "Artikel - Karimunjawa Tours",
  description: "Tips, panduan, dan cerita seputar liburan ke Karimunjawa dari tim Karimunjawa Tours.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelPage() {
  const articles = await getAllArticles();

  return (
    <section className="pages-grid-section">
      <h1 className="pages-grid-title">
        Artikel Karimunjawa Tours
      </h1>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>Belum ada artikel.</p>
      ) : (
        <div className="pages-grid">
          {articles.map((article) => (
            <div className="page-card" key={article.id}>
              <div className="page-card-body">
                <h3 className="page-card-title">
                  <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="page-card-desc">{article.excerpt.slice(0, 140)}...</p>
                <div className="page-card-footer">
                  
                  <Link className="page-card-link" href={`/artikel/${article.slug}`}>
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}