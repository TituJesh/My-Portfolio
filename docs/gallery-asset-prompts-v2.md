# Gallery asset prompts — revision 2

Mode: built-in imagegen. Original inputs preserved; generated PNGs copied into `public/design-gallery/`, with optimized WebP siblings. All three PNGs have real alpha transparency.

Validation: visual inspection plus Sharp metadata/channel statistics confirmed real alpha ranges of 0–255 in all PNG and WebP outputs. A targeted edge-cleanup iteration was attempted on the about portrait and ME/WE lettering; the refined about portrait was selected, while the first ME/WE version was retained. Very fine edge residue can remain from generative extraction; source images are preserved.

Follow-up about prompt: Precise edge cleanup ONLY on this existing transparent cutout. Remove jagged pale-white scraps, light halos and stray pixels OUTSIDE the actual shirt and shoulders silhouette, especially left upper arm side and right shoulder upper slope. Preserve every pixel inside the man's intended silhouette, all face identity, illustration shapes, pose, arms, white shirt, watch, original crop and colors unchanged. Output true transparent alpha with clean smooth antialiased edges right along actual shirt boundary, no surrounding fringe, debris, new background or redesign. Keep same portrait aspect ratio.

Follow-up ME/WE prompt (not selected): Precise edge cleanup ONLY on this existing transparent typographic cutout. Preserve exact navy ME, pale-gray curling WE and burgundy shadow/extrusion letter silhouettes, colors, positions and perspective. Remove unwanted jagged white residue, stray red/light pixels and fringes OUTSIDE letter boundaries and INSIDE all gaps between/beneath letters. All area not belonging to actual solid lettering or attached burgundy shadows must be fully transparent. Make clean smooth antialiased edges, no fuzzy light fringe or stray flecks. Do not redraw or change letters, do not alter layout, square canvas or proportions, no background.

## titu-about-cutout

Inputs: `C:/Users/Timo/Downloads/Gemini_Generated_Image_krkwsrkrkwsrkrkw_11zon.png`

Prompt:

Use case: background-extraction. Edit target: supplied illustrated portrait of man in white shirt with folded arms. Remove only teal background, diagonal background cast shadow, and small decorative sparkle behind elbow; output actual transparent alpha. Keep exact illustration unchanged: full visible body, identity, face, hair silhouette and details, expression, beard, clothing folds/shading, skin colors, crossed arms and watch. Preserve original portrait canvas and crop at waist. Clean smooth edges, no teal fringes, no repainting or restyling. This is a precise transparent cutout asset for a website. Keep high resolution approximately 1200 px or more on long edge.

## titu-projects-gold

Inputs: `E:/my pics/IMG_2401 cropped.png`, `C:/Users/Timo/AppData/Local/Temp/codex-clipboard-442fd9b0-4868-4f0e-a745-242600f16d28.png`

Prompt:

Use case: style-transfer with background-extraction. Image 1 is the ONLY portrait identity/pose to edit: man from rear three-quarter angle looking right. Image 2 is strictly a lighting and motion effect reference, NOT identity or pose. Remove all blue sky background and give Image 1 subject the same artistic effect seen in Image 2: warm golden/ochre chiaroscuro, soft luminous cream-gold diagonal wash across face/neck/right shoulder, dim amber-brown silhouetted remaining body, moody dark hair with subtle gold highlights, restrained fine vertical motion/light trails extending downward from torso, bottom fading gracefully into transparency. Keep Image 1 man's identity, original head angle, gaze right, hair shape, body pose and dark shirt shape. Retain readable recognizable facial structure through luminous light. Match sophisticated museum-poster subject effect, not shiny metal or sculpture. Output ONLY person plus tightly contained subtle translucent light trails on real transparent background. No frame, text, museum, other person, blue sky, scenery or opaque background. High resolution approximately 1400 px long edge.

## me-we-cutout

Inputs: `C:/Users/Timo/Downloads/ad3e1c4ddb273fd58eb7f8f6319bac75.jpg`

Prompt:

Use case: background-extraction. Edit target: supplied square ME/WE typographic artwork. Extract ONLY the navy upright 'ME', pale gray-white curling 'WE' paper letters and their attached dark burgundy extrusion/shadow letter forms. Remove all flat coral-pink background and the small bottom-left credit text. Output real transparent alpha including gaps inside/between letters. Preserve exact original letter silhouettes, arrangement, overlaps, colors, perspective, curl curves and relative positions. No redesign, no new letters, no added effects. Preserve square canvas proportions with artwork centrally placed at same scale. Clean anti-aliased edges without coral fringes. High resolution approximately 1200px square.

