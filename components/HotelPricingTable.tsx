import type { PropertyData } from "../lib/hotelData";
import { TARGET_HOTELS } from "../lib/hotelData";
import RoomThumbnail from "./RoomThumbnail";

function toTitleCase(s: string) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0) + t.substr(1).toLowerCase());
}

export default function HotelPricingTable({
  hotels,
  priceKey,
  packageName,
}: {
  hotels: PropertyData;
  priceKey: "sig" | "exp";
  packageName: string;
}) {
  const hasAllHotels = TARGET_HOTELS.every((h) => hotels[h]?.length);
  if (!hasAllHotels) {
    return <p style={{ color: "#5b6b7b", fontSize: 14 }}>Memuat data harga...</p>;
  }

  return (
    <>
      {TARGET_HOTELS.map((hotelKey) => {
        const rooms = hotels[hotelKey];
        const displayName = toTitleCase(hotelKey);
        return (
          <details className="hotel-details" key={hotelKey}>
            <summary className="hotel-summary">
              <span>🏨 {displayName}</span>
              <span style={{ color: "#0a5c8a", fontSize: 12 }}>▼</span>
            </summary>
            <div className="hotel-table-wrap">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left" }}>Type Kamar</th>
                      <th style={{ textAlign: "center" }}>Kap</th>
                      <th style={{ textAlign: "right" }}>Harga/Orang</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((rm, idx) => {
                      const price = priceKey === "sig" ? rm.sig : rm.exp;
                      return (
                        <tr key={idx}>
                          <td>
                            <RoomThumbnail 
                              room={rm} 
                              hotelKey={hotelKey} 
                              packageName={packageName} 
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>{rm.kap}</td>
                          <td style={{ textAlign: "right", fontWeight: 700, color: "#0a5c8a" }}>
                            {price.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </details>
        );
      })}
    </>
  );
}