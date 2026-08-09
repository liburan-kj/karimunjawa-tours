export type Article = {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
};

const BLOG_URL = "https://kjawatours.blogspot.com";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function slugFromLink(entry: any): string {
  const altLink = (entry.link || []).find((l: any) => l.rel === "alternate");
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

function mapEntry(entry: any): Article {
  const rawContent = entry.content?.$t || entry.summary?.$t || "";
  const content = unwrapImageLinks(rawContent);
  const plainText = stripHtml(content);

  const thumb = entry.media$thumbnail?.url;
  const featuredImage = thumb
    ? resizeBloggerThumb(thumb)
    : extractFirstImage(content);

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

async function fetchFeed(maxResults = 50): Promise<any[]> {
  const res = await fetch(
    `${BLOG_URL}/feeds/posts/default?alt=json&max-results=${maxResults}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Gagal fetch artikel Blogger: " + res.status);
  const data = await res.json();
  return data.feed?.entry || [];
}

export async function getAllArticles(): Promise<Article[]> {
  const entries = await fetchFeed(50);
  return entries.map(mapEntry);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const entries = await fetchFeed(50);
  const found = entries.find((e) => slugFromLink(e) === slug);
  return found ? mapEntry(found) : null;
}