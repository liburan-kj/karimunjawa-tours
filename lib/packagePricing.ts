import { cache } from "react";
import { getHotelData, TARGET_HOTELS } from "./hotelData";
import { getHomestayData } from "./homestayData";

export type PackageSlug =
  | "2h1m-hotel"
  | "3h2m-hotel"
  | "4h3m-hotel"
  | "2h1m-homestay"
  | "3h2m-homestay"
  | "4h3m-homestay";

export type PackagePricing = {
  lowPrice: number;
  highPrice: number;
  offerCount: number;
};

const FALLBACK_LOW_PRICE: Record<PackageSlug, number> = {
  "2h1m-hotel": 1280000,
  "3h2m-hotel": 1770000,
  "4h3m-hotel": 2270000,
  "2h1m-homestay": 610000,
  "3h2m-homestay": 920000,
  "4h3m-homestay": 1180000,
};

const FALLBACK_HIGH_PRICE: Record<PackageSlug, number> = {
  "2h1m-hotel": 3010000,
  "3h2m-hotel": 5010000,
  "4h3m-hotel": 7010000,
  "2h1m-homestay": 1030000,
  "3h2m-homestay": 1560000,
  "4h3m-homestay": 2040000,
};

function formatLowPrice(price: number): string {
  return `Mulai ${Math.round(price / 1000)}K`;
}

function summarizePrices(prices: number[], fallback: number, pick: "min" | "max"): number {
  if (!prices.length) return fallback;
  return (pick === "min" ? Math.min(...prices) : Math.max(...prices)) * 1000;
}

function isExtraBedRoom(roomName: string): boolean {
  const normalized = roomName.toLowerCase();
  return normalized.includes("extrabed") || normalized.includes("extra bed") || normalized.includes("extra-bed");
}

async function getHotelPricing(
  duration: "2h1m" | "3h2m" | "4h3m",
  lowKey: "sig" | "exp",
  highKey: "sig" | "exp",
  slug: PackageSlug
): Promise<PackagePricing> {
  const hotels = await getHotelData(duration);
  // Only include target hotel groups, exclude HOMESTAY
  const rooms = TARGET_HOTELS.flatMap((hotel) => hotels[hotel] || []);
  // Exclude extrabed rooms
  const filteredRooms = rooms.filter((room) => !isExtraBedRoom(room.room));
  const lowPrices = filteredRooms.map((room) => room[lowKey]);
  const highPrices = filteredRooms.map((room) => room[highKey]);

  return {
    lowPrice: summarizePrices(lowPrices, FALLBACK_LOW_PRICE[slug], "min"),
    highPrice: summarizePrices(highPrices, FALLBACK_HIGH_PRICE[slug], "max"),
    offerCount: rooms.length,
  };
}

async function getHomestayPricing(
  duration: "2h1m" | "3h2m" | "4h3m",
  lowKey: "sig" | "exp",
  highKey: "sig" | "exp",
  slug: PackageSlug
): Promise<PackagePricing> {
  const groups = await getHomestayData(duration);
  const items = groups.flatMap((group) => group.items);
  // Exclude extrabed rooms
  const filteredItems = items.filter((item) => !isExtraBedRoom(item.roomName));
  const lowPrices = filteredItems.map((item) => item[lowKey]);
  const highPrices = filteredItems.map((item) => item[highKey]);

  return {
    lowPrice: summarizePrices(lowPrices, FALLBACK_LOW_PRICE[slug], "min"),
    highPrice: summarizePrices(highPrices, FALLBACK_HIGH_PRICE[slug], "max"),
    offerCount: items.length,
  };
}

export const getPackagePricing = cache(async (slug: PackageSlug): Promise<PackagePricing> => {
  try {
    switch (slug) {
      case "2h1m-hotel":
        return await getHotelPricing("2h1m", "sig", "exp", slug);
      case "3h2m-hotel":
        return await getHotelPricing("3h2m", "sig", "exp", slug);
      case "4h3m-hotel":
        return await getHotelPricing("4h3m", "sig", "exp", slug);
      case "2h1m-homestay":
        return await getHomestayPricing("2h1m", "sig", "exp", slug);
      case "3h2m-homestay":
        return await getHomestayPricing("3h2m", "sig", "exp", slug);
      case "4h3m-homestay":
        return await getHomestayPricing("4h3m", "sig", "exp", slug);
    }
  } catch {
    return {
      lowPrice: FALLBACK_LOW_PRICE[slug],
      highPrice: FALLBACK_HIGH_PRICE[slug],
      offerCount: 0,
    };
  }
});

export const getPackageLowPrice = cache(async (slug: PackageSlug): Promise<number> => {
  const pricing = await getPackagePricing(slug);
  return pricing.lowPrice;
});

export async function getPackageLowPriceLabel(slug: PackageSlug): Promise<string> {
  const price = await getPackageLowPrice(slug);
  return formatLowPrice(price);
}
