import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/content";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [landscape, portrait, displayFont] = await Promise.all([
    readFile(path.join(process.cwd(), "public/hero-golden-landscape.jpg")),
    readFile(path.join(process.cwd(), "public/og-portrait.png")),
    readFile(path.join(process.cwd(), "app/fonts/trip-sans-bold.otf")),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#11100f", color: "#fff4df", fontFamily: "Trip Sans" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/jpeg;base64,${landscape.toString("base64")}`} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 630, display: "flex", background: "linear-gradient(90deg, rgba(23,16,10,.92) 0%, rgba(36,22,12,.78) 57%, rgba(44,28,14,.3) 100%)" }} />
        <div style={{ position: "absolute", left: 72, top: 66, display: "flex", fontSize: 19, letterSpacing: "0.15em", color: "#f3c77c" }}>
          CLOUD ENGINEER / CREATIVE THINKER
        </div>
        <div style={{ position: "absolute", left: 72, top: 185, width: 730, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 82, lineHeight: 1, letterSpacing: "-0.045em", display: "flex" }}>{site.fullName}<span style={{ color: "#e8b967" }}>.</span></div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: "#f5dfbb" }}>{site.tagline}</div>
        </div>
        <div style={{ position: "absolute", left: 72, bottom: 65, fontSize: 20, color: "#edc486", display: "flex" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
        <div style={{ position: "absolute", right: 70, bottom: 72, width: 300, height: 300, display: "flex", borderRadius: "50%", overflow: "hidden", background: "#11100f", border: "3px solid #e9c888" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${portrait.toString("base64")}`} width={300} height={300} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Trip Sans", data: displayFont, weight: 700, style: "normal" }] },
  );
}


