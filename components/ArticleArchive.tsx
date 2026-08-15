import Link from "next/link";
import type { Article } from "../lib/blogger";

type ArticleArchiveProps = {
  articles: Article[];
  currentPage: number;
  totalPages: number;
};

function getPageHref(page: number): string {
  return page <= 1 ? "/artikel" : `/artikel/page/${page}`;
}

export default function ArticleArchive({ articles, currentPage, totalPages }: ArticleArchiveProps) {
  return (
    <section className="pages-grid-section">
      <h1 className="pages-grid-title">Artikel Karimunjawa Tours</h1>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>Belum ada artikel.</p>
      ) : (
        <>
          <div className="pages-grid">
            {articles.map((article) => (
              <article className="page-card" key={article.id}>
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
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="article-pagination" aria-label="Pagination artikel">
              {currentPage > 1 ? (
                <Link className="article-pagination-link" href={getPageHref(currentPage - 1)}>
                  ← Sebelumnya
                </Link>
              ) : (
                <span className="article-pagination-link article-pagination-link-disabled" aria-hidden="true">
                  ← Sebelumnya
                </span>
              )}

              <div className="article-pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  if (page === currentPage) {
                    return (
                      <span
                        key={page}
                        className="article-pagination-page is-active"
                        aria-current="page"
                      >
                        {page}
                      </span>
                    );
                  }

                  return (
                    <Link key={page} className="article-pagination-page" href={getPageHref(page)}>
                      {page}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages ? (
                <Link className="article-pagination-link" href={getPageHref(currentPage + 1)}>
                  Berikutnya →
                </Link>
              ) : (
                <span className="article-pagination-link article-pagination-link-disabled" aria-hidden="true">
                  Berikutnya →
                </span>
              )}
            </nav>
          )}
        </>
      )}
    </section>
  );
}
