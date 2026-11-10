# Portfolio — Titu Jeshurun

A responsive, high-performance, and visually crafted developer and multimedia designer portfolio built using **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Three.js**. It features a ruled 768px blueprint frame, interactive tactile 3D controls, a live GitHub activity calendar with real-time stats, and a 3D WebGL poster showcase.

**Live Demo:** [titujeshurun.me](https://titujeshurun.me)

---

## Features

- **Ruled Blueprint Grid & Editorial Layout**: Structured on a centered 768px frame with hatched section dividers, bespoke serif accents, and responsive typography.
- **Dynamic Theme Switcher**: Instant switching between an ink-on-paper light theme (tinted to natural landscape hues) and a sleek neutral dark theme, with zero-flicker pre-paint detection and `localStorage` sync.
- **Interactive 3D Tactile Buttons**: Physical depth buttons with soft ambient shadows, realistic press animations, and subtle white neon hover blooms.
- **Live GitHub Contributions Calendar**: Client-side integration fetching real-time contribution heatmaps, complete with a collapsible dropdown card, total contribution count, and a recent-activity mini heat strip.
- **3D WebGL Poster Ring Carousel**: Lazy-loaded Three.js carousel (`@react-three/fiber` & custom shaders) featuring cylindrical curvature, depth occlusion, and mouse-drag scrubbing to showcase multimedia design work.
- **Interactive Pipeline Navbar**: Persistent floating pipeline navigation bar with section-by-section progress fill, auto-condense on scroll, and quick section jumping.
- **Project Deep Dives**: Detailed case study pages featuring full-scale AWS architecture diagrams, infrastructure-as-code breakdown, API specs, and test outcomes.
- **Single Source of Truth**: All editable content—bio, experience log, stack groups, certifications, project copy, and links—is configured in a single file (`data/content.ts`).
- **Responsive & Accessible**: Fully accessible markup (`prefers-reduced-motion` support, keyboard navigation, semantic landmarks) optimized for mobile, tablet, and desktop screens.

---

## Tech Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & custom CSS design tokens
- **3D & Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) (`@react-three/drei`)
- **Icons**: Custom SVG vector icon system
- **Motion & Reveal**: CSS transitions with custom cubic-bezier curves and Intersection Observer triggers
- **Deployment**: [Vercel](https://vercel.com/) / [Cloudflare Pages](https://pages.cloudflare.com/)

---

## Project Structure

```text
titu-portfolio/
├── app/
│   ├── design-gallery/        # Fullscreen multimedia design gallery
│   ├── work/
│   │   └── [slug]/            # Dynamic project architecture & case-study pages
│   ├── fonts/                 # Local typography files
│   ├── globals.css            # Design tokens, utility classes, and layer styles
│   ├── layout.tsx             # Root layout with theme initializer and metadata
│   ├── page.tsx               # Portfolio single-page layout (About, Work, Stack, Log, Contact)
│   ├── sitemap.ts             # Search engine sitemap generation
│   └── robots.ts              # Search crawler instructions
│
├── components/
│   ├── PipelineNav.tsx        # Floating navbar with stage indicator & progress tracking
│   ├── Hero.tsx               # Atmospheric hero banner with drifting landscape & live clock
│   ├── Contributions.tsx      # Collapsible GitHub contributions dropdown & heat strip
│   ├── WorkGrid.tsx           # Interactive project showcase grid with thumbnail cards
│   ├── DesignerPoster.tsx     # Section holding the 3D WebGL poster ring
│   ├── PosterRing3D.tsx       # Three.js 3D cylindrical canvas for design posters
│   ├── Section.tsx            # Numbered section container with hatched top band
│   ├── CopyEmail.tsx          # 1-click clipboard email copy button with fallback
│   ├── ThemeToggle.tsx        # Dark/light mode switcher with animated icon
│   └── Icons.tsx              # Unified SVG outline icon suite
│
├── data/
│   └── content.ts             # Central source of truth for all portfolio data and copy
│
└── public/
    ├── design/                # Poster assets and visual artwork
    ├── work/                  # Architecture diagrams and project screenshots
    └── avatar-figure.webp     # Custom ink sketch avatar
```

---

## Local Setup & Development

### 1. Clone the repository
```bash
git clone https://github.com/TituJesh/My-Portfolio.git
cd My-Portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Code Quality & Type Checking
```bash
# Run TypeScript compilation check
npm run typecheck

# Run ESLint validation
npm run lint
```

---

## Build & Production

To compile an optimized production build and launch the local production server:

```bash
# Build the production application
npm run build

# Start the production server
npm run start
```

---

## Configuration & Customization

All portfolio content is decoupled from components and managed centrally in [`data/content.ts`](data/content.ts):

- **Personal Profile**: Name, role, location, bio paragraphs, and social profiles.
- **Projects**: Add or edit projects, facts, architecture diagrams, and stack tags.
- **Experience Log**: Career milestones, roles, and bullet points.
- **Design Posters**: Update the 3D carousel items by referencing images placed in `public/design/`.
- **Design Tokens**: Modify color palette, typography, and motion parameters at the top of [`app/globals.css`](app/globals.css).

---

## Contact & Connect

- **Author**: Titu Jeshurun
- **Portfolio**: [titujeshurun.me](https://titujeshurun.me)
- **GitHub**: [@TituJesh](https://github.com/TituJesh)
- **LinkedIn**: [/in/titu-jeshurun](https://www.linkedin.com/in/titu-jeshurun)
- **Email**: [titujesh@gmail.com](mailto:titujesh@gmail.com)

---

## License

This project is open source and available under the [MIT License](LICENSE).
