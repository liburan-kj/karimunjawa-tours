import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="logo-link" href="/">
          <Image
            className="site-logo"
            alt="Karimunjawa Tours"
            src="/images/satu.png"
            width={150}
            height={50}
            priority
          />
        </Link>
        <nav className="main-nav">
          <ul>
            <NavLinks />
          </ul>
        </nav>
      </div>
    </header>
  );
}