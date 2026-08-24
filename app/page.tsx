import type { Metadata } from "next";
import "../styles/why-travel-with-us.css";
import Hero from "../components/Hero";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PackageGrid from "../components/PackageGrid";
import ActivityGrid from "../components/ActivityGrid";
import Reviews from "../components/Reviews";
import CTASection from "../components/CTASection";

export const metadata: Metadata = {
  title: "Karimunjawa Tours | Paket Wisata Karimunjawa Terpercaya",
  description:
    "Paket tour Karimunjawa 2H1M, 3H2M, 4H3M — hotel & homestay. Snorkeling, penyeberangan Pelabuhan Kartini Jepara, sejak 2015.",
  alternates: {
    canonical: "https://karimunjawa.tours",
  },
  openGraph: {
    type: "website",
    url: "https://karimunjawa.tours",
    title: "Karimunjawa Tours | Paket Wisata Karimunjawa Terpercaya",
    description:
      "Paket tour Karimunjawa 2H1M, 3H2M, 4H3M — hotel & homestay. Snorkeling, penyeberangan Pelabuhan Kartini Jepara, sejak 2015.",
    images: [
      {
        url: "https://karimunjawa.tours/images/satu.jpg",
        width: 1200,
        height: 630,
        alt: "Karimunjawa Tours",
      },
    ],
    siteName: "Karimunjawa Tours",
    locale: "id_ID",
  },
};

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "Organization"],
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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-822-2533-6306",
      email: "liburan@karimunjawa.tours",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [
      "https://www.instagram.com/karimunjawa.tours",
      "https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5",
    ],
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