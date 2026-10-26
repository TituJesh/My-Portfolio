import Image from "next/image";
import { site } from "@/data/content";
import { GitHub, Instagram, LinkedIn, Mail, MapPin, Palette, Terminal } from "./Icons";
import HeroLines from "./HeroLines";
import StatusChip from "./StatusChip";
import Contributions from "./Contributions";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      {/* Canvas: the name with the drawn lines around it */}
      <div className="hero-canvas relative overflow-hidden border-b border-line">
        <span className="dim dim-top mono-meta" aria-hidden>
          768
        </span>
        <HeroLines />
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <h1 className="enter text-[clamp(44px,9vw,84px)] font-medium leading-[0.95] tracking-[-0.045em]" style={d(0)}>
            {site.name}
          </h1>
          <p className="enter mt-3 font-serif italic text-[clamp(21px,3vw,28px)] leading-tight text-fg-2" style={d(150)}>
            {site.tagline}
          </p>
        </div>
      </div>

      {/* Profile row: avatar cell + role */}
      <div className="grid grid-cols-[112px_1fr] border-b border-line sm:grid-cols-[144px_1fr]">
        <div className="relative grid place-items-center border-r border-line p-4">
          <span className="dim dim-left mono-meta" aria-hidden>
            Ø96
          </span>
          <div className="enter relative h-20 w-20 rounded-full border border-line-2 p-1 sm:h-24 sm:w-24" style={d(300)}>
            <span className="absolute inset-[-5px] rounded-full border border-line" aria-hidden />
            {/* Ink sketch avatar, one ink colour per theme, with eyelids that blink */}
            <div className="avatar relative h-full w-full overflow-hidden rounded-full bg-bg-2">
              <Image src="/avatar-ink-dark.webp" alt={`Ink sketch of ${site.fullName}`} width={480} height={480} priority className="avatar-ink avatar-ink-light h-full w-full" />
              <Image src="/avatar-ink-light.webp" alt="" width={480} height={480} priority aria-hidden className="avatar-ink avatar-ink-dark h-full w-full" />
              <span className="lid lid-l" aria-hidden />
              <span className="lid lid-r" aria-hidden />
            </div>
          </div>
        </div>
        <div className="cell-pad enter flex flex-col justify-center gap-1" style={d(380)}>
          <p className="text-[18px] font-medium sm:text-[20px]">{site.fullName}</p>
          <p className="text-[14.5px] text-fg-2">{site.role}. Chennai, India.</p>
          <div className="mt-2">
            <StatusChip />
          </div>
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
            <Mail className="shrink-0 text-fg-3" />
            <dt className="sr-only">Email</dt>
            <dd className="text-[14px]">
              <a className="hover:text-accent" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
        </dl>

        <p className="mono-meta cell-pad border-b border-line py-2">Social links</p>
        <ul className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
          {[
            { href: site.github, label: "GitHub", Icon: GitHub },
            { href: site.linkedin, label: "LinkedIn", Icon: LinkedIn },
            { href: site.instagram, label: "Instagram", Icon: Instagram },
            { href: site.gallery, label: "Design gallery", Icon: Palette },
          ].map(({ href, label, Icon }, i) => (
            <li key={label} className={`border-line ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i < 3 ? "sm:border-r" : "sm:border-r-0"}`}>
              <a href={href} rel="me noreferrer" className="cell-pad flex items-center gap-3 text-[14px] transition-colors hover:bg-bg-2">
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
