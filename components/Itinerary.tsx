"use client";

import { useState } from "react";

export type ItineraryDay = {
  label: string;
  items: { time: string; desc: string }[];
};

export default function Itinerary({ title, days }: { title: string; days: ItineraryDay[] }) {
  const [activeDay, setActiveDay] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <div className="itin-wrap">
      <button className="itin-panel-btn" onClick={() => setOpen(!open)}>
        <span>🗓️ {title}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>▼</span>
      </button>
      {open && (
        <div className="itin-body">
          <div className="pkg-info-box">
            <strong>Info:</strong> Waktu keberangkatan menyesuaikan pilihan kapal &amp; jadwal. Waktu tour laut menyesuaikan cuaca.
          </div>
          <div style={{ marginBottom: 20 }}>
            {days.map((d, i) => (
              <button
                key={i}
                className={"itin-daybtn" + (activeDay === i ? " active" : "")}
                onClick={() => setActiveDay(i)}
              >
                Hari {i + 1}
              </button>
            ))}
          </div>
          <div className="pkg-section-label">{days[activeDay].label}<span className="line" /></div>
          <div style={{ borderRadius: 12, border: "1.5px solid #e1edf4", overflow: "hidden" }}>
            {days[activeDay].items.map((item, i) => (
              <div className="itin-row" key={i}>
                <div className="itin-time">{item.time}</div>
                <div className="itin-desc">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}