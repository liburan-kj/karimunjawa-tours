"use client";

import { Icon } from "@iconify/react";
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
        <Icon icon="lucide:map-pin" width={20} color="var(--accent-water)" />
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
        <Icon icon="lucide:arrow-right" />
      </a>
    </div>
  );
}
