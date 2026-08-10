export type Review = {
  id: string;
  authorName: string;
  avatarUrl: string | null;
  text: string;
  rating: number;
  publishedAt: string;
};

export type ReviewsData = {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  writeReviewUrl: string;
};

const WIDGET_URL =
  "https://featurable.com/api/v2/widgets/9f38c68b-e1ab-4a2d-bc3e-7d11cf8ab0cb";

export async function getReviews(): Promise<ReviewsData> {
  const res = await fetch(WIDGET_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Gagal fetch reviews: " + res.status);
  const data = await res.json();

  const reviews: Review[] = (data.widget?.reviews || []).map((r: any) => ({
    id: r.id,
    authorName: r.author?.name || "Anonim",
    avatarUrl: r.author?.avatarUrl || null,
    text: r.originalText || r.text || "",
    rating: r.rating?.value || 5,
    publishedAt: r.publishedAt,
  }));

  return {
    reviews,
    averageRating: data.widget?.gbpLocationSummary?.rating || 5,
    reviewCount: data.widget?.gbpLocationSummary?.reviewsCount || reviews.length,
    writeReviewUrl: data.widget?.gbpLocationSummary?.writeAReviewUri || "#",
  };
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Hari ini";
  if (diffDays < 30) return `${diffDays} hari lalu`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} bulan lalu`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} tahun lalu`;
}