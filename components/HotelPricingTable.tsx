"use client";

import { useState, useEffect } from "react";
import type { PropertyData, Room } from "../lib/hotelData";
import { TARGET_HOTELS } from "../lib/hotelData";

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0) + t.substr(1).toLowerCase());
}
function resizeBloggerImg(url: string, size: number) {
  return url.replace(/\/s\d+(-c)?\//, `/s${size}/`);
}
export default function HotelPricingTable({
  hotels,
  priceKey,
  packageName,
}: {
  hotels: PropertyData;
  priceKey: "sig" | "exp";
  packageName: string;
}) {
  const [lightbox, setLightbox] = useState<{ hotelKey: string; idx: number } | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (hotelKey: string, idx: number) => {
    setLightbox({ hotelKey, idx });
    setPhotoIndex(0);
  };
  const closeLightbox = () => setLightbox(null);

  const activeRoom: Room | null =
    lightbox && hotels[lightbox.hotelKey] ? hotels[lightbox.hotelKey][lightbox.idx] : null;

  const changePhoto = (dir: number) => {
    if (!activeRoom) return;
    const total = activeRoom.photos.length;
    setPhotoIndex((p) => (p + dir + total) % total);
  };

  useEffect(() => {
    if (!activeRoom) return;
    activeRoom.photos.forEach((src) => {
      const img = new Image();
      img.src = resizeBloggerImg(src, 800);
    });
  }, [activeRoom]);

  const hasAllHotels = TARGET_HOTELS.every((h) => hotels[h]?.length);
  if (!hasAllHotels) {
    return <p style={{ color: "#5b6b7b", fontSize: 14 }}>Memuat data harga...</p>;
  }

  return (
    <>
      {TARGET_HOTELS.map((hotelKey) => {
        const rooms = hotels[hotelKey];
        const displayName = toTitleCase(hotelKey);
        return (
          <details className="hotel-details" key={hotelKey}>
            <summary className="hotel-summary">
              <span>🏨 {displayName}</span>
              <span style={{ color: "#0a5c8a", fontSize: 12 }}>▼</span>
            </summary>
            <div className="hotel-table-wrap">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Type Kamar</th>
                      <th style={{ textAlign: "center" }}>Kap</th>
                      <th style={{ textAlign: "right" }}>Harga/Orang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((rm: Room, idx: number) => {
                      const price = priceKey === "sig" ? rm.sig : rm.exp;
                      return (
                        <tr key={idx}>
                          <td>
                            {rm.photos.length ? (
                              <div className="room-cell-clickable" onClick={() => openLightbox(hotelKey, idx)}>
                                <img className="room-thumb" src={resizeBloggerImg(rm.photos[0], 100)} alt={rm.room} />
                                <span>{rm.room}</span>
                              </div>
                            ) : (
                              rm.room
                            )}
                          </td>
                          <td style={{ textAlign: "center" }}>{rm.kap}</td>
                          <td style={{ textAlign: "right", fontWeight: 700, color: "#0a5c8a" }}>
                            {price.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        );
      })}

      {activeRoom && lightbox && (
        <div className="rlb-overlay active" onClick={(e) => e.target === e.currentTarget && closeLightbox()}>
          <div className="rlb-modal">
            <button className="rlb-close" onClick={closeLightbox}>✕</button>
            <div className="rlb-carousel">
              {activeRoom.photos.length > 0 && (
                <img src={resizeBloggerImg(activeRoom.photos[photoIndex], 800)} alt={activeRoom.room} />
              )}
              {activeRoom.photos.length > 1 && (
                <>
                  <button className="rlb-nav prev" onClick={() => changePhoto(-1)}>‹</button>
                  <button className="rlb-nav next" onClick={() => changePhoto(1)}>›</button>
                </>
              )}
            </div>
            <div className="rlb-body">
              <p className="rlb-title">{activeRoom.room}</p>
              <p className="rlb-hotel">{toTitleCase(lightbox.hotelKey)}</p>
              <div className="rlb-info-grid">
                {activeRoom.roomSize && (
                  <div className="rlb-info-item"><span>📐</span><div><span className="rlb-info-label">Ukuran</span><span className="rlb-info-value">{activeRoom.roomSize} m²</span></div></div>
                )}
                {activeRoom.capacity && (
                  <div className="rlb-info-item"><span>👥</span><div><span className="rlb-info-label">Kapasitas</span><span className="rlb-info-value">{activeRoom.capacity}</span></div></div>
                )}
                {activeRoom.bedType && (
                  <div className="rlb-info-item"><span>🛏️</span><div><span className="rlb-info-label">Bed Type</span><span className="rlb-info-value">{activeRoom.bedType}</span></div></div>
                )}
                {activeRoom.view && (
                  <div className="rlb-info-item"><span>🌊</span><div><span className="rlb-info-label">View</span><span className="rlb-info-value">{activeRoom.view}</span></div></div>
                )}
              </div>
              {activeRoom.facilities.length > 0 && (
                <div className="rlb-facilities">
                  <h4>Fasilitas Kamar</h4>
                  <ul>{activeRoom.facilities.map((f, i) => <li key={i}>{f}</li>)}</ul>
                </div>
              )}
              <a
                className="rlb-cta"
                target="_blank"
                rel="noopener"
                href={`https://wa.me/6282225336306?text=${encodeURIComponent(
                  `Halo, saya mau tanya tentang ${activeRoom.room} - ${toTitleCase(lightbox.hotelKey)} (${packageName})`
                )}`}
              >
                Booking via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}