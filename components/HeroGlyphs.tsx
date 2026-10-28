// Small inked elements over the hero photo, each with its own slow CSS loop (see .glyph-* in globals.css):
// a sun that bobs, three gulls that sway and hop, and a buoy lamp that blinks. The lightning is two lit frames of the
// photo flickering in Hero (.hero-frame). All are decorative; the keyframes only run when the viewer has not asked for reduced motion.
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

      {/* buoy with a blinking lamp, in the chop on the right */}
      <g className="glyph glyph-buoy" style={{ transformOrigin: "672px 262px" }}>
        <path d="M664 268 h16 l-3 -10 h-10 z" />
        <path d="M672 258 v-8" />
        <circle className="glyph-lamp" cx="672" cy="247" r="3" />
      </g>
    </svg>
  );
}
