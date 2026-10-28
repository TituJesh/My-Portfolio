// Small inked elements over the hero photo, each with its own slow CSS loop (see .glyph-* in globals.css):
// a sun that bobs, three gulls that sway and hop, a sailboat that drifts along the horizon, and a buoy lamp
// that blinks. All are decorative; the keyframes only run when the viewer has not asked for reduced motion.
export default function HeroGlyphs() {
  return (
    <svg className="hero-glyphs" viewBox="0 0 768 380" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      {/* sun, low in the sky on the left */}
      <g className="glyph glyph-sun" style={{ transformOrigin: "128px 118px" }}>
        <circle cx="128" cy="118" r="16" />
        <circle cx="128" cy="118" r="24" fill="none" strokeDasharray="2 7" />
      </g>

      {/* gulls: a loose M stroke each, staggered so they never move in step */}
      <g className="glyph glyph-gull" style={{ transformOrigin: "486px 84px", animationDelay: "0s" }}>
        <path d="M472 88 q7 -8 14 0 q7 -8 14 0" />
      </g>
      <g className="glyph glyph-gull" style={{ transformOrigin: "540px 66px", animationDelay: "-1.3s" }}>
        <path d="M530 69 q5 -6 10 0 q5 -6 10 0" />
      </g>
      <g className="glyph glyph-gull" style={{ transformOrigin: "602px 100px", animationDelay: "-2.1s" }}>
        <path d="M590 103 q6 -7 12 0 q6 -7 12 0" />
      </g>

      {/* sailboat on the horizon, drifting right and back */}
      <g className="glyph glyph-boat" style={{ transformOrigin: "620px 214px" }}>
        <path d="M604 214 h30 l-4 6 h-22 z" />
        <path d="M620 190 v24 M620 191 l14 18 h-14 z" />
      </g>

      {/* buoy with a blinking lamp, in the chop on the right */}
      <g className="glyph glyph-buoy" style={{ transformOrigin: "672px 262px" }}>
        <path d="M664 268 h16 l-3 -10 h-10 z" />
        <path d="M672 258 v-8" />
        <circle className="glyph-lamp" cx="672" cy="247" r="3" />
      </g>
    </svg>
  );
}
