import { GoogleAnalytics } from "@next/third-parties/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  return (
    <html lang="id">
      <body className={jakarta.variable}>
        <Header />
        {children}
        <Footer />
        <GoogleAnalytics gaId="G-S4MNSBK9Z5" />
      </body>
    </html>
  );
}