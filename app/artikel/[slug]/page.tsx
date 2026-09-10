import { getArticleBySlug, getAllArticles } from "../../../lib/blogger";
import { notFound } from "next/navigation";
import Breadcrumb from "../../../components/Breadcrumb";
import { generateBreadcrumbSchema } from "../../../lib/jsonld";

export const revalidate = 3600; // ISR: regenerasi halaman maksimal 1x per jam

// Pre-render 150 artikel terbaru saat build → SSG, tidak timeout di Vercel
export async function generateStaticParams() {
  try {
    const articles = await getAllArticles();
    return articles.slice(0, 150).map((a) => ({ slug: a.slug }));
  } catch {
    // Jika Blogger tidak bisa diakses saat build, skip static generation
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} - Karimunjawa Tours`,
    description: article.excerpt.slice(0, 160),
    alternates: {
      canonical: `https://karimunjawa.tours/artikel/${article.slug}`,
    },
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

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "Artikel", href: "/artikel" },
    { label: article.title },
  ]);

  return (
    <article style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumb
        items={[
          { label: "Beranda", href: "/" },
          { label: "Artikel", href: "/artikel" },
          { label: article.title },
        ]}
      />

      <h1 style={{ color: "#023e8a", fontSize: 32, fontWeight: 700, marginBottom: 24, lineHeight: 1.3 }}>
        {article.title}
      </h1>

      <div className="article-body" dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}