import { notFound } from "next/navigation";
import ArticleArchive from "../../../../components/ArticleArchive";
import {
  ARTICLES_PER_PAGE,
  getFirestoreArticleArchivePage,
  getArticles,
} from "../../../../lib/firestore-service";

export const revalidate = 7200; // ISR: regenerasi halaman maksimal 1x per 2 jam

export async function generateStaticParams() {
  try {
    const all = await getArticles(false);
    const totalPages = Math.ceil(all.length / ARTICLES_PER_PAGE);
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      page: String(index + 2),
    }));
  } catch {
    return [];
  }
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

  const { articles, hasMore } = await getFirestoreArticleArchivePage(pageNumber, ARTICLES_PER_PAGE);

  if (articles.length === 0) {
    notFound();
  }

  return <ArticleArchive articles={articles} currentPage={pageNumber} hasMore={hasMore} />;
}
