import Image from "next/image";
import { designerPoster as d } from "@/data/content";
import PosterRing from "./PosterRing";

// A fixed poster, the same in both themes: off-white paper, red type, the profile cut-out and the
// Three.js ring orbiting the head (PosterRing3D). Everything is sized to the poster width so it scales
// like an image. Only the ring moves; the rest reveals once when the section scrolls into view.
export default function DesignerPoster() {
  return (
    <section id="design" className="poster" data-reveal="rise" aria-labelledby="design-title">
      <div className="poster-inner">
        <p className="poster-corner tl">
          {d.cornerLeft[0]}
          <br />
          {d.cornerLeft[1]}
        </p>
        <p className="poster-corner tr">
          {d.cornerRight[0]}
          <br />
          {d.cornerRight[1]}
        </p>
        <p className="poster-side l">{d.sideLeft}</p>
        <p className="poster-side r">{d.sideRight}</p>

        <h2 id="design-title" className="poster-title">
          <span className="poster-eyebrow">{d.eyebrow}</span>
          <span className="poster-big">{d.title}</span>
        </h2>

        <div className="poster-scene">
          <Image src={d.photo.src} alt={d.photo.alt} width={d.photo.width} height={d.photo.height} loading="lazy" className="poster-photo" />
          <div className="poster-ring-wrap">
            <PosterRing images={d.ring} />
          </div>
        </div>

        <p className="poster-blurb">
          <span className="poster-blurb-lead">{d.blurbLead}</span>
          {d.blurb}
        </p>
      </div>
    </section>
  );
}
