import Link from "next/link";
import NavLinks from "./NavLinks";

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
            <NavLinks />
          </ul>
        </nav>
      </div>
    </header>
  );
}