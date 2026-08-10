"use client";

import { useEffect, useState } from "react";
import type { Review } from "../lib/reviews";
import { formatRelativeTime } from "../lib/reviews";

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        flex: 1,
        height: 230,
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #f0f0f0",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        padding: 24,
        textAlign: "center",
      }}
    >
      {review.avatarUrl ? (
        <img
          src={review.avatarUrl}
          alt={review.authorName}
          referrerPolicy="no-referrer"
          style={{ width: 52, height: 52, borderRadius: "50%", margin: "0 auto 12px" }}
        />
      ) : (
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#0077b6",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 18,
            margin: "0 auto 12px",
          }}
        >
          {review.authorName.charAt(0)}
        </div>
      )}
      <div style={{ fontWeight: 700, fontSize: 15 }}>{review.authorName}</div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>
        {formatRelativeTime(review.publishedAt)}
      </div>
      <div style={{ color: "#ffd166", marginBottom: 10, fontSize: 15 }}>
        {"★".repeat(review.rating)}
      </div>
      <p style={{ fontSize: 13.5, color: "#444", lineHeight: 1.7 }}>{review.text}</p>
    </div>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updatePerView = () => setPerView(window.innerWidth >= 768 ? 3 : 1);
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const pages = chunk(reviews, perView);

  useEffect(() => {
    setIndex(0);
  }, [perView]);

  useEffect(() => {
    if (pages.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % pages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [pages.length]);

  if (reviews.length === 0) return null;

  return (
    <div>
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${index * 100}%)`,
            transition: "transform 0.5s ease",
          }}
        >
          {pages.map((page, pageIdx) => (
            <div
              key={pageIdx}
              style={{
                minWidth: "100%",
                display: "flex",
                gap: 16,
                padding: "0 8px",
              }}
            >
              {page.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Halaman ${i + 1}`}
              style={{
                width: i === index ? 22 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: i === index ? "#0a5c8a" : "#dbe6ee",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}