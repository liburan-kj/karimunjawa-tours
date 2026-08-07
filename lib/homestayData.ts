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

const HOMESTAY_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDiRFwAYEXCHQbMU5H7tnH2xVw9pVJwtb4omMCfpmvwc9212eFk-nLfNVtZnrSTXeGKFQsEfNvHSoR/pub?gid=144547393&single=true&output=csv";

const CATEGORIES = [
  { label: "🌀 Fan · Kamar Mandi Luar", name: "Fan, KM Luar", count: 3 },
  { label: "🌀 Fan · Kamar Mandi Dalam", name: "Fan, KM Dalam", count: 3 },
  { label: "❄️ AC · Kamar Mandi Dalam", name: "AC, KM Dalam", count: 4 },
];

const DATA_START_ROW = 23;
const DATA_ROW_COUNT = 10;

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

function toNumber(s: string | undefined): number | null {
  if (s === undefined || s === null) return null;
  const trimmed = String(s).trim();
  if (trimmed === "" || trimmed === "-") return null;
  const normalized = trimmed.replace(/\./g, "").replace(/,/g, ".");
  const n = parseFloat(normalized);
  return isNaN(n) ? null : n;
}

export async function getHomestayData(durationCols: {
  sig: number;
  exp: number;
}): Promise<HomestayCategoryGroup[]> {
  try {
    const res = await fetch(HOMESTAY_CSV_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Gagal fetch data homestay: " + res.status);
    const text = await res.text();
    const rows = parseCSV(text);
    const dataRows = rows.slice(
      DATA_START_ROW,
      DATA_START_ROW + DATA_ROW_COUNT
    );

    const groups: HomestayCategoryGroup[] = [];
    let idx = 0;

    for (const cat of CATEGORIES) {
      const items: HomestayItem[] = [];
      for (let k = 0; k < cat.count; k++) {
        const r = dataRows[idx];
        if (r) {
          const kap = (r[1] || "").trim();
          const sig = toNumber(r[durationCols.sig]);
          const exp = toNumber(r[durationCols.exp]);
          if (sig !== null && exp !== null) {
            items.push({
              categoryLabel: cat.label,
              roomName: cat.name,
              capacity: kap ? (kap.includes("pax") ? kap : `${kap} pax`) : "",
              sig: Math.round(sig),
              exp: Math.round(exp),
            });
          }
        }
        idx++;
      }
      if (items.length) {
        groups.push({ label: cat.label, items });
      }
    }
    return groups;
  } catch (err) {
    console.warn("Menggunakan data homestay fallback", err);
    return [
      {
        label: "🌀 Fan · Kamar Mandi Luar",
        items: [
          { categoryLabel: "🌀 Fan · Kamar Mandi Luar", roomName: "Fan, KM Luar", capacity: "3 pax", sig: 1180, exp: 1370 },
          { categoryLabel: "🌀 Fan · Kamar Mandi Luar", roomName: "Fan, KM Luar", capacity: "2 pax", sig: 1220, exp: 1410 },
          { categoryLabel: "🌀 Fan · Kamar Mandi Luar", roomName: "Fan, KM Luar", capacity: "1 pax", sig: 1340, exp: 1530 },
        ],
      },
      {
        label: "🌀 Fan · Kamar Mandi Dalam",
        items: [
          { categoryLabel: "🌀 Fan · Kamar Mandi Dalam", roomName: "Fan, KM Dalam", capacity: "3 pax", sig: 1200, exp: 1390 },
          { categoryLabel: "🌀 Fan · Kamar Mandi Dalam", roomName: "Fan, KM Dalam", capacity: "2 pax", sig: 1250, exp: 1440 },
          { categoryLabel: "🌀 Fan · Kamar Mandi Dalam", roomName: "Fan, KM Dalam", capacity: "1 pax", sig: 1400, exp: 1590 },
        ],
      },
      {
        label: "❄️ AC · Kamar Mandi Dalam",
        items: [
          { categoryLabel: "❄️ AC · Kamar Mandi Dalam", roomName: "AC, KM Dalam", capacity: "4 pax", sig: 1360, exp: 1550 },
          { categoryLabel: "❄️ AC · Kamar Mandi Dalam", roomName: "AC, KM Dalam", capacity: "3 pax", sig: 1400, exp: 1590 },
          { categoryLabel: "❄️ AC · Kamar Mandi Dalam", roomName: "AC, KM Dalam", capacity: "2 pax", sig: 1470, exp: 1660 },
          { categoryLabel: "❄️ AC · Kamar Mandi Dalam", roomName: "AC, KM Dalam", capacity: "1 pax", sig: 1850, exp: 2040 },
        ],
      },
    ];
  }
}
