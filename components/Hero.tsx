import Image from "next/image";
import { site } from "@/data/content";
import HeroAtmosphere from "./HeroAtmosphere";
import DimClock from "./DimClock";
import Contributions from "./Contributions";
import CopyEmail from "./CopyEmail";
import DesignGalleryLink from "./DesignGalleryLink";
import { GitHub, LinkedIn, MapPin, ArrowUpRight } from "./Icons";

export default function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <HeroAtmosphere>
        <div className="hero-landscape" aria-hidden>
          <Image src={site.banner.src} alt="" width={site.banner.width} height={site.banner.height} preload sizes="(max-width: 768px) 103vw, 792px" className="hero-photo" />
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <span className="sr-only">{site.banner.alt}</span>
        <p className="hero-words">
          <span className="hero-script">{site.heroScript}</span>
          <span className="hero-caps">{site.heroCaps}</span>
        </p>
      </HeroAtmosphere>
      <div className="profile-sheet">
        <div className="profile-topline">
          <div className="avatar-ring profile-portrait">
            <div className="avatar relative h-full w-full overflow-hidden rounded-full">
              <Image src={site.photo} alt={`Ink sketch of ${site.fullName}`} width={640} height={640} priority className="avatar-ink h-full w-full" />
              <Image src={site.photoClosed} alt="" width={640} height={640} aria-hidden className="avatar-ink avatar-blink h-full w-full" />
            </div>
          </div>
          <a className="profile-availability" href="#contact" title={site.availability}><span /> Open to opportunities <ArrowUpRight size={13} /></a>
        </div>
        <div className="profile-identity">
          <p className="profile-eyebrow">Cloud engineer <span> / </span> Creative thinker</p>
          <h1>{site.fullName}<span className="profile-name-dot">.</span></h1>
          <div className="profile-byline">
            <p>{site.tagline}</p>
            <div className="profile-location"><MapPin size={13} /><span>{site.location}</span><span className="profile-meta-divider" /><DimClock className="profile-clock" seconds /><span>IST</span></div>
          </div>
        </div>
        <div className="profile-actions">
          <div className="profile-socials">
            <a href={site.github} target="_blank" rel="me noreferrer" className="profile-social" aria-label="GitHub" title="GitHub profile"><GitHub size={18} /></a>
            <a href={site.linkedin} target="_blank" rel="me noreferrer" className="profile-social" aria-label="LinkedIn" title="LinkedIn profile"><LinkedIn size={18} /></a>
            <span className="profile-social-caption">Let’s connect</span>
          </div>
          <div className="profile-contact"><DesignGalleryLink /><CopyEmail email={site.email} label="Say hello" className="profile-email" /></div>
        </div>
        <Contributions />
      </div>
    </section>
  );
}
