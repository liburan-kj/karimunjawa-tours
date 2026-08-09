"use client";

import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

export default function Reviews() {
  return (
    <div style={{ maxWidth: 1200, margin: "60px auto 0", padding: "0 20px" }}>
      <ReactGoogleReviews
        layout="carousel"
        featurableId="9f38c68b-e1ab-4a2d-bc3e-7d11cf8ab0cb"
        widgetVersion="v2"
      />
    </div>
  );
}