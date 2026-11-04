import Image from "next/image";
import { useId } from "react";
import { designerPoster as d, site } from "@/data/content";
import { ArrowUpRight } from "./Icons";
import PosterRing from "./PosterRing";
import { AlsoBadge, DesignerWord, MultimediaWords } from "./PosterLettering";

// Full-bleed poster: the profile cut-out stands in front of the headline while a Three.js ring of
// posters orbits the head (PosterRing3D). Everything reveals when the section scrolls into view.
export default function DesignerPoster() {
  const id = useId();
  const letteringTransform = "translate(-240 -140) scale(1.20)";
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

        <div className="poster-scene">
          <svg className="poster-artwork" viewBox="0 0 2400 1792" aria-hidden="true">
            <defs>
              <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="0.8" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#a91508" />
                <stop offset="0.34" stopColor="#f32a08" />
                <stop offset="0.66" stopColor="#ff3509" />
                <stop offset="1" stopColor="#bb1c0c" />
              </linearGradient>
              <filter id={`${id}-print`} x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.48 0.62" numOctaves="3" seed="19" result="grain" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="1.35" intercept="0.12" />
                  <feFuncG type="linear" slope="1.35" intercept="0.12" />
                  <feFuncB type="linear" slope="1.35" intercept="0.12" />
                </feComponentTransfer>
                <feBlend in2="SourceGraphic" mode="multiply" result="printed" />
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="3" seed="8" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="2.8" intercept="-0.35" />
                  <feFuncG type="linear" slope="2.8" intercept="-0.35" />
                  <feFuncB type="linear" slope="2.8" intercept="-0.35" />
                </feComponentTransfer>
                <feBlend in2="printed" mode="multiply" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
              <filter id={`${id}-ink-halo`} x="-15%" y="-15%" width="130%" height="130%">
                <feGaussianBlur stdDeviation="13" />
              </filter>
              <filter id={`${id}-silhouette`}>
                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
              </filter>
              <clipPath id={`${id}-fill-area`}><rect x="0" y="1325" width="2400" height="500" /></clipPath>
              <mask id={`${id}-fill-knockout`} maskUnits="userSpaceOnUse" x="0" y="0" width="2400" height="2100" style={{ maskType: "luminance" }}>
                <rect width="2400" height="2100" fill="white" />
                <g className="poster-artwork-cutout" clipPath={`url(#${id}-fill-area)`}>
                  <image href={d.photo.src} width="2400" height="1792" transform="matrix(1.14 0 0 1.14 -168 -70.2464)" filter={`url(#${id}-silhouette)`} />
                </g>
              </mask>
            </defs>
            <g mask={`url(#${id}-fill-knockout)`}>
              <g transform={letteringTransform}>
              <g fill="#f23616" opacity="0.6" filter={`url(#${id}-ink-halo)`}>
                <MultimediaWords /><DesignerWord />
              </g>
              <g fill={`url(#${id}-ink)`} filter={`url(#${id}-print)`}>
                <MultimediaWords /><DesignerWord />
              </g>
            </g>
            </g>
            <g transform={letteringTransform}><AlsoBadge /></g>
          </svg>
          <Image src={d.photo.src} alt={d.photo.alt} width={d.photo.width} height={d.photo.height} loading="lazy" className="poster-photo" />
          <svg className="poster-designer-outline" viewBox="0 0 2400 1792" aria-hidden="true">
            <defs>
              <mask id={`${id}-subject`} maskUnits="userSpaceOnUse" x="0" y="0" width="2400" height="2100" style={{ maskType: "alpha" }}>
                <image href={d.photo.src} width="2400" height="1792" transform="matrix(1.14 0 0 1.14 -168 -70.2464)" />
              </mask>
              <clipPath id={`${id}-designer`}><rect x="0" y="1325" width="2400" height="500" /></clipPath>
            </defs>
            <g mask={`url(#${id}-subject)`} clipPath={`url(#${id}-designer)`}>
              <DesignerWord transform={letteringTransform} fill="none" stroke="#c46a50" strokeWidth="3.5" strokeLinejoin="round" opacity="0.95" />
            </g>
          </svg>
          <div className="poster-ring-wrap">
            <PosterRing images={d.ring} />
          </div>
        </div>

        <h2 id="design-title" className="sr-only">Also a multimedia designer</h2>

        <div className="poster-caption">
          <p className="poster-blurb"><strong>Brands</strong>{d.blurb}</p>
          <a href={site.gallery} rel="noreferrer" className="poster-gallery-button">
            View the gallery <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
