import Breadcrumb from "../../components/Breadcrumb";
import ArticleArchive from "../../components/ArticleArchive";
import { ARTICLES_PER_PAGE, getArticleArchivePage } from "../../lib/blogger";
import { generateBreadcrumbSchema } from "../../lib/jsonld";

export const metadata = {
  title: "Artikel - Karimunjawa Tours",
  description: "Tips, panduan, dan cerita seputar liburan ke Karimunjawa dari tim Karimunjawa Tours.",
};

export default async function ArtikelPage() {
  const { articles, totalPages } = await getArticleArchivePage(1, ARTICLES_PER_PAGE);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "Artikel" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div style={{ margin: "0 auto", maxWidth: 860, padding: "0 20px" }}>
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Artikel" },
          ]}
        />
      </div>
      <ArticleArchive articles={articles} currentPage={1} totalPages={totalPages} />
    </>
  );
}
