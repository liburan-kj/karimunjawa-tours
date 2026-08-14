import Hero from "../components/Hero";
import PackageGrid from "../components/PackageGrid";
import ActivityGrid from "../components/ActivityGrid";
import Reviews from "../components/Reviews";
import CTASection from "../components/CTASection";
import { getReviews } from "../lib/reviews";

export default async function Home() {
  const { reviews, averageRating, reviewCount } = await getReviews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Karimunjawa Tours",
    url: "https://karimunjawa.tours",
    image: "https://karimunjawa.tours/images/satu.jpg",
    telephone: "+62-822-2533-6306",
    email: "liburan@karimunjawa.tours",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karimunjawa, Jepara",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating,
      reviewCount: reviewCount,
    },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      datePublished: r.publishedAt,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <PackageGrid />
      <ActivityGrid />
      <Reviews />
      <CTASection />
    </>
  );
}