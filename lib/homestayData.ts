import { getHomestayData as getRawHomestayRooms } from "./hotelData";

export type HomestayItem = {
  categoryLabel: string;
  roomName: string;
  capacity: string;
  sig: number;
  exp: number;
};

export type HomestayCategoryGroup = {
  label: string;
  items: HomestayItem[];
};

// Mapping nama kategori mentah dari sheet -> label yang lebih ramah tampil
const LABEL_MAP: Record<string, string> = {
  "Fan, Luar, isi": "🌀 Fan · Kamar Mandi Luar",
  "Fan, Dalam, isi": "🌀 Fan · Kamar Mandi Dalam",
  "AC, isi": "❄️ AC · Kamar Mandi Dalam",
};

function niceLabel(rawName: string): string {
  return LABEL_MAP[rawName] || rawName;
}

export async function getHomestayData(
  duration: "2h1m" | "3h2m" | "4h3m"
): Promise<HomestayCategoryGroup[]> {
  const rooms = await getRawHomestayRooms(duration);

  const groupMap: Record<string, HomestayItem[]> = {};

  for (const room of rooms) {
    const label = niceLabel(room.room);
    if (!groupMap[label]) groupMap[label] = [];
    groupMap[label].push({
      categoryLabel: label,
      roomName: room.room,
      capacity: room.kap ? `${room.kap} pax` : "",
      sig: room.sig,
      exp: room.exp,
    });
  }

  // urutkan tiap grup dari kapasitas terbesar ke terkecil (samakan urutan lama)
  for (const label in groupMap) {
    groupMap[label].sort((a, b) => {
      const capA = parseInt(a.capacity) || 0;
      const capB = parseInt(b.capacity) || 0;
      return capB - capA;
    });
  }

  return Object.entries(groupMap).map(([label, items]) => ({ label, items }));
}