import { cache } from "react";
import DOMPurify from "isomorphic-dompurify";

export type Article = {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
};

type BloggerText = {
  $t?: string;
};

type BloggerLink = {
  rel?: string;
  href?: string;
};

type BloggerThumbnail = {
  url?: string;
};

type BloggerEntry = {
  id?: BloggerText;
  link?: BloggerLink[];
  date?: BloggerText;
  content?: BloggerText;
  summary?: BloggerText;
  media$thumbnail?: BloggerThumbnail;
  published?: BloggerText;
  title?: BloggerText;
};

type BloggerFeedResponse = {
  feed?: {
    entry?: BloggerEntry[];
  };
};

const BLOG_URL = "https://kjawatours.blogspot.com";
export const ARTICLES_PER_PAGE = 6;

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function slugFromLink(entry: BloggerEntry): string {
  const altLink = (entry.link || []).find((l) => l.rel === "alternate");
  const href = altLink?.href || "";
  const match = href.match(/\/([^\/]+)\.html$/);
  if (match) return match[1];
  // fallback: pakai bagian akhir dari id
  const idParts = (entry.id?.$t || "").split(".");
  return idParts[idParts.length - 1];
}

function upgradeToHttps(url: string): string {
  return url ? url.replace(/^http:\/\//i, "https://") : url;
}

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? upgradeToHttps(match[1]) : null;
}

function unwrapImageLinks(html: string): string {
  return html.replace(/<a\b[^>]*>(\s*<img[^>]*>\s*)<\/a>/gi, "$1");
}

function resizeBloggerThumb(url: string, size = 1200): string {
  if (!url) return url;
  let cleanUrl = upgradeToHttps(url);
  cleanUrl = cleanUrl.replace(/\/(s|w)\d+([^/]*)\//i, `/s${size}/`);
  return cleanUrl;
}

function mapEntry(entry: BloggerEntry): Article {
  let rawContent = entry.content?.$t || entry.summary?.$t || "";
  rawContent = rawContent.replace(/src=["']http:\/\/([^"']+)["']/gi, 'src="https://$1"');
  rawContent = unwrapImageLinks(rawContent);

  const content = DOMPurify.sanitize(rawContent, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["target", "allow", "allowfullscreen", "frameborder", "scrolling", "src", "alt", "title", "loading"],
  });
  const plainText = stripHtml(content);

  const thumb = entry.media$thumbnail?.url;
  const rawFeaturedImage = thumb ? resizeBloggerThumb(thumb) : extractFirstImage(content);
  const featuredImage = rawFeaturedImage ? upgradeToHttps(rawFeaturedImage) : null;

  return {
    id: entry.id?.$t || "",
    slug: slugFromLink(entry),
    date: entry.published?.$t || "",
    title: entry.title?.$t || "",
    excerpt: plainText.slice(0, 200),
    content,
    featuredImage,
  };
}

const FEED_PAGE_SIZE = 150; // batas aman per-request Blogger JSON feed
const FETCH_TIMEOUT_MS = 8000; // 8 detik — aman di bawah limit Vercel 10 detik (Hobby)

async function fetchFeedPage(startIndex: number, maxResults: number): Promise<BloggerEntry[]> {
  const res = await fetch(
    `${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`,
    {
      // ISR: cache 1 jam, update background setelah expire
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    }
  );
  if (!res.ok) throw new Error("Gagal fetch artikel Blogger: " + res.status);
  const data = (await res.json()) as BloggerFeedResponse;
  return data.feed?.entry || [];
}

// Ambil SEMUA post dengan loop pagination (Blogger start-index dimulai dari 1),
// bukan cuma satu batch — supaya artikel lama nggak hilang dari sitemap/generateStaticParams.
async function fetchAllEntries(): Promise<BloggerEntry[]> {
  const all: BloggerEntry[] = [];
  let startIndex = 1;

  while (true) {
    const page = await fetchFeedPage(startIndex, FEED_PAGE_SIZE);
    all.push(...page);
    if (page.length < FEED_PAGE_SIZE) break;
    startIndex += FEED_PAGE_SIZE;
  }

  return all;
}

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const entries = await fetchAllEntries();
  const articles = entries.map(mapEntry);
  // Urutkan terbaru dulu -- feed Blogger default-nya ascending (lama -> baru),
  // jadi tanpa sort ini artikel baru "terkubur" di halaman arsip paling akhir.
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getArticleArchivePage(
  page: number,
  perPage = ARTICLES_PER_PAGE
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const safePage = Math.max(1, page);
  const startIndex = (safePage - 1) * perPage + 1;
  
  // Ambil sedikit lebih banyak dari perPage untuk menentukan apakah ada halaman berikutnya
  const entries = await fetchFeedPage(startIndex, perPage + 1);
  const articles = entries.slice(0, perPage).map(mapEntry);
  const hasMore = entries.length > perPage;

  return {
    articles,
    hasMore,
  };
}

// No more getArticlePageCount as it caused server timeouts.
// Pagination now uses hasMore logic.

// React.cache() = deduplication per-request:
// generateMetadata dan page component sama-sama memanggil getArticleBySlug(slug),
// tapi Blogger hanya di-fetch SEKALI berkat cache ini.
export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  // Optimasi: Alih-alih mengambil SEMUA artikel hanya untuk mencari satu slug,
  // kita coba cari di batch pertama (paling baru).
  // Jika tidak ada, baru kita ambil semua (fallback).
  
  const firstBatch = await fetchFeedPage(1, 150);
  const articles = firstBatch.map(mapEntry);
  const found = articles.find((a) => a.slug === slug);
  
  if (found) return found;

  // Fallback jika artikel lama sekali (di luar 150 post pertama)
  const allEntries = await fetchAllEntries();
  const allArticles = allEntries.map(mapEntry);
  return allArticles.find((a) => a.slug === slug) ?? null;
});