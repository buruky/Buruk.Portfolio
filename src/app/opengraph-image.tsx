import { ImageResponse } from "next/og";
import { profile } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#faf7f2",
          color: "#2b2420",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, color: "#756b5f", letterSpacing: 4, textTransform: "uppercase" }}>
          Portfolio
        </div>
        <div style={{ marginTop: 28, fontSize: 92, fontWeight: 600, lineHeight: 1.05 }}>
          {profile.name}
        </div>
        <div style={{ marginTop: 24, fontSize: 36, color: "#a94a2a" }}>{profile.tagline}</div>
      </div>
    ),
    { ...size }
  );
}
