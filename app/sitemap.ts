import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/blogger";

const BASE_URL = "https://karimunjawa.tours";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/paket/2h1m-hotel`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/paket/3h2m-hotel`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/paket/4h3m-hotel`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/paket/2h1m-homestay`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/paket/3h2m-homestay`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/paket/4h3m-homestay`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tentang-kami`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/galeri`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE_URL}/artikel`, changeFrequency: "weekly", priority: 0.7 },
  ];

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await getAllArticles();
    articlePages = articles.map((a) => ({
      url: `${BASE_URL}/artikel/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // kalau fetch Blogger gagal, sitemap tetap jalan tanpa artikel
  }

  return [...staticPages, ...articlePages];
}