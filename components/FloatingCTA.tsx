"use client";

import { useEffect, useState } from "react";

export default function FloatingCTA({
  lowPrice,
  packageName,
}: {
  lowPrice: number;
  packageName: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => {
      const startSection = document.getElementById("hotel-section");
      if (!startSection) return;
      const startPos = startSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const isPastStart = startPos <= windowHeight * 0.8;

      const footer = document.querySelector(".site-footer");
      let isAtFooter = false;
      if (footer) {
        isAtFooter = footer.getBoundingClientRect().top <= windowHeight;
      }
      setShow(isPastStart && !isAtFooter);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className={"floating-cta-wrapper" + (show ? " show-cta" : "")}>
      <div className="floating-cta-container">
        <div className="floating-cta-info">
          <span className="floating-cta-label">Harga Mulai Dari</span>
          <div className="floating-cta-price">Rp {lowPrice.toLocaleString("id-ID")} <span style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>/pax</span></div>
        </div>
        <a
          className="floating-cta-btn"
          href={`https://wa.me/6282225336306?text=${encodeURIComponent(`Halo Karimunjawa Tours, saya tertarik dengan ${packageName}`)}`}
          target="_blank"
          rel="noopener"
        >
          💬 Tanya / Booking
        </a>
      </div>
    </div>
  );
}