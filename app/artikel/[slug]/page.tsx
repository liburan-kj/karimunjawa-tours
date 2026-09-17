import { getArticleByIdOrSlug, getArticles } from "../../../lib/firestore-service";
import { notFound } from "next/navigation";
import Breadcrumb from "../../../components/Breadcrumb";
import { generateBreadcrumbSchema, generateArticleSchema } from "../../../lib/jsonld";

export const revalidate = 7200; // ISR: regenerasi halaman maksimal 1x per 2 jam

// Pre-render seluruh artikel Firestore saat build
export async function generateStaticParams() {
  try {
    const articles = await getArticles(false);
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleByIdOrSlug(slug);
  if (!article || article.status !== "published") return {};

  const description = article.excerpt?.slice(0, 160) || "";
  const imageUrl = article.featuredImage
    ? article.featuredImage.startsWith("http")
      ? article.featuredImage
      : `https://karimunjawa.tours${article.featuredImage}`
    : undefined;

  return {
    title: `${article.title} - Karimunjawa Tours`,
    description,
    alternates: {
      canonical: `https://karimunjawa.tours/artikel/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt || article.date,
      authors: ["Karimunjawa Tours"],
      images: imageUrl ? [{ url: imageUrl, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleByIdOrSlug(slug);
  if (!article || article.status !== "published") notFound();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Beranda", href: "/" },
    { label: "Artikel", href: "/artikel" },
    { label: article.title },
  ]);

  const articleSchema = generateArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    slug: article.slug,
    featuredImage: article.featuredImage,
    date: article.date,
    updatedAt: article.updatedAt,
  });

  return (
    <article style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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