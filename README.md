# Titu Jeshurun — portfolio

A calm, centered portfolio for a designer and cloud engineer, laid out on a ruled 768px frame with hatched bands between numbered sections. Next.js (App Router), TypeScript, Tailwind CSS v4. Motion is CSS plus a little requestAnimationFrame; Three.js is used only for the designer poster's ring and is lazy-loaded.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Edit content

Everything editable lives in `data/content.ts`: name, tagline, region, email, social links, the resume path (`site.resume`, a PDF in `public/`), bio lines, the Design / Cloud columns, projects (with their detail-page copy and architecture components), stack groups, the experience log, certifications and footer text. The content was filled from the GitHub profile README, the CloudExpire, Acedra and Self-Healing repositories, and the resume.

- Hero banner: `site.banner` is the photo band at the top (`public/hero-beach.webp`); it drifts slowly. The tagline over it is `site.heroScript` (calligraphy, Pinyon Script) above `site.heroCaps` (rust caps). `HeroGlyphs` draws small inked elements over the photo, a sun, gulls, a sailboat and a buoy lamp, each on its own slow CSS loop; all of it is still under `prefers-reduced-motion`.
- Avatar: `site.photo` is the ink sketch with a transparent background in `public/avatar-figure.webp`. The figure is black ink on its own paper silhouette, so it never changes; the disc outside it is `--avatar-bg`, which follows the page background in both themes. `site.photoClosed` is the same sketch with the eyes shut (`public/avatar-figure-closed.webp`, only the eye band differs); it sits on top and the `blink` keyframes flash it for a few frames every five seconds. The dimension label beside the avatar is a live HH:MM clock in `site.timeZone` (`DimClock`).
- Project images live in `public/work/`: `thumbnail` is the card on the home page, the optional `banner` is the wide image at the top of the project page, and `architecture.image` is the diagram. Keep `width` and `height` accurate so there is no layout shift. The project copy, facts, features, stack and API tables are taken from each repository's README on GitHub.
- Designer poster (bottom of the page): headline, labels, the profile cut-out and the ring of posters are in `designerPoster` in `data/content.ts`; replace any ring entry's `src` with a file in `public/design/`. The ring is a Three.js carousel (`components/PosterRing3D.tsx`, loaded on the client only): curved two-row cards with a custom shader for directional blur, glitch, chromatic shift and edge shading, a depth-only occluder for the head, hover slow-down and drag scrubbing.
- The GitHub contribution graph is fetched on the client from github-contributions-api.jogruber.de for `site.githubHandle` and hides itself if the request fails.

## Design tokens

All tokens are CSS variables at the top of `app/globals.css` (light values on `:root`, dark values on `:root[data-theme="dark"]`), then mapped to Tailwind utilities with `@theme inline`.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` / `--bg-2` | `#faf9f6` / `#f1efe9` | `#0f0f0e` / `#171715` |
| `--fg` / `--fg-2` / `--fg-3` | `#151412` / `#5c5955` / `#76736d` | `#ecebe6` / `#a3a09a` / `#8a877f` |
| `--line` / `--line-2` | 12% / 24% ink | 12% / 24% paper |
| `--accent` | `#c2410c` (rust) | `#ff8a5b` |
| `--ok` | `#15803d` | `#4ade80` |

Motion: `--ease: cubic-bezier(0.22, 1, 0.36, 1)`, `--t-micro: 150ms`, `--t-std: 300ms`, `--t-reveal: 600ms`. Layout: `--col: 720px`, `--nav-h: 48px`, `--radius: 8px`, pills `999px`, hairlines `1px`.

Fonts (via `next/font`, swap, with fallbacks): Inter Tight 400/500, Instrument Serif italic, JetBrains Mono 400, Pinyon Script 400 (hero tagline only).

## Theme

`data-theme` on `<html>` is set before paint by an inline script (saved choice, else `prefers-color-scheme`). The toggle in the navbar writes `localStorage.theme`.

## Deploy

Set `site.url` in `data/content.ts` to the production domain first; it feeds the canonical URL, Open Graph image URL, sitemap and robots.

- **Vercel:** import the repository, framework preset Next.js, no extra settings. Set `site.deployHost` to `"Vercel"`.
- **Cloudflare Pages:** use the OpenNext Cloudflare adapter (`npx @opennextjs/cloudflare`), build command `npx opennextjs-cloudflare build`, output `.open-next`. Set `site.deployHost` to `"Cloudflare Pages"`.

## Structure

- `app/` routes, `globals.css` (tokens and motion), OG and Twitter images, `sitemap.ts`, `robots.ts`, icons.
- `components/` small components named by purpose: `PipelineNav`, `Hero`, `HeroGlyphs`, `StatusChip`, `Contributions`, `Section`, `WorkGrid`, `Testimonials`, `CopyEmail`, `DesignerPoster`, `RevealObserver`, `ThemeToggle`, `Footer`, `Icons`.
- `data/content.ts` all copy and links.
