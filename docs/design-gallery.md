# Design gallery

The standalone gallery is at `/design-gallery`. The existing home page and its gallery links have not been changed by this implementation.

## Content

- `data/design-gallery.ts`: designer profile, designer email, About text, tool proficiency, Spotify link, and photographs.
- `data/design-gallery-projects.ts`: all 26 projects migrated from the old design portfolio, with original client names, years, descriptions, and complete media sets.
- Client reviews are read from the existing `testimonials` export in `data/content.ts`.
- `public/design-gallery/work/`: 33 optimized artwork images and three real video preview frames.

Sections appear in this order: About, Tools, Projects, Reviews, Photographs, Contact.

To add photographs, put the images in `public/design-gallery/photos/` and add `{ src, title, location }` entries to `photographs` in `data/design-gallery.ts`. The photography section is a reconstructed clipboard with separate paper, polaroid, filmstrip, pen, and camera elements. Its frames remain empty until Titu’s photographs are supplied.

The Spotify player loads on click using the supplied Face Like Me embed. Project videos load only when their project opens. They currently use the verified source URLs from the old portfolio; the résumé also uses its original URL. Keep that site available until those media files are migrated.

## Visual assets

- `desk-entry.webp`: edited desk scene with TITU lettering and darker hands.
- `titu-projects-gold.webp`: transparent rear portrait with golden lighting and trailing fade, layered with an echo in the museum scene.
- `titu-review.webp`: transparent profile portrait used among client notes.
- `titu-about-cutout.webp`: transparent illustrated portrait in the mustard and forest-green About poster.
- `me-we-monochrome.webp`: transparent dimensional lettering in Contact, with black ME and light WE; the red shadow is removed. The PNG master is retained.
- `ornate-gold-frame.webp`, `honey-cloud.webp`, `honey-bee.webp`: separate transparent decorative objects.
- `face-like-me-visual.mp4`: the supplied 20-second city-walk video with its audio removed and fast-start enabled. The original file is unchanged. Its WebP poster shows before playback.

The About poster, museum wall, project pinboard, honey-colored review scene, photography scrapbook, and contact notebook are composed from individual HTML/CSS layers and cutouts. The second supplied video informed staggered reveals and overlapping motion only; it is not embedded or used as visual artwork. Asset prompts and inspection notes are recorded in `gallery-asset-prompts-v2.md` and `gallery-decoration-prompts-v2.md`.

PNG masters for the generated desk and cutouts are retained beside the WebP files. Image editing used the image-generation tool, which may introduce small changes to photographic details.

## Animation and accessibility

The entrance takes approximately 3 seconds: it begins overhead, pans toward the monitor, and straightens its perspective until the live page fills the viewport at exactly 1:1 scale. It can be skipped or explicitly replayed. Reduced-motion preferences skip the automatic entrance; Replay remains available. Anchor visits retain the entrance so it is not silently missed.

Section reveals use IntersectionObserver. Scroll-driven layer offsets update only for visible sections, coalesced into one animation frame without React renders on scroll. Decorative rotations, hovering bees, and light movement pause outside the viewport. The header motion control pauses page animations and the city-walk video. The video plays silently only while visible, with its own play/pause control; Spotify audio requires user interaction. There is no WebGL scene or scroll hijacking.

Project details use a native dialog with keyboard focus containment, Escape dismissal, previous/next image buttons, and user-controlled video playback. Creative-tool tabs support arrow keys, Home, and End. Mobile navigation expands from the header. Email actions open the visitor’s mail application or copy the address; no submission backend is implied.

## Validation

- `npm run typecheck`
- `npm run build -- --webpack`
- Browser checks at 1280×720 and 390×844: section order, layered compositions, project filtering, image modal, Escape dismissal, arrow-key tool tabs, silent video playback and motion pause, mobile navigation, contact artwork, Spotify embed, no broken images, and no horizontal overflow.

The default Turbopack build encountered a Windows worker-process error in an existing font CSS module. The supported webpack production build succeeded. Performance on every Chrome/device combination has not been benchmarked.


## Latest refinement

The camera uses the live gallery DOM, projected onto four measured glass corners (241,98), (874,98), (810,350), (312,350) of the 1122×1402 desk photograph. It holds overhead for 350 ms, pans to a front-facing monitor until 1700 ms, and opens to the viewport until 2850 ms. The final 150 ms hold an identity matrix. Content height expands to the viewport without stretching the portrait layout. Desktop and phone final transforms were inspected in the browser and both reached `matrix(1, 0, 0, 1, 0, 0)`.

Both sides of section joins now fade to a shared palette. The museum frame dissolves into the project pinboard, including a separate mask for the pinboard grid. Reviews includes separately rendered background lettering, cassette, vinyl, filmstrip, ruled lines, cloud and bee assets. The portrait uses a warm sepia grade and a soft shadow. Visible scenes use a short smoothed transform update; layout bounds are read only on input/resize events. Opening-scene parallax starts at zero for a stable entrance handoff. Pinboard threads adapt to the number of visible cards and the mobile two-column grid.

The Contact edit was made with the built-in image-generation tool. Final assets: `public/design-gallery/me-we-monochrome.png` and the optimized `me-we-monochrome.webp`. The navy ME was changed to near-black; the burgundy WE shadow was removed and the light folded WE retained. Original assets are unchanged. The final editing prompt was:

> Clean up this exact black ME and white dimensional folded WE transparent artwork. Preserve exact composition and typography. Remove ALL white flecks, grainy edges, fringe, stray pixels and debris from the empty/transparent gaps between and around the letters. The background and gaps must be completely transparent, with pristine smooth antialiased edges on the letters. Only two solid black upper letters ME and two white folded foreground letters WE with neutral grey curves; no red shadow or underside. Professional clean vector-like finish, no outline, no glow, no shadow, no added content. Keep full letterforms intact.

The Pinterest reference was opened in the browser but a sign-in panel obscured part of it. The local MP4 was inspected using its previously extracted contact sheet; its layered typography/portrait progression informed motion only.

Latest checks: TypeScript passed; the webpack production build passed after stopping the development server and retrying with the required filesystem access. The first overlapping build encountered a Windows EPERM on generated `.next` output. Browser checks verified both desktop and mobile entrance final matrices, responsive widths without horizontal overflow, no broken loaded images, mobile menu closure, two Branding results, native dialog/Escape, arrow-key tool selection, and the motion pause control. A review preview is saved in `docs/previews/gallery-reviews-refined.jpg`.
