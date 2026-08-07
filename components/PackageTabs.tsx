"use client";

import { useState } from "react";
import type { HotelsData } from "../lib/hotelData";
import HotelPricingTable from "./HotelPricingTable";
import Itinerary, { ItineraryDay } from "./Itinerary";

export default function PackageTabs({
  hotels,
  packageName,
  itineraryExpress,
  itinerarySiginjai,
}: {
  hotels: HotelsData;
  packageName: string;
  itineraryExpress: ItineraryDay[];
  itinerarySiginjai: ItineraryDay[];
}) {
  const [tab, setTab] = useState<"express" | "siginjai">("express");

  const facilities = [
    ["⚓", "Retribusi Penumpang Pelabuhan Jepara"],
    ["🚢", "Tiket kapal Jepara–Karimunjawa (PP)"],
    ["🛡️", "Asuransi perjalanan kapal"],
    ["🚐", "Transportasi check in–check out"],
    ["🏨", "Penginapan di Karimunjawa"],
    ["🍽️", "Makan 3x"],
    ["🗺️", "Tour darat 1x"],
    ["⛵", "Tour laut half day 1x"],
    ["🏝️", "Retribusi Pelabuhan Wisata Karimunjawa"],
    ["🚤", "Sewa kapal tour laut & crew"],
    ["🎓", "Jasa Tour Guide HPI"],
    ["🤿", "Sewa alat snorkeling, pelampung, fin"],
    ["⚓", "Biaya sandar kapal"],
    ["💧", "Air mineral saat tour laut"],
    ["📸", "Dokumentasi (termasuk bawah air)"],
  ];

  const excluded = [
    "Obat-obatan pribadi",
    "Tiket penangkaran hiu (Rp 30.000)",
    "Belanja pribadi",
    "Akomodasi sebelum/sesudah program",
    "Transport dari dan ke kota asal",
  ];

  return (
    <>
      <div className="dur-tabs" id="hotel-section">
        <button className={"dur-tab-btn" + (tab === "express" ? " active" : "")} onClick={() => setTab("express")}>
          🚤 Express Bahari
        </button>
        <button className={"dur-tab-btn" + (tab === "siginjai" ? " active" : "")} onClick={() => setTab("siginjai")}>
          ⛵ KMP Siginjai
        </button>
      </div>

      <div className="pkg-info-box">
        <strong>Info Harga:</strong> Harga per orang (dalam ribuan rupiah), sudah termasuk seluruh fasilitas paket, penyeberangan dengan{" "}
        <strong>{tab === "express" ? "kapal Express Bahari (kapal cepat, sekitar 2–3 jam)" : "KMP Siginjai (kapal reguler, sekitar 5,5 jam)"}</strong>.
      </div>

      <div className="pkg-section-label">🏨 PILIHAN PENGINAPAN<span className="line" /></div>

      <HotelPricingTable hotels={hotels} priceKey={tab === "express" ? "exp" : "sig"} packageName={packageName} />

      <div className="facilities-box">
        <h3 style={{ color: "#073e5e", fontSize: 18, fontWeight: 800, marginBottom: 20 }}>✅ Fasilitas Sudah Termasuk</h3>
        <ul>{facilities.map(([icon, text], i) => <li key={i}><strong>{icon}</strong> {text}</li>)}</ul>
      </div>

      <div className="excluded-box">
        <h3 style={{ color: "#c0392b", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>✕ Tidak Termasuk</h3>
        <ul>{excluded.map((text, i) => <li key={i}>{text}</li>)}</ul>
      </div>

      <Itinerary
        title={tab === "express" ? "Itinerary (Express Bahari)" : "Itinerary (KMP Siginjai)"}
        days={tab === "express" ? itineraryExpress : itinerarySiginjai}
      />
    </>
  );
}