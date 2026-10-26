"use client";

import dynamic from "next/dynamic";
import type { RingImage } from "./PosterRing3D";

// Three.js is loaded only on the client and only for this section, so the rest of the page stays light.
const PosterRing3D = dynamic(() => import("./PosterRing3D"), { ssr: false, loading: () => null });

export default function PosterRing({ images }: { images: RingImage[] }) {
  return <PosterRing3D images={images} />;
}
