export type Room = {
  room: string;
  kap: string;
  sig: number;
  exp: number;
  photos: string[];
  roomSize: string;
  capacity: string;
  bedType: string;
  view: string;
  facilities: string[];
  notes: string;
};

export type PropertyData = Record<string, Room[]>;

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBsJeoogNBQPSsszh88Uboxg65F48jIxaOx10lbXMIWECZVzbtBfju-PaANbUf5MgMqyrODvenStDH/pub?gid=173893534&single=true&output=csv";

// Index kolom harga per durasi: [SIGINJAI, EXPRESS]
const DURATION_COL_INDEX: Record<"2h1m" | "3h2m" | "4h3m", { sig: number; exp: number }> = {
  "2h1m": { sig: 2, exp: 5 },
  "3h2m": { sig: 3, exp: 6 },
  "4h3m": { sig: 4, exp: 7 },
};

const DETAIL_COLS = {
  photos: 9,
  roomSize: 10,
  capacity: 11,
  bedType: 12,
  view: 13,
  facilities: 14,
  notes: 15,
};

export const TARGET_HOTELS = [
  "JAVA PARADISE RESORT",
  "HALO RESORT",
  "HAPPINEZZ HILLS",
  "OMAH ALCHY",
];

const HOMESTAY_GROUP = "HOMESTAY";

function splitList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toNumber(s: string | undefined): number | null {
  if (s === undefined || s === null) return null;
  const trimmed = String(s).trim();
  if (trimmed === "" || trimmed === "-") return null;
  const normalized = trimmed.replace(/\./g, "").replace(/,/g, ".");
  const n = parseFloat(normalized);
  return isNaN(n) ? null : n;
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        /* skip */
      } else field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function extractAll(
  rows: string[][],
  colIndex: { sig: number; exp: number }
): PropertyData {
  const data: PropertyData = {};
  let mode: "none" | "homestay" | "hotel" = "none";
  let currentGroup: string | null = null;

  for (const r of rows) {
    const name = (r[0] || "").trim();
    if (!name) continue;

    const upperName = name.toUpperCase();

    // Deteksi section header
    if (upperName === "HOMESTAY") {
      mode = "homestay";
      currentGroup = HOMESTAY_GROUP;
      data[currentGroup] = [];
      continue;
    }
    if (upperName === "HOTEL") {
      mode = "hotel";
      currentGroup = null;
      continue;
    }

    const kapRaw = (r[1] || "").trim();
    const kapNum = toNumber(kapRaw);

    // Baris header kolom (mis. "ISI", "SIGINJAI", dst) - skip
    if (upperName === "ISI" || upperName === "SIGINJAI" || upperName === "EXPRESS") {
      continue;
    }

    if (mode === "hotel") {
      // Baris nama properti hotel: kolom kapasitas kosong / bukan angka
      if (kapNum === null) {
        currentGroup = TARGET_HOTELS.includes(upperName) ? upperName : null;
        if (currentGroup && !data[currentGroup]) data[currentGroup] = [];
        continue;
      }
    }

    if (!currentGroup) continue;

    if (kapNum !== null) {
      const sig = toNumber(r[colIndex.sig]);
      const exp = toNumber(r[colIndex.exp]);
      if (sig !== null && exp !== null) {
        data[currentGroup].push({
          room: name,
          kap: kapRaw,
          sig: Math.round(sig),
          exp: Math.round(exp),
          photos: splitList(r[DETAIL_COLS.photos]),
          roomSize: (r[DETAIL_COLS.roomSize] || "").trim(),
          capacity: (r[DETAIL_COLS.capacity] || "").trim(),
          bedType: (r[DETAIL_COLS.bedType] || "").trim(),
          view: (r[DETAIL_COLS.view] || "").trim(),
          facilities: splitList(r[DETAIL_COLS.facilities]),
          notes: (r[DETAIL_COLS.notes] || "").trim(),
        });
      }
    }
  }

  return data;
}

export async function getHotelData(
  duration: "2h1m" | "3h2m" | "4h3m"
): Promise<PropertyData> {
  const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Gagal fetch data harga: " + res.status);
  const text = await res.text();
  const rows = parseCSV(text);
  return extractAll(rows, DURATION_COL_INDEX[duration]);
}

export async function getHomestayData(
  duration: "2h1m" | "3h2m" | "4h3m"
): Promise<Room[]> {
  const all = await getHotelData(duration);
  return all[HOMESTAY_GROUP] || [];
}