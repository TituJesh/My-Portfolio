# Titu Jeshurun — portfolio

A calm, centered portfolio for a designer and cloud engineer. Next.js (App Router), TypeScript, Tailwind CSS v4. Motion is CSS plus a little requestAnimationFrame; there is no animation library.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

## Edit content

Everything editable lives in `data/content.ts`: name, tagline, region, email, calendar link, social links, bio lines, the Design / Cloud columns, projects (with their detail-page copy), stack groups, notes and footer text. Anything wrapped in square brackets is a placeholder.

- Avatar: set `site.photo` to a square image in `public/` (for example `/photo.jpg`). Until then the initials show.
- Project thumbnails: replace the SVGs in `public/work/` and update `thumbnail` in each project (keep `width` and `height` accurate so there is no layout shift).
- Notes: each entry gets a page at `/notes/<slug>`; the body text is in `app/notes/[slug]/page.tsx`.

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

Fonts (via `next/font`, swap, with fallbacks): Inter Tight 400/500, Instrument Serif italic, JetBrains Mono 400.

## Theme

`data-theme` on `<html>` is set before paint by an inline script (saved choice, else `prefers-color-scheme`). The toggle in the navbar writes `localStorage.theme`.

## Deploy

Set `site.url` in `data/content.ts` to the production domain first; it feeds the canonical URL, Open Graph image URL, sitemap and robots.

- **Vercel:** import the repository, framework preset Next.js, no extra settings. Set `site.deployHost` to `"Vercel"`.
- **Cloudflare Pages:** use the OpenNext Cloudflare adapter (`npx @opennextjs/cloudflare`), build command `npx opennextjs-cloudflare build`, output `.open-next`. Set `site.deployHost` to `"Cloudflare Pages"`.

## Structure

- `app/` routes, `globals.css` (tokens and motion), OG and Twitter images, `sitemap.ts`, `robots.ts`, icons.
- `components/` small components named by purpose: `PipelineNav`, `Hero`, `HeroLines`, `StatusChip`, `ScrollHint`, `Section`, `WorkList`, `RevealObserver`, `ThemeToggle`, `Footer`, `Icons`.
- `data/content.ts` all copy and links.
