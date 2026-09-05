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

function extractFirstImage(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function unwrapImageLinks(html: string): string {
  return html.replace(/<a\b[^>]*>(\s*<img[^>]*>\s*)<\/a>/gi, "$1");
}

function resizeBloggerThumb(url: string, size = 1200): string {
  return url.replace(/\/s\d+(-c)?\//, `/s${size}/`);
}

function mapEntry(entry: BloggerEntry): Article {
  const rawContent = entry.content?.$t || entry.summary?.$t || "";
  const content = DOMPurify.sanitize(unwrapImageLinks(rawContent));
  const plainText = stripHtml(content);

  const thumb = entry.media$thumbnail?.url;
  const featuredImage = thumb ? resizeBloggerThumb(thumb) : extractFirstImage(content);

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

async function fetchFeed(maxResults = 50): Promise<BloggerEntry[]> {
  const res = await fetch(`${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Gagal fetch artikel Blogger: " + res.status);
  const data = (await res.json()) as BloggerFeedResponse;
  return data.feed?.entry || [];
}

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const entries = await fetchFeed(50);
  return entries.map(mapEntry);
});

export async function getArticleArchivePage(
  page: number,
  perPage = ARTICLES_PER_PAGE
): Promise<{ articles: Article[]; totalArticles: number; totalPages: number }> {
  const articles = await getAllArticles();
  const totalArticles = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / perPage));
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * perPage;

  return {
    articles: articles.slice(start, start + perPage),
    totalArticles,
    totalPages,
  };
}

export async function getArticlePageCount(perPage = ARTICLES_PER_PAGE): Promise<number> {
  const articles = await getAllArticles();
  return Math.max(1, Math.ceil(articles.length / perPage));
}

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const entries = await fetchFeed(50);
  const found = entries.find((e) => slugFromLink(e) === slug);
  return found ? mapEntry(found) : null;
});
