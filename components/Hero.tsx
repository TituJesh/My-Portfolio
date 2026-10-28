import Image from "next/image";
import { site } from "@/data/content";
import { FileText, GitHub, LinkedIn, MapPin, Palette, Terminal } from "./Icons";
import CopyEmail from "./CopyEmail";
import HeroGlyphs from "./HeroGlyphs";
import DimClock from "./DimClock";
import Contributions from "./Contributions";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      {/* Banner: the beach photo drifting slowly, inked glyphs moving over it, and the tagline as calligraphy over caps */}
      <div className="hero-canvas relative overflow-hidden border-b border-line">
        {/* The photo pans steadily to the right. The strip is two tiles, the first mirrored, so the loop point
            and the join are both seamless; the strip starts on the unmirrored tile and the mirror creeps in from
            the left. Each tile stacks the dark frame and its two lightning-lit frames. */}
        <div className="hero-photo" aria-hidden>
          <div className="hero-strip">
            {[0, 1].map((t) => (
              <div key={t} className={`hero-tile${t ? "" : " hero-tile-mirror"}`}>
                <Image src={site.banner.src} alt="" width={site.banner.width} height={site.banner.height} priority sizes="(max-width: 768px) 100vw, 768px" className="hero-frame" />
                <Image src={site.bannerFlash[0]} alt="" width={site.banner.width} height={site.banner.height} sizes="(max-width: 768px) 100vw, 768px" className="hero-frame hero-flash-1" />
                <Image src={site.bannerFlash[1]} alt="" width={site.banner.width} height={site.banner.height} sizes="(max-width: 768px) 100vw, 768px" className="hero-frame hero-flash-2" />
              </div>
            ))}
          </div>
        </div>
        <span className="sr-only">{site.banner.alt}</span>
        <HeroGlyphs />
        <p className="hero-words relative flex h-full flex-col items-center justify-center text-center">
          <span className="enter hero-script" style={d(0)}>
            {site.heroScript}
          </span>
          <span className="enter hero-caps" style={d(140)}>
            {site.heroCaps}
          </span>
        </p>
      </div>

      {/* Profile row: the avatar is larger than its cell and rides up over the banner's bottom edge, as on rakhul.me */}
      <div className="grid border-b border-line sm:grid-cols-[216px_1fr]">
        {/* on phones the avatar sits alone above the name; from sm up it has its own cell beside it */}
        <div className="relative flex items-start justify-start px-4 pb-2 sm:justify-center sm:border-r sm:border-line sm:pb-4">
          {/* the vertical clock label only from sm up; on phones it would sit off the left edge */}
          <DimClock className="dim dim-left mono-meta hidden sm:block" />
          <div className="enter avatar-ring relative z-10 -mt-14 h-28 w-28 rounded-full border border-line-2 p-1 sm:-mt-[88px] sm:h-44 sm:w-44" style={d(300)}>
            <span className="absolute inset-[-5px] rounded-full border border-line" aria-hidden />
            {/* Ink sketch avatar: the ink stays black in both themes, only the circle behind it follows the theme */}
            <div className="avatar relative h-full w-full overflow-hidden rounded-full">
              <Image src={site.photo} alt={`Ink sketch of ${site.fullName}`} width={640} height={640} priority className="avatar-ink h-full w-full" />
              {/* eyes-closed frame of the same sketch, shown for a few frames every few seconds */}
              <Image src={site.photoClosed} alt="" width={640} height={640} aria-hidden className="avatar-ink avatar-blink h-full w-full" />
            </div>
          </div>
        </div>
        <div className="cell-pad enter flex flex-col justify-center gap-1 pt-0 sm:pt-4" style={d(380)}>
          <h1 className="text-[18px] font-medium sm:text-[20px]">{site.fullName}</h1>
          <p className="text-[14.5px] text-fg-2">
            {site.role}. Chennai, India.
            {/* on phones the clock rides on this line instead of the hidden vertical label */}
            <DimClock className="mono-meta ml-2 whitespace-nowrap sm:hidden" seconds dot />
          </p>
        </div>
      </div>

      {/* Overview: two-column metadata cells */}
      <div className="enter" style={d(460)}>
        <p className="mono-meta cell-pad border-b border-line py-2">Overview</p>
        <dl className="grid border-b border-line sm:grid-cols-2">
          <div className="cell-pad cell-row flex items-center gap-3 border-b border-line sm:border-r">
            <Terminal className="shrink-0 text-fg-3" />
            <dt className="sr-only">Role</dt>
            <dd className="text-[14px]">Cloud engineer, AWS and Terraform</dd>
          </div>
          <div className="cell-pad cell-row flex items-center gap-3 border-b border-line">
            <Palette className="shrink-0 text-fg-3" />
            <dt className="sr-only">Design</dt>
            <dd className="text-[14px]">Multimedia designer since 2021</dd>
          </div>
          <div className="cell-pad cell-row flex items-center gap-3 border-b border-line sm:border-b-0 sm:border-r">
            <MapPin className="shrink-0 text-fg-3" />
            <dt className="sr-only">Location</dt>
            <dd className="text-[14px]">{site.location}</dd>
          </div>
          <div className="cell-pad cell-row flex items-center gap-3">
            <dt className="sr-only">Email</dt>
            <dd className="text-[14px]">
              <CopyEmail email={site.email} className="hover:text-accent" />
            </dd>
          </div>
        </dl>

        <p className="mono-meta cell-pad border-b border-line py-2">Social links</p>
        <ul className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
          {[
            { href: site.github, label: "GitHub", Icon: GitHub },
            { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn },
            { href: site.resume, label: "Resume", Icon: FileText, file: true },
            { href: site.gallery, label: "Design gallery", Icon: Palette },
          ].map(({ href, label, Icon, file }, i) => (
            <li key={label} className={`border-line ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i < 3 ? "sm:border-r" : "sm:border-r-0"}`}>
              <a href={href} rel={file ? "noreferrer" : "me noreferrer"} target={file ? "_blank" : undefined} className="cell-pad flex items-center gap-3 text-[14px] transition-colors hover:bg-bg-2">
                <Icon className="text-fg-3" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <Contributions />
      </div>
    </section>
  );
}
