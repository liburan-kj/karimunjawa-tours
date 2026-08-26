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

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "Organization"],
    name: "Karimunjawa Tours",
    url: "https://karimunjawa.tours",
    logo: "https://karimunjawa.tours/images/satu.jpg",
    image: "https://karimunjawa.tours/images/satu.jpg",
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
    sameAs: ["https://www.instagram.com/karimunjawa.tours"],
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
