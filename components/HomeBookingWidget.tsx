"use client";

import { useEffect, useState } from "react";

export default function HomeBookingWidget() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      const threshold = window.innerHeight * 0.7;

      // Hide once the final CTA section (which already has its own
      // WhatsApp / contact buttons) starts entering the viewport, so the
      // sticky widget never overlaps or duplicates it.
      const ctaSection = document.querySelector(".cta-section");
      const isAtCTA = ctaSection
        ? ctaSection.getBoundingClientRect().top <= window.innerHeight * 0.85
        : false;

      const footer = document.querySelector(".site-footer");
      const isAtFooter = footer
        ? footer.getBoundingClientRect().top <= window.innerHeight
        : false;

      setShow(window.scrollY > threshold && !isAtCTA && !isAtFooter);
    };

    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={"home-booking-widget" + (show ? " show-widget" : "")}>
      <div className="home-booking-widget-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-water)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <div>
          <div className="home-booking-widget-label">Karimunjawa menantimu</div>
          <div className="home-booking-widget-sub">Jelajahi kepulauannya</div>
        </div>
      </div>
      <a
        className="home-booking-widget-btn"
        href="https://wa.me/6282225336306?text=Halo%20Karimunjawa%20Tours%2C%20saya%20mau%20tanya%20paket%20wisata"
        target="_blank"
        rel="noopener"
      >
        <span>Rencanakan Trip</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
