"use client";

import { useState } from "react";
import type { Room } from "../lib/hotelData";
import HotelLightbox from "./HotelLightbox";

function resizeBloggerImg(url: string, size: number) {
  return url.replace(/\/s\d+(-c)?\//, `/s${size}/`);
}

export default function RoomThumbnail({ 
  room, 
  hotelKey, 
  packageName 
}: { 
  room: Room; 
  hotelKey: string; 
  packageName: string 
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!room.photos || room.photos.length === 0) {
    return <span>{room.room}</span>;
  }

  return (
    <>
      <div 
        className="room-cell-clickable" 
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <img 
          className="room-thumb" 
          src={resizeBloggerImg(room.photos[0], 100)} 
          alt={room.room} 
        />
        <span>{room.room}</span>
      </div>
      
      {isOpen && (
        <HotelLightbox 
          room={room} 
          hotelKey={hotelKey} 
          packageName={packageName} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
