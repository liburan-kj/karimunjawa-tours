import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo-link" href="/">
          <img
            className="site-logo"
            alt="Karimunjawa Tours"
            src="/images/satu.png"
          />
        </Link>
        <nav className="main-nav">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><a href="#paket-wisata">Paket Wisata</a></li>
            <li><Link href="/artikel">Artikel</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/tentang-kami">Tentang Kami</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><a href="https://wa.me/+6282225336306" target="_blank" rel="noopener">Kontak</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}