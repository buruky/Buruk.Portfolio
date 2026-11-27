# Project covers: brief

A single cover system for every project. Each cover is the still that shows before a project's clip plays, and it
stands in for the clip when a project has none. Read `PRODUCT.md`, `docs/motion-language.md` and
`src/styles/tokens.css` first.

## Why: what the pages show today (checked 2026-11-27, 1440px, day mode)

Project media is the one part of the site that doesn't look designed. Everything around it has a system: the
time-of-day worlds, Anybody display type, the mono `[01] · LANE` labels, film grain, the red thread and the glass
ብሩኽ. The project media is raw screenshots, and each one looks different:

- **Too small to read.** Full app screens shrunk to a 420px card (the /work hover row and the Home "Selected work"
  frames) turn into grey noise. ECC's case list and closure-packet modal can't be read at that size.
- **Washed out.** On Home, the frames sit under the green veil and read as flat grey boxes. The glow-frame idea
  (`src/components/FeaturedWork.astro`) isn't coming through, because the screenshots have no colour to glow with.
- **Clashing heroes.** On `/work/[slug]`, the full-screen hero puts the screenshot behind the title. On ECC it's
  illegible UI behind the words. On Fabriq the app's own serif "FABRIQ." wordmark competes with the display
  "Fabriq" title. Between Worlds works, because its pixel art already has its own look.
- **Every project is the same blue.** Work is the noon world, so all six projects share one colour and nothing
  tells them apart at a glance.
- **Weak "Next project" card.** It's a dark slab with a faint screenshot.
- **Only ECC has a clip** (`src/lib/projects.ts`), so for most projects the cover is the only image.
- **No social preview.** No page sets an `og:image`, so a shared link to a project has no image.

## The idea that ties it together: every project gets its own time of day

The site's biggest idea is that every page is a time of day (`src/lib/worlds.ts`). Projects should get one as well.
Each cover is lit like its own world, with the same light, grain and depth recipe the pages use. A project then
looks like the same "place" on every surface, and the Work list reads as a day passing.

| # | Project | World | Why | The one piece of the project on the cover |
|---|---|---|---|---|
| 01 | ECC Case Management | golden | Asmara's hour; it serves the Eritrean community | the 8-stage pipeline (already built as chips in `CaseStudy.astro`) |
| 02 | Fabriq | afternoon | bright, daily, clothes in daylight | one outfit card: top, bottom, shoes |
| 03 | Between Worlds | dusk | two versions of every level, the in-between hour | the game art split down the middle, one world on each side |
| 04 | Quantum Computing | midnight | abstract and late | the circuit diagram as line art |
| 05 | NASA GRACE | night | the satellite, and it matches the Research page | the predicted vs actual line (in `screenshots/nasa-grace-climate-research.png`), or the MSE bars `GraceChart.astro` already draws |
| 06 | Beaches and Barrels | sunset | a beach | a tile from the dungeon map |

These world picks are suggestions. Swap them freely, but keep every project on a different one.

## Cover anatomy (one template, same on every project)

1. **Light field.** The world's sky colour and gradient, with the page recipe's vignette and film grain. No photos,
   so nothing is generated and nothing needs a credit.
2. **One real piece, big.** A single component of the project at a readable size, never a full screen. It sits as a
   lit pane: slight tilt, a shadow cast by the world's light, and a gloss edge. It shows real UI, crisp and readable.
3. **The mark.** The project's real logo if it has one. Otherwise its name in Anybody, set like the page titles.
   One per cover.
4. **Mono labels** in the corners, matching the rest of the site: `[01]`, the lane, and the stat when there is one
   ("10 staff · every day", "3rd of 10+ teams", "2.25× lower error").

Rules:
- **No glass.** Glass is reserved for ብሩኽ. The owner wants it as a recurring asset, not a general style.
- **No look-alikes.** No sticker art, no product-marketing renders, and no SaaS feature callouts. The owner rejected
  all of these as "too websity" or cheap. Aim for personality, like something being shown off.
- **Fixed size.** 16:10, so it drops into every slot below without re-cropping.

## Where the cover goes

| Surface | File | Now |
|---|---|---|
| Work list, row expands on hover | `src/pages/work.astro` `.media` | screenshot |
| Work list, phone thumbnail | `src/pages/work.astro` `.thumb` | screenshot |
| Home, Selected work frames + glow | `src/components/FeaturedWork.astro` | screenshot, GRACE is drawn |
| Project page hero | `src/pages/work/[slug].astro` `.stage` | screenshot behind title |
| Next project card | `src/pages/work/[slug].astro` `.next` | faint screenshot |
| Link previews | `src/layouts/Base.astro` | **missing**: add `og:image` per project, 1200×630 crop of the cover |

On the project page hero, the cover's light field becomes the hero background, so the title sits on colour and not
on UI.

## Cover → clip handoff

- When a clip exists, it starts on the same frame as the cover's UI piece and crossfades in, so it reads as a match
  cut (the picture comes alive) and not as a swap.
- The cover always stays underneath, so it shows while the clip loads, when there's no clip, and with
  `prefers-reduced-motion` (no clip plays then). `/work/[slug]` breaks this today: its `<video autoplay>` ignores
  reduced motion. Gate it the way `work.astro` does.
- Clip spec is unchanged (`src/lib/projects.ts`): 3–8 s, muted, 16:10, under about 2 MB.

## Build notes

- Build it as one Astro component (HTML/CSS, data from `content/site.json`), so it stays in sync with the copy and
  follows Day/Night (`src/lib/night.ts`). Don't use hand-made image files that drift out of date.
- `og:image` needs a raster. Screenshot the component once per project with a small script. Playwright is not a
  project dependency: run it with `npx playwright` or a throwaway install outside the repo into `content/media/images/covers/`. Don't add a dependency for it.
- Keep it light on phones: no WebGL and no per-frame JS. The cover is static, and hover only adds a small tilt/sheen
  like the Home cards.
- `npm run build` and `npm run check` must pass.

## Open questions for the owner

1. Do ECC, Fabriq and Beaches and Barrels have real logos? If not, the mark is the name in Anybody.
2. Are the world picks in the table OK?
3. Should the cover replace the Home "Selected work" frames as well, or only the Work pages?
