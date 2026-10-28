import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf9f6",
          color: "#151412",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#5c5955" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#15803d" }} />
          {site.region} · Chennai · all systems operational
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 112, fontWeight: 500, letterSpacing: "-0.05em", lineHeight: 0.95 }}>{site.name}</div>
          <div style={{ fontSize: 44, fontStyle: "italic", fontFamily: "Georgia, serif", color: "#5c5955" }}>{site.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#5c5955" }}>
          <span>{site.role}</span>
          <span style={{ color: "#8a6d0b" }}>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size,
  );
}
