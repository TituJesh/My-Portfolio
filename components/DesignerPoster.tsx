import Image from "next/image";
import { designerPoster as d, site } from "@/data/content";
import { ArrowUpRight } from "./Icons";
import PosterRing from "./PosterRing";

// Full-bleed poster: the profile cut-out stands in front of the headline while a Three.js ring of
// posters orbits the head (PosterRing3D). Everything reveals when the section scrolls into view.
export default function DesignerPoster() {
  return (
    <section id="design" className="poster" data-reveal="rise" aria-labelledby="design-title">
      <div className="poster-inner">
        <p className="poster-corner tl mono-meta">
          {d.cornerLeft[0]}
          <br />
          {d.cornerLeft[1]}
        </p>
        <p className="poster-corner tr mono-meta">
          {d.cornerRight[0]}
          <br />
          {d.cornerRight[1]}
        </p>
        <p className="poster-side l mono-meta">{d.sideLeft}</p>
        <p className="poster-side r mono-meta">{d.sideRight}</p>

        <h2 id="design-title" className="poster-title">
          <span className="poster-eyebrow">{d.eyebrow}</span>
          <span className="poster-big">
            {d.title.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
        </h2>

        <div className="poster-scene">
          <Image src={d.photo.src} alt={d.photo.alt} width={d.photo.width} height={d.photo.height} loading="lazy" className="poster-photo" />
          <div className="poster-ring-wrap">
            <PosterRing images={d.ring} />
          </div>
        </div>

        <p className="poster-blurb">
          {d.blurb}{" "}
          <a href={site.gallery} rel="noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
            See the gallery <ArrowUpRight size={14} />
          </a>
        </p>
      </div>
    </section>
  );
}
