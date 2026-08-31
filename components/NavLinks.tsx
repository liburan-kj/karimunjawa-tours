"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isActivityDetail = pathname.startsWith("/aktivitas/");

  return (
    <>
      <li><Link href="/">Home</Link></li>

      {isHomepage && !isActivityDetail && (
        <>
          <li><a href="#paket-wisata">Paket Wisata</a></li>
          <li><a href="#aktivitas">Aktivitas</a></li>
          <li><Link href="/artikel">Artikel</Link></li>
          <li><Link href="/galeri">Galeri</Link></li>
          <li><Link href="/tentang-kami">Tentang Kami</Link></li>
          <li><Link href="/faq">FAQ</Link></li>
        </>
      )}

      <li><Link href="/kontak">Kontak</Link></li>
    </>
  );
}
