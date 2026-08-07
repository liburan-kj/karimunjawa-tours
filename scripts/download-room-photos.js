const fs = require("fs");
const path = require("path");

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDiRFwAYEXCHQbMU5H7tnH2xVw9pVJwtb4omMCfpmvwc9212eFk-nLfNVtZnrSTXeGKFQsEfNvHSoR/pub?gid=344775843&single=true&output=csv";

const DETAIL_COLS = { photos: 17 };
const TARGET_HOTELS = ["JAVA PARADISE RESORT", "HALO RESORT", "HAPPINEZZ HILLS", "OMAH ALCHY"];

function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
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

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function toNumber(s) {
  if (!s) return null;
  const t = String(s).trim().replace(/\./g, "").replace(/,/g, ".");
  const n = parseFloat(t);
  return isNaN(n) ? null : n;
}

async function downloadImage(url, filepath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
}

async function main() {
  console.log("Fetching CSV...");
  const res = await fetch(CSV_URL);
  const text = await res.text();
  const rows = parseCSV(text);

  const outDir = path.join(__dirname, "..", "public", "images", "rooms");
  fs.mkdirSync(outDir, { recursive: true });

  const mapping = {};
  let current = null;
  let downloadCount = 0;
  let failCount = 0;

  for (const r of rows) {
    const name = (r[0] || "").trim();
    if (!name) continue;

    const isiRaw = (r[1] || "").trim();
    const isiNum = toNumber(isiRaw);

    if (isiNum === null) {
      const key = name.toUpperCase();
      current = TARGET_HOTELS.includes(key) ? key : null;
      if (current && !mapping[current]) mapping[current] = {};
      continue;
    }

    if (current) {
      const photosRaw = r[DETAIL_COLS.photos];
      if (!photosRaw) continue;
      const photos = photosRaw.split("|").map((s) => s.trim()).filter(Boolean);
      if (!photos.length) continue;

      const hotelSlug = slugify(current);
      const roomSlug = slugify(name);
      const localPaths = [];

      const roomDir = path.join(outDir, hotelSlug, roomSlug);
      fs.mkdirSync(roomDir, { recursive: true });

      for (let i = 0; i < photos.length; i++) {
        const filename = `${i + 1}.jpg`;
        const filepath = path.join(roomDir, filename);
        const localPath = `/images/rooms/${hotelSlug}/${roomSlug}/${filename}`;

        try {
          console.log(`Downloading: ${hotelSlug}/${roomSlug}/${filename}`);
          await downloadImage(photos[i], filepath);
          localPaths.push(localPath);
          downloadCount++;
        } catch (err) {
          console.warn(`  Gagal download ${hotelSlug}/${roomSlug}/${filename}:`, err.message);
          failCount++;
        }
      }

      mapping[current][name] = localPaths;
    }
  }

  fs.writeFileSync(
    path.join(__dirname, "..", "room-photos-mapping.json"),
    JSON.stringify(mapping, null, 2)
  );

  console.log(`\nSelesai!`);
  console.log(`Berhasil: ${downloadCount} foto`);
  if (failCount > 0) console.log(`Gagal: ${failCount} foto (cek log di atas)`);
  console.log(`Tersimpan di: public/images/rooms/[nama-hotel]/[tipe-kamar]/`);
  console.log(`Mapping tersimpan di: room-photos-mapping.json (buat referensi pas edit Google Sheets)`);
}

main().catch((err) => console.error("Error:", err));