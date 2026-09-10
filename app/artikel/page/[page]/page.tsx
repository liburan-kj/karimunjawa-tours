import { notFound } from "next/navigation";
import ArticleArchive from "../../../components/ArticleArchive";
import {
  ARTICLES_PER_PAGE,
  getArticleArchivePage,
} from "../../../lib/blogger";

export async function generateStaticParams() {
  // We no longer use getArticlePageCount to avoid timeouts.
  // We generate a reasonable number of static pages (e.g., 10)
  // The rest will be generated on-demand.
  return Array.from({ length: 9 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  if (!/^\d+$/.test(page)) {
    return {};
  }

  const pageNumber = Number(page);

  if (pageNumber < 2) {
    return {};
  }

  return {
    title: `Artikel - Halaman ${pageNumber} | Karimunjawa Tours`,
    description: `Kumpulan artikel Karimunjawa Tours - halaman ${pageNumber}.`,
  };
}

export default async function ArtikelPaginationPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;

  if (!/^\d+$/.test(page)) {
    notFound();
  }

  const pageNumber = Number(page);

  if (pageNumber < 2) {
    notFound();
  }

  const { articles, hasMore } = await getArticleArchivePage(pageNumber, ARTICLES_PER_PAGE);

  return <ArticleArchive articles={articles} currentPage={pageNumber} hasMore={hasMore} />;
}
