"use client";

import { useState, useEffect } from "react";
import type { Room } from "../lib/hotelData";
import Image from "next/image";

function resizeBloggerImg(url: string, size: number) {
  return url.replace(/\/s\d+(-c)?\//, `/s${size}/`);
}

export default function HotelLightbox({ 
  room, 
  hotelKey, 
  packageName, 
  onClose 
}: { 
  room: Room; 
  hotelKey: string; 
  packageName: string; 
  onClose: () => void 
}) {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (!room) return;
    room.photos.forEach((src) => {
      const img = new window.Image();
      img.src = resizeBloggerImg(src, 800);
    });
  }, [room]);

  const changePhoto = (dir: number) => {
    const total = room.photos.length;
    setPhotoIndex((p) => (p + dir + total) % total);
  };

  const toTitleCase = (s: string) => s.replace(/\w\S*/g, (t) => t.charAt(0) + t.substr(1).toLowerCase());

  return (
    <div className="rlb-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rlb-modal">
        <button className="rlb-close" onClick={onClose}>✕</button>
        <div className="rlb-carousel">
          {room.photos.length > 0 && (
            <Image 
              src={resizeBloggerImg(room.photos[photoIndex], 800)} 
              alt={room.room} 
              width={800} 
              height={600}
              className="rlb-main-img"
            />
          )}
          {room.photos.length > 1 && (
            <>
              <button className="rlb-nav prev" onClick={() => changePhoto(-1)}>‹</button>
              <button className="rlb-nav next" onClick={() => changePhoto(1)}>›</button>
            </>
          )}
        </div>
        <div className="rlb-body">
          <p className="rlb-title">{room.room}</p>
          <p className="rlb-hotel">{toTitleCase(hotelKey)}</p>
          <div className="rlb-info-grid">
            {room.roomSize && (
              <div className="rlb-info-item"><span>📐</span><div><span className="rlb-info-label">Ukuran</span><span className="rlb-info-value">{room.roomSize} m²</span></div></div>
            )}
            {room.capacity && (
              <div className="rlb-info-item"><span>👥</span><div><span className="rlb-info-label">Kapasitas</span><span className="rlb-info-value">{room.capacity}</span></div></div>
            )}
            {room.bedType && (
              <div className="rlb-info-item"><span>🛏️</span><div><span className="rlb-info-label">Bed Type</span><span className="rlb-info-value">{room.bedType}</span></div></div>
            )}
            {room.view && (
              <div className="rlb-info-item"><span>🌊</span><div><span className="rlb-info-label">View</span><span className="rlb-info-value">{room.view}</span></div></div>
            )}
          </div>
          {room.facilities.length > 0 && (
            <div className="rlb-facilities">
              <h4>Fasilitas Kamar</h4>
              <ul>{room.facilities.map((f, i) => <li key={i}>{f}</li>)}</ul>
            </div>
          )}
          <a
            className="rlb-cta"
            target="_blank"
            rel="noopener"
            href={`https://wa.me/6282225336306?text=${encodeURIComponent(
              `Halo, saya mau tanya tentang ${room.room} - ${toTitleCase(hotelKey)} (${packageName})`
            )}`}
          >
            Booking via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
