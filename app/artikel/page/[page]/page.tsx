import { notFound } from "next/navigation";
import ArticleArchive from "../../../../components/ArticleArchive";
import {
  ARTICLES_PER_PAGE,
  getArticleArchivePage,
  getArticlePageCount,
} from "../../../../lib/blogger";

export async function generateStaticParams() {
  const totalPages = await getArticlePageCount(ARTICLES_PER_PAGE);

  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
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

  const totalPages = await getArticlePageCount(ARTICLES_PER_PAGE);
  if (pageNumber > totalPages) {
    notFound();
  }

  const { articles } = await getArticleArchivePage(pageNumber, ARTICLES_PER_PAGE);

  return <ArticleArchive articles={articles} currentPage={pageNumber} totalPages={totalPages} />;
}
