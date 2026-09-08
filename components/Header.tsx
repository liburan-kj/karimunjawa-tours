"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
            priority
            style={{ width: "auto", height: "auto", maxHeight: "46px" }}
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
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
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

