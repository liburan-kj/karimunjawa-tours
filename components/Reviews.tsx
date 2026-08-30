import { getReviews } from "../lib/reviews";
import ReviewsCarousel from "./ReviewsCarousel";

export default async function Reviews() {
  const { reviews, averageRating, reviewCount } = await getReviews();

  if (reviews.length === 0) return null;

  return (
    <section style={{ maxWidth: 1200, margin: "90px auto 0", padding: "0 20px" }}>
      <div className="pages-grid-title" style={{ marginBottom: 32 }}>
        <span className="pages-grid-subtitle">TESTIMONI</span>
        Cerita dari Para Penjelajah
      </div>
      {reviewCount > 0 && (
        <p style={{ textAlign: "center", color: "var(--text-light)", marginBottom: 32, fontSize: 14 }}>
          ⭐ {averageRating.toFixed(1)} rata-rata dari {reviewCount.toLocaleString("id-ID")} ulasan Google
        </p>
      )}
      <ReviewsCarousel reviews={reviews} />
    </section>
  );
}
