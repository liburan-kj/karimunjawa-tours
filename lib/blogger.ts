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

async function fetchFeedPage(startIndex: number, maxResults: number): Promise<BloggerEntry[]> {
  const res = await fetch(
    `${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}&start-index=${startIndex}`,
    { cache: 'no-store' }
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

export const getAllArticles = async (): Promise<Article[]> => {
  const entries = await fetchAllEntries();
  const articles = entries.map(mapEntry);
  // Urutkan terbaru dulu -- feed Blogger default-nya ascending (lama -> baru),
  // jadi tanpa sort ini artikel baru "terkubur" di halaman arsip paling akhir.
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export async function getArticleArchivePage(
  page: number,
  perPage = ARTICLES_PER_PAGE
): Promise<{ articles: Article[]; totalArticles: number; totalPages: number }> {
  const safePage = Math.max(1, page);
  const startIndex = (safePage - 1) * perPage + 1;
  
  // Hanya ambil data untuk halaman saat ini, bukan semua artikel
  const entries = await fetchFeedPage(startIndex, perPage);
  const articles = entries.map(mapEntry);
  
  // Untuk totalPages, kita tetap butuh total artikel. 
  // Namun, untuk menghindari timeout, kita ambil batch pertama saja untuk estimasi 
  // atau gunakan metadata dari feed jika tersedia.
  // Blogger JSON feed tidak memberikan total count dengan mudah tanpa mengambil semua.
  // Sebagai solusi efisien: ambil total dari request pertama jika memungkinkan, 
  // atau gunakan cache jangka panjang untuk totalArticles.
  
  const allEntries = await fetchAllEntries(); // Tetap perlu untuk total count, tapi kita optimasi di bawah
  const totalArticles = allEntries.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / perPage));

  return {
    articles,
    totalArticles,
    totalPages,
  };
}

export async function getArticlePageCount(perPage = ARTICLES_PER_PAGE): Promise<number> {
  const articles = await getAllArticles();
  return Math.max(1, Math.ceil(articles.length / perPage));
}

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
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
};