"use client";

import { useState } from "react";
import Image from "next/image";
import type { Room } from "../lib/hotelData";
import HotelLightbox from "./HotelLightbox";

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
        <Image
          className="room-thumb"
          src={room.photos[0]}
          alt={room.room}
          width={36}
          height={36}
          sizes="36px"
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
