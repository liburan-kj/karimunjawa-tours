import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo-link" href="/">
          <img
            className="site-logo"
            alt="Karimunjawa Tours"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdfobKy1iQfmSFdu8blFaC07yzAPouE0maTg7tmC8eNXg2yMNv4kRRzh0R_xSFlZ3UDnSJnU1FDATTbIxJhhTo6ykIub6s3ULqyu20kanqL36zgHzYCWgCrCMoerVpymIcX-0mPKL1J1uYEL-K7pRBS4zABDNbDAHD5Gg5SL1ypmNdZisuYx5ozvTKvrp3/s1600/satu.png"
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