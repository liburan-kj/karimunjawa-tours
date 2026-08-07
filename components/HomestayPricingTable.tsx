import React from "react";
import type { HomestayCategoryGroup } from "../lib/homestayData";

export default function HomestayPricingTable({
  groups,
  priceKey,
}: {
  groups: HomestayCategoryGroup[];
  priceKey: "sig" | "exp";
}) {
  return (
    <div style={{ border: "1.5px solid #e1edf4", borderRadius: 12, overflow: "hidden" }}>
      <div className="table-container">
        <table>
          <thead>
            <tr style={{ background: "#f4f9fc" }}>
              <th style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, fontSize: 12, color: "#0a5c8a", textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "2px solid #e1edf4" }}>
                Tipe Homestay
              </th>
              <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 700, fontSize: 12, color: "#0a5c8a", textTransform: "uppercase", borderBottom: "2px solid #e1edf4" }}>
                Kap
              </th>
              <th style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, fontSize: 12, color: "#0a5c8a", textTransform: "uppercase", borderBottom: "2px solid #e1edf4" }}>
                Harga/Orang
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, gIdx) => (
              <React.Fragment key={gIdx}>
                <tr style={{ background: "#f9fbfd" }}>
                  <td
                    colSpan={3}
                    style={{
                      padding: "8px 14px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#1c8fc7",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      borderBottom: "1px solid #e1edf4",
                      borderTop: "1px solid #e1edf4",
                    }}
                  >
                    {group.label}
                  </td>
                </tr>
                {group.items.map((item, iIdx) => {
                  const price = priceKey === "sig" ? item.sig : item.exp;
                  const isLast = gIdx === groups.length - 1 && iIdx === group.items.length - 1;
                  return (
                    <tr
                      key={iIdx}
                      style={{ borderBottom: isLast ? "none" : "1px solid #f4f9fc" }}
                    >
                      <td style={{ padding: "10px 14px" }}>{item.roomName}</td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>{item.capacity}</td>
                      <td style={{ padding: "10px 14px", textAlign: "right", fontWeight: 700, color: "#0a5c8a" }}>
                        {price.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
