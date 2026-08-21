import "../styles/why-travel-with-us.css";
import Hero from "../components/Hero";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PackageGrid from "../components/PackageGrid";
import ActivityGrid from "../components/ActivityGrid";
import Reviews from "../components/Reviews";
import CTASection from "../components/CTASection";

export default async function Home() {
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
      <WhyTravelWithUs />
      <Reviews />
      <CTASection />
    </>
  );
}