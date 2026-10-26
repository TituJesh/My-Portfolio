import Image from "next/image";
import { designerPoster as d } from "@/data/content";

// The poster artwork, used as is, with a slowly turning CSS 3D ring of the same cards laid over the
// painted band. The upper row shows all the way round (its back is visible above the head in the artwork);
// the lower row shows its front only, as the hair hides the back of it.
export default function DesignerPoster() {
  const n = d.ring.length;
  const half = Math.floor(n / 2);
  return (
    <section id="design" className="poster" data-reveal="rise" aria-label="Also a multimedia designer">
      <div className="poster-inner">
        <Image src={d.poster.src} alt={d.poster.alt} width={d.poster.width} height={d.poster.height} loading="lazy" sizes="(max-width: 1400px) 100vw, 1400px" className="poster-img" />
        <div className="poster-ring-wrap" aria-hidden>
          <ul className="poster-ring" style={{ "--n": n } as React.CSSProperties}>
            {d.ring.map((card, i) => (
              <li key={`t${i}`} className="poster-card top" style={{ "--i": i } as React.CSSProperties}>
                <Image src={card.src} alt="" width={480} height={320} loading="lazy" />
              </li>
            ))}
            {d.ring.map((_, i) => {
              const card = d.ring[(i + half) % n];
              return (
                <li key={`b${i}`} className="poster-card bottom" style={{ "--i": i } as React.CSSProperties}>
                  <Image src={card.src} alt="" width={480} height={320} loading="lazy" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
