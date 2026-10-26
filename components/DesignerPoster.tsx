import Image from "next/image";
import { designerPoster as d } from "@/data/content";

// The poster artwork, used as is. It reveals once when the section scrolls into view.
export default function DesignerPoster() {
  return (
    <section id="design" className="poster" data-reveal="rise" aria-label="Also a multimedia designer">
      <div className="poster-inner">
        <Image src={d.poster.src} alt={d.poster.alt} width={d.poster.width} height={d.poster.height} loading="lazy" sizes="(max-width: 1400px) 100vw, 1400px" className="poster-img" />
      </div>
    </section>
  );
}
