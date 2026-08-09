import Hero from "../components/Hero";
import PackageGrid from "../components/PackageGrid";
import CTASection from "../components/CTASection";

export default function Home() {
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
      <CTASection />
    </>
  );
}