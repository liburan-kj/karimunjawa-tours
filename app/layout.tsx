import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { generateWebsiteSchema } from "../lib/jsonld";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata = {
  title: "Karimunjawa Tours - Agen Tour Karimunjawa Terpercaya",
  description: "Karimunjawa Tours menyediakan paket wisata Karimunjawa terpercaya dengan harga bersahabat, mulai dari open trip hingga private trip, untuk liburan tak terlupakan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="id">
      <body className={jakarta.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        {children}
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S4MNSBK9Z5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S4MNSBK9Z5', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}