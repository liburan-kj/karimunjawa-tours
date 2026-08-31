export type Article = {
  id: number;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
};

const WP_BASE_URL = "https://karimunjawa.ct.ws";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

// Minimal shape of a raw WordPress REST API post — only the fields
// this file actually reads.
type RawWordPressPost = {
  id: number;
  slug: string;
  date: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
  };
};

function mapPost(p: RawWordPressPost): Article {
  const featuredImage =
    p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
    title: stripHtml(p.title?.rendered || ""),
    excerpt: stripHtml(p.excerpt?.rendered || ""),
    content: p.content?.rendered || "",
    featuredImage,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const res = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/posts?_embed&per_page=50`, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) throw new Error("Gagal fetch artikel WordPress: " + res.status);
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error("Response bukan JSON, kemungkinan diblokir hosting: " + text.slice(0, 200));
  }
  const data = await res.json();
  return data.map(mapPost);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const res = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/posts?_embed&slug=${slug}`, {
    next: { revalidate: 3600 },
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) throw new Error("Gagal fetch artikel WordPress: " + res.status);
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error("Response bukan JSON, kemungkinan diblokir hosting: " + text.slice(0, 200));
  }
  const data = await res.json();
  if (!data.length) return null;
  return mapPost(data[0]);
}