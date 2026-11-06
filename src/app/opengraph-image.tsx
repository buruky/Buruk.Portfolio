import { ImageResponse } from "next/og";
import { profile } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// dark palette from globals.css, matching what most visitors land on
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#18140f",
          color: "#f1ebe1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, color: "#a89d8e", letterSpacing: 4, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ marginTop: 28, fontSize: 92, fontWeight: 600, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 36, color: "#e2794f" }}>{profile.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
