"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import NavLinks from "./NavLinks";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          />
        </Link>

        <nav className="main-nav">
          <ul>
            <NavLinks />
          </ul>
        </nav>

        <button
          type="button"
          className={`nav-toggle ${isMenuOpen ? "is-active" : ""}`}
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <Icon icon={isMenuOpen ? "lucide:x" : "lucide:menu"} width={26} height={26} />
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        className={`mobile-nav ${isMenuOpen ? "is-open" : ""}`}
      >
        <ul onClick={() => setIsMenuOpen(false)}>
          <NavLinks />
        </ul>
      </div>
    </header>
  );
}
