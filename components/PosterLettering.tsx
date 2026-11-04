import type { SVGProps } from "react";
import localFont from "next/font/local";

const designerFont = localFont({ src: "../app/fonts/anton-regular.ttf", weight: "400", display: "swap" });

// Hand-drawn display glyphs. Both the printed face and its hairline overlay use
// these same Bézier paths, so texture can never introduce ragged outline edges.
const glyphs: Record<string, { width: number; path: string }> = {
  D: { width: 144, path: "M0 0H69C122 0 144 23 144 73V227C144 277 122 300 69 300H0ZM36 16V284H69C97 284 108 267 108 237V63C108 33 97 16 69 16Z" },
  E: { width: 116, path: "M0 0H116V16H36V137H103V153H36V284H116V300H0Z" },
  S: { width: 190, path: "M184 85H117V73C117 53 109 46 95 46C80 46 73 55 73 70C73 91 85 104 113 122C170 158 190 180 190 226C190 278 156 304 94 304C29 304 0 277 0 222V207H69V225C69 246 77 255 94 255C111 255 120 246 120 229C120 208 107 196 76 176C23 142 3 116 3 72C3 22 35 -4 96 -4C156 -4 184 22 184 74Z" },
  I: { width: 36, path: "M0 0H36V300H0Z" },
  G: { width: 200, path: "M200 96H130V77C130 54 120 46 102 46C81 46 72 57 72 83V218C72 246 81 257 102 257C123 257 132 245 132 222V190H101V139H200V300H163L150 276C136 296 117 304 88 304C29 304 0 274 0 210V91C0 25 33 -4 102 -4C170 -4 200 24 200 85Z" },
  N: { width: 200, path: "M0 0H73L135 171L132 0H200V300H128L65 126L68 300H0Z" },
  R: { width: 200, path: "M0 0H100C166 0 195 26 195 82V94C195 129 180 150 153 161L200 300H125L88 177H70V300H0ZM70 56V123H93C116 123 125 114 125 91V87C125 64 116 56 93 56Z" },
  M: { width: 180, path: "M0 0H48L90 247L132 0H180V300H144V59L108 300H72L36 59V300H0Z" },
  U: { width: 144, path: "M0 0H36V248C36 274 48 284 72 284C96 284 108 274 108 248V0H144V248C144 286 122 304 72 304C22 304 0 286 0 248Z" },
  L: { width: 116, path: "M0 0H36V284H116V300H0Z" },
  T: { width: 144, path: "M0 0H144V16H90V300H54V16H0Z" },
  // The reference's last A has an arched shoulder rather than a pointed apex.
  A: { width: 144, path: "M0 300V81C0 60 17 47 44 42L108 30V26C108 8 97 0 79 0C61 0 53 10 53 27H17C17 -2 37 -18 78 -18C122 -18 144 0 144 34V257C144 275 146 289 151 300H113C110 294 108 284 108 271V169H36V300ZM36 153H108V47L59 59C43 63 36 71 36 84Z" },
};

function Word({ text, x, y, width, height, narrow = false, glyphScaleWidth = width }: { text: string; x: number; y: number; width: number; height: number; narrow?: boolean; glyphScaleWidth?: number }) {
  const glyphWidth = [...text].reduce((sum, letter) => sum + glyphs[letter].width, 0);
  const total = glyphWidth + (narrow ? 32 : 30) * (text.length - 1);
  const scaleX = glyphScaleWidth / total;
  // Keep the word's endpoints while sharing the same stem scale as MEDIA.
  const gap = (width / scaleX - glyphWidth) / (text.length - 1);
  let cursor = 0;
  return <g transform={`translate(${x} ${y}) scale(${scaleX} ${height / 300})`} fillRule="evenodd">
    {[...text].map((letter, i) => {
      const offset = cursor;
      cursor += glyphs[letter].width + gap;
      return <path key={i} d={glyphs[letter].path} transform={`translate(${offset} 0)`} />;
    })}
  </g>;
}

export function DesignerWord(props: SVGProps<SVGGElement>) {
  return <g {...props}><text x="225" y="1585" fontFamily={designerFont.style.fontFamily} fontWeight="400" fontSize="400" letterSpacing="6" textLength="1985" lengthAdjust="spacingAndGlyphs">DESIGNER</text></g>;
}

export function MultimediaWords(props: SVGProps<SVGGElement>) {
  return <g {...props}>
    <Word text="MULTI" x={250} y={370} width={775} height={840} narrow />
    <Word text="MEDIA" x={1375} y={370} width={775} height={840} narrow />
  </g>;
}

export function AlsoBadge() {
  return <g transform="translate(240 267) rotate(-4)">
    <path d="M-17 14H291V151H-17Z" fill="#111013" />
    <path d="M0 0H305V132H0Z" fill="#edae27" stroke="#111013" strokeWidth="5" />
    <text x="20" y="105" fill="#111013" stroke="#edae27" strokeWidth="1.2" fontFamily="Impact, 'Arial Narrow', sans-serif" fontWeight="400" fontSize="110" textLength="265" lengthAdjust="spacingAndGlyphs">Also a</text>
  </g>;
}
