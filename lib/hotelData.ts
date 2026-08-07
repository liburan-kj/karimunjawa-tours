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

export type HotelsData = Record<string, Room[]>;

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDiRFwAYEXCHQbMU5H7tnH2xVw9pVJwtb4omMCfpmvwc9212eFk-nLfNVtZnrSTXeGKFQsEfNvHSoR/pub?gid=344775843&single=true&output=csv";

const DETAIL_COLS = {
  photos: 17,
  roomSize: 18,
  capacity: 19,
  bedType: 20,
  view: 21,
  facilities: 22,
  notes: 23,
};

export const TARGET_HOTELS = [
  "JAVA PARADISE RESORT",
  "HALO RESORT",
  "HAPPINEZZ HILLS",
  "OMAH ALCHY",
];

function splitList(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw.split("|").map((s) => s.trim()).filter(Boolean);
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
        if (text[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
      else if (c === "\r") { /* skip */ }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function extractHotels(rows: string[][], durationCols: { sig: number; exp: number }): HotelsData {
  const hotels: HotelsData = {};
  let current: string | null = null;

  for (const r of rows) {
    const name = (r[0] || "").trim();
    if (!name) continue;

    const isiRaw = (r[1] || "").trim();
    const isiNum = toNumber(isiRaw);

    if (isiNum === null) {
      const key = name.toUpperCase();
      current = TARGET_HOTELS.includes(key) ? key : null;
      if (current && !hotels[current]) hotels[current] = [];
      continue;
    }

    if (current) {
      const sig = toNumber(r[durationCols.sig]);
      const exp = toNumber(r[durationCols.exp]);
      if (sig !== null && exp !== null) {
        hotels[current].push({
          room: name,
          kap: isiRaw,
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

  return hotels;
}

// durationCols beda per halaman: 2H1M = {sig:10, exp:13}, 3H2M = {sig:11, exp:14}, 4H3M = {sig:12, exp:15}
export async function getHotelData(durationCols: { sig: number; exp: number }): Promise<HotelsData> {
  const res = await fetch(CSV_URL, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Gagal fetch data hotel: " + res.status);
  const text = await res.text();
  const rows = parseCSV(text);
  return extractHotels(rows, durationCols);
}