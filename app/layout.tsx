import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono, Pinyon_Script } from "next/font/google";
import localFont from "next/font/local";
import RevealObserver from "@/components/RevealObserver";
import { site } from "@/data/content";
import "./globals.css";

const sans = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sans", display: "swap", fallback: ["system-ui", "Arial"] });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif", display: "swap", fallback: ["Georgia", "serif"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap", fallback: ["Menlo", "Consolas", "monospace"] });
// calligraphic face, used only for the hero tagline
// Trip Sans Bold from the project's own files, used only for the hero caps line
const tripSans = localFont({ src: "./fonts/trip-sans-bold.otf", weight: "700", variable: "--font-trip", display: "swap", fallback: ["Figtree", "Arial", "sans-serif"] });
const script = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-script", display: "swap", fallback: ["Brush Script MT", "cursive"] });
const heroSignature = localFont({ src: "./fonts/oooh-baby.ttf", weight: "400", variable: "--font-hero-signature", display: "swap", fallback: ["cursive"] });

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description: site.description, siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3e3" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

// Applies the saved theme before first paint so there is no flash. Falls back to the OS preference.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin, site.gallery],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} ${script.variable} ${tripSans.variable} ${heroSignature.variable}`} suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <RevealObserver />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
