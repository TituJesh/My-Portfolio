import type { Metadata } from "next";
import localFont from "next/font/local";
import DesignGallery from "@/components/design-gallery/DesignGallery";
import "./gallery.css";
import "./gallery-v2.css";
import "./polish-about.css";
import "./work-pinboard.css";
import "./motion-blend.css";

const display = localFont({ src: "../fonts/anton-regular.ttf", variable: "--gallery-display", display: "swap" });

export const metadata: Metadata = {
  title: "Design Gallery",
  description: "Step inside the creative world of Titu Jeshurun. Film posters, visual identities, motion graphics and moments behind the lens.",
  alternates: { canonical: "/design-gallery" },
  openGraph: { title: "Titu Jeshurun — The Design Gallery", description: "Ideas, made into something you can feel.", url: "/design-gallery" },
};

export default function GalleryPage() {
  return <div className={display.variable}><DesignGallery /></div>;
}
