import Image from "next/image";
import { site } from "@/data/content";
import HeroLines from "./HeroLines";
import ScrollHint from "./ScrollHint";
import StatusChip from "./StatusChip";

function Avatar() {
  return (
    <div className="enter relative grid h-24 w-24 place-items-center rounded-full border border-line-2 p-1" style={{ "--d": "0ms" } as React.CSSProperties}>
      <span className="absolute inset-[-5px] rounded-full border border-line" aria-hidden />
      {site.photo ? (
        <Image src={site.photo} alt={site.name} width={88} height={88} priority className="h-full w-full rounded-full object-cover" />
      ) : (
        <span className="grid h-full w-full place-items-center rounded-full bg-bg-2 text-[22px] font-medium tracking-tight" aria-label={site.name}>
          {site.initials}
        </span>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="min-h-screen-dvh relative flex items-center justify-center overflow-hidden" aria-label="Introduction">
      <div className="col relative flex w-full flex-col items-center py-24 text-center">
        <div className="relative flex w-full flex-col items-center">
          <HeroLines />
          <div className="relative flex flex-col items-center">
            <Avatar />
            <h1 className="enter mt-7 text-[clamp(44px,10vw,88px)] font-medium leading-[0.95] tracking-[-0.045em]" style={{ "--d": "150ms" } as React.CSSProperties}>
              {site.name}
            </h1>
            <p className="enter mt-4 font-serif italic text-[clamp(22px,3.4vw,30px)] leading-tight text-fg-2" style={{ "--d": "300ms" } as React.CSSProperties}>
              {site.tagline}
            </p>
          </div>
        </div>
        <div className="mt-7">
          <StatusChip />
        </div>
        <div className="enter mt-8 flex gap-3" style={{ "--d": "550ms" } as React.CSSProperties}>
          <a className="pill-btn" data-variant="solid" href="#work">
            View work
          </a>
          <a className="pill-btn" href="#contact">
            Say hello
          </a>
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}
