import type { Metadata } from "next";
import "../styles/why-travel-with-us.css";
import Hero from "../components/Hero";
import WhyTravelWithUs from "../components/WhyTravelWithUs";
import PackageGrid from "../components/PackageGrid";
import ActivityGrid from "../components/ActivityGrid";
import Reviews from "../components/Reviews";
import CTASection from "../components/CTASection";
import HomeBookingWidget from "../components/HomeBookingWidget";
import { getReviews } from "../lib/reviews";

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
  let reviewsData;
  try {
    reviewsData = await getReviews();
  } catch {
    reviewsData = { reviews: [], averageRating: 5, reviewCount: 0, writeReviewUrl: "#" };
  }

  const { reviews, averageRating, reviewCount } = reviewsData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    name: "Karimunjawa Tours",
    url: "https://karimunjawa.tours",
    image: "https://karimunjawa.tours/images/satu.jpg",
    logo: "https://karimunjawa.tours/images/satu.jpg",
    description:
      "Agen wisata lokal terpercaya di Karimunjawa sejak 2015. Menyediakan paket tour all-inclusive 2H1M, 3H2M, 4H3M (hotel & homestay), sewa kapal, snorkeling, dan diving.",
    telephone: "+62-822-2533-6306",
    email: "liburan@karimunjawa.tours",
    priceRange: "IDR 200000 - IDR 7010000",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer",
    foundingDate: "2015",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karimunjawa",
      addressLocality: "Karimunjawa, Jepara",
      addressRegion: "Jawa Tengah",
      postalCode: "59455",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.8856,
      longitude: 110.4287,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "21:00",
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
    aggregateRating:
      reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: averageRating,
            reviewCount: reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    review: reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.authorName },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
      datePublished: r.publishedAt,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paket Wisata Karimunjawa",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Paket 2 Hari 1 Malam",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 2H1M Homestay",
                description: "Paket tour 2 hari 1 malam penginapan homestay termasuk tour laut & snorkeling.",
                url: "https://karimunjawa.tours/paket/2h1m-homestay",
              },
              price: "610000",
              priceCurrency: "IDR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 2H1M Hotel",
                description: "Paket tour 2 hari 1 malam hotel resort partner termasuk tour laut & snorkeling.",
                url: "https://karimunjawa.tours/paket/2h1m-hotel",
              },
              price: "1280000",
              priceCurrency: "IDR",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Paket 3 Hari 2 Malam",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 3H2M Homestay",
                description: "Paket tour 3 hari 2 malam homestay termasuk tour darat, tour laut full day & BBQ pulau.",
                url: "https://karimunjawa.tours/paket/3h2m-homestay",
              },
              price: "920000",
              priceCurrency: "IDR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 3H2M Hotel",
                description: "Paket tour 3 hari 2 malam hotel resort termasuk tour darat, tour laut full day & BBQ pulau.",
                url: "https://karimunjawa.tours/paket/3h2m-hotel",
              },
              price: "1770000",
              priceCurrency: "IDR",
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Paket 4 Hari 3 Malam",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 4H3M Homestay",
                description: "Paket tour 4 hari 3 malam homestay dengan 2x tour laut jelajah barat dan timur.",
                url: "https://karimunjawa.tours/paket/4h3m-homestay",
              },
              price: "1180000",
              priceCurrency: "IDR",
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Trip",
                name: "Paket Wisata Karimunjawa 4H3M Hotel",
                description: "Paket tour 4 hari 3 malam hotel resort dengan 2x tour laut jelajah barat dan timur.",
                url: "https://karimunjawa.tours/paket/4h3m-hotel",
              },
              price: "2270000",
              priceCurrency: "IDR",
            },
          ],
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "One Day Trip Karimunjawa",
            description: "Tour laut 1 hari penuh snorkeling & island hopping.",
            url: "https://karimunjawa.tours/aktivitas/one-day-trip",
          },
          price: "200000",
          priceCurrency: "IDR",
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero averageRating={averageRating} reviewCount={reviewCount} />
      
  <section style={{ maxWidth: 800, margin: "40px auto 0", padding: "0 20px", textAlign: "center" }}>
  <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--text-light)" }}>
    Karimunjawa Tours adalah agen wisata lokal yang telah melayani wisatawan
    ke Kepulauan Karimunjawa sejak 2015. Kami menyediakan paket tour lengkap
    mulai dari 2 hingga 4 hari, dengan pilihan akomodasi hotel maupun
    homestay, snorkeling di spot-spot terbaik, dan penyeberangan langsung
    dari Pelabuhan Kartini, Jepara. Setiap paket sudah termasuk transportasi
    kapal, penginapan sesuai pilihan Anda, makan 3 kali sehari selama trip,
    pemandu wisata lokal berlisensi, dan peralatan snorkeling lengkap —
    sehingga Anda tinggal fokus menikmati liburan tanpa perlu memikirkan
    detail logistik.
  </p>
</section>
      <PackageGrid />
      <ActivityGrid />
      <WhyTravelWithUs />
      <Reviews />
      <CTASection />
      <HomeBookingWidget />
    </>
  );
}