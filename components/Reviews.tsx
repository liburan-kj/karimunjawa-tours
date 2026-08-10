import { getReviews } from "../lib/reviews";
import ReviewsCarousel from "./ReviewsCarousel";

export default async function Reviews() {
  const { reviews } = await getReviews();

  return (
    <section style={{ maxWidth: 1200, margin: "60px auto 0", padding: "0 20px" }}>
      <ReviewsCarousel reviews={reviews} />
    </section>
  );
}