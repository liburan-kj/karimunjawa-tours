/**
 * JSON-LD Schema Helper Functions
 * Untuk structured data yang konsisten di seluruh website
 */

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function generateBreadcrumbSchema(items: BreadcrumbItem[], baseUrl: string = "https://karimunjawa.tours") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })).filter(item => item.item !== undefined || items[items.length - 1] === items[items.length - 1]),
  };
}

// Canonical brand identity fields, shared by every schema below so that
// name variants stay in sync site-wide (helps disambiguate the brand from
// generic "Karimunjawa tour" search results / competing listings).
export const BRAND_NAME = "Karimunjawa Tours";
export const BRAND_ALTERNATE_NAMES = ["Karimunjawa.tours", "Karimun Jawa Tours"];
export const BRAND_URL = "https://karimunjawa.tours";
// Verified profile URLs only. Add more here (TripAdvisor, Facebook, etc.)
// once those listings are claimed with matching Name/Address/Phone so
// entity signals stay consistent — do not add unverified links.
// NOTE: this Maps link must match the one used on /kontak (Footer + map
// embed). If the business's Google Maps CID ever changes there, update it
// here too.
export const BRAND_SAME_AS = [
  "https://www.instagram.com/karimunjawa.tours",
  "https://maps.app.goo.gl/Gou7H9Ls6hAWSPpx5",
];

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    name: BRAND_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    identifier: BRAND_URL,
    url: BRAND_URL,
    logo: "https://karimunjawa.tours/images/satu.png",
    image: "https://karimunjawa.tours/images/satu.png",
    description: "Karimunjawa Tours melayani wisatawan sejak 2015 dengan paket wisata terpercaya ke Kepulauan Karimunjawa.",
    foundingDate: "2015",
    telephone: "+62-822-2533-6306",
    email: "liburan@karimunjawa.tours",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karimunjawa, Jepara",
      addressRegion: "Jawa Tengah",
      addressCountry: "ID",
    },
    sameAs: BRAND_SAME_AS,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "21:00",
      },
    ],
  };
}

// Site-wide WebSite entity. Distinct from the Organization/LocalBusiness
// entity above — this tells search engines & agents "this domain IS the
// Karimunjawa Tours website", which is the missing link when a brand-name
// query fails to surface the domain among generic results.
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: BRAND_URL,
    inLanguage: "id-ID",
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: BRAND_URL,
    },
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Paket Wisata Karimunjawa",
    provider: {
      "@type": "Organization",
      name: "Karimunjawa Tours",
      url: "https://karimunjawa.tours",
    },
    areaServed: {
      "@type": "Place",
      name: "Kepulauan Karimunjawa, Jepara, Jawa Tengah",
    },
    serviceType: "Travel Package",
    description: "Paket wisata komprehensif ke Kepulauan Karimunjawa dengan akomodasi hotel/homestay, transportasi kapal, tour guide berlisensi, snorkeling, dan island hopping.",
  };
}

type ArticleSchemaInput = {
  title: string;
  excerpt?: string;
  slug: string;
  featuredImage?: string | null;
  date: string;
  updatedAt?: string;
};

export function generateArticleSchema(article: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt?.slice(0, 160) || "",
    url: `${BRAND_URL}/artikel/${article.slug}`,
    datePublished: article.date,
    dateModified: article.updatedAt || article.date,
    ...(article.featuredImage
      ? {
          image: {
            "@type": "ImageObject",
            url: article.featuredImage.startsWith("http")
              ? article.featuredImage
              : `${BRAND_URL}${article.featuredImage}`,
          },
        }
      : {}),
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: BRAND_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: BRAND_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BRAND_URL}/images/satu.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BRAND_URL}/artikel/${article.slug}`,
    },
    inLanguage: "id-ID",
  };
}

