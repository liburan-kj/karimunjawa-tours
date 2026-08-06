import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });

export const metadata = {
  title: "Karimunjawa Tours - Agen Tour Karimunjawa Terpercaya",
  description: "Karimunjawa Tours menyediakan paket wisata Karimunjawa terpercaya dengan harga bersahabat, mulai dari open trip hingga private trip, untuk liburan tak terlupakan.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}