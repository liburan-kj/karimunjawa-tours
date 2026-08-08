import { getArticleBySlug, getAllArticles } from "../../../lib/blogger";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} - Karimunjawa Tours`,
    description: article.excerpt.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.excerpt.slice(0, 160),
      images: article.featuredImage ? [article.featuredImage] : [],
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ color: "#888", fontSize: 14, marginBottom: 10 }}>📅 {formatDate(article.date)}</p>

      <h1 style={{ color: "#023e8a", fontSize: 32, fontWeight: 700, marginBottom: 24, lineHeight: 1.3 }}>
        {article.title}
      </h1>

      

      <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}