import Image from "next/image";
import { designerPoster as d, site } from "@/data/content";
import { ArrowUpRight } from "./Icons";

// Full-bleed poster: the profile cut-out stands in front of the headline while a 3D ring of
// posters turns around the head. Everything reveals when the section scrolls into view.
export default function DesignerPoster() {
  const n = d.ring.length;
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

        <div className="poster-scene" style={{ "--n": n } as React.CSSProperties}>
          <Image src={d.photo.src} alt={d.photo.alt} width={d.photo.width} height={d.photo.height} loading="lazy" className="poster-photo" />
          <div className="poster-ring-wrap" aria-label="Selected design work">
            <ul className="poster-ring">
              {d.ring.map((card, i) => {
                // Two rows per card: this image on top, the one half a turn later below.
                const lower = d.ring[(i + Math.floor(n / 2)) % n];
                return (
                  <li key={card.src} className="poster-card" style={{ "--i": i } as React.CSSProperties}>
                    <span className="poster-cell">
                      <Image src={card.src} alt={card.alt} width={300} height={120} loading="lazy" />
                    </span>
                    <span className="poster-cell">
                      <Image src={lower.src} alt={lower.alt} width={300} height={120} loading="lazy" />
                    </span>
                  </li>
                );
              })}
            </ul>
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
