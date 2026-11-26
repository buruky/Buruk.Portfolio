# Redesign plan

One step at a time. For each step, Claude builds or proposes one thing, you review it, and we only move on when you're happy. We work out the details of each step when we get to it, not before.

**Where we are (2026-11-26):** Phases 0–3 done: Home is finished (glass ቡሩኽ intro and hero, the pond, the glass resting beside "Let's talk." at the end). **Next up: 4.1, the phone and speed pass**, before any new page is built.

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done

**Where the brief lives:** your questionnaire answers and decisions are in Claude's memory. References are in [`content/inspo/`](content/inspo/README.md). Prototypes: [glass intro](https://claude.ai/artifact/MQ9CURwH2sanqiL37P4azM) · [pond ripples](https://claude.ai/artifact/Rq9qo8BmQdsnvoxb5koQph) · [paper-terrain maps](https://claude.ai/artifact/G7jybKfMbBKVm21Z2oK5ZL) (kept for About).

---

## Big picture

The site is a set of **worlds you travel between**, and since the new hero they share one recipe:

- **A real photo** for each page (Home is Harnet Avenue in Asmara), softly blurred.
- **The page's time-of-day colour as a tint** over that photo, not a flat fill. The palette from step 1.2 stays; it just becomes see-through. Each page's light-to-dark change happens inside that page as you scroll (Home already goes from dark into morning green).
- **The glass ቡሩኽ**: the one object that travels with you through the whole site. It opens the site, floats behind Home, rests beside "Let's talk." at the end, and each page decides where it sits and how it reacts.
- **Water and glass as the way you touch things**: click for ripples, flick the letters. Nothing follows the pointer around ([docs/motion-language.md](docs/motion-language.md) §6).

Your story still runs as a line through time, ending in a glitchy, unfinished chapter. BK Web Studios is still its own world that leads into the real BKWS site. The loud moments are saved for travel: the intro, page transitions, the leap of faith, and chapter 07.

## Skills and tools per step

| Steps | Skills / tools |
| --- | --- |
| Any new library | Web research and official docs before choosing or using anything |
| Every build step | `run` (launch the site and screenshot it at desktop and phone sizes), `mobile-native` |
| 4.x Foundations | `mobile-native`, `improve-animations`, `apple-design` |
| 5.x–9.x Each page | `impeccable` (shape, critique, polish), `animate`, `find-animation-opportunities` |
| 6.4 NASA chart | `dataviz` |
| 10.x Finish | `break-ui` (worst-case content), `improve-animations`, `review-animations`, `impeccable-finish-reviewer`, `impeccable-documenter` (records the design system), `/code-review`, `security-review` |

---

## Phase 0: Groundwork

- [x] **0.1 Research pass.** → [docs/research-notes.md](docs/research-notes.md)
- [x] **0.2 Tech stack.** → [docs/tech-stack.md](docs/tech-stack.md) (three.js added later for the glass hero)
- [x] **0.3 Site map.** → [docs/site-map.md](docs/site-map.md)

## Phase 1: Look and feel

- [x] **1.1 Typography.** **Anybody** (display), **Hanken Grotesk** (body), **Martian Mono** (small labels), **Abyssinica SIL** (Ge'ez).
- [x] **1.2 Colour worlds.** Time of day ([palettes](https://claude.ai/artifact/M7m2FUQmDessxiieGyKru6)). Since the glass hero, these are tints over each page's photo rather than flat fills (see Big picture).
- [x] **1.3 Motion language.** [docs/motion-language.md](docs/motion-language.md). The pointer section was rewritten on 2026-11-26 for the water-and-glass direction.
- [x] **1.4 Sound kit.** **Glass (original)**, all in one key. [docs/sound-kit.md](docs/sound-kit.md). Later additions: glass0–2 (one per letter) and a quiet water drop.

## Phase 2: Skeleton

- [x] **2.1 Project setup.**
- [x] **2.2 The shell.** (2026-11-26: the header became "Corners", picked from [header drafts](https://claude.ai/artifact/RtRRqHxgpi2SRR4jfT74Fy): name top left, MENU (08) top right, sound bottom left, the section you're in bottom right via `data-section`; soft edge fades once scrolled.) Menu, page transitions (a shared colour flood for now; replaced in 4.3), sound toggle, skip-intro.
- [x] **2.3 Sound.**

## Phase 3: Home

- [x] **3.1 Intro, for real.** Replaced on 2026-11-25 by the **glass ቡሩኽ intro**: gate ("This is my portfolio, and I'm ቡሩኽ") with a floating photo of you in the water → vowel cycle in glass → BURUK YIMESGEN → the name flies to the header.
- [x] **3.2 Intro → nav.** The name shrinks into the logo; ቡሩኽ is the monogram.
- [x] **3.3 "I build ____."** Now part of the hero lockup under the glass name.
- [x] **3.4 The rest of Home.** Built: the glass name floating behind every section, the pond (ripples, wake, flick), the short version as photo cards on the red line, "By the numbers", selected work as glow frames (GRACE as a paper-style figure), the BKWS window, and the contact footer, where the glass comes out from behind the veil and rests beside "Let's talk." Left to do:
  - [x] Glass over text: no repositioning while scrolling (tried dodging and per-section moves; both felt distracting). The glass keeps its idle float and only moves once, at the end, to rest beside "Let's talk."
  - [x] Phone hero: the glass name now uses nearly the full width over a darker photo (only the photo dims, so the glass edges stand out), and the topics sit in a tidy 2 × 2. (The faint "BURUK YIMESGEN" was the name mid-flight to the header, not a bug.)
  - [x] Stats stuck at 0: a hover or tap that landed before the section scrolled in skipped the count-up. Counting no longer depends on it.
  - [x] Sections shaped differently: short version keeps the big heading; stats have no heading (the numbers are the headline); Work has a sticky side column with a live 01 / 03 counter (a sticky pill on narrow screens); the BKWS window's title bar is its heading with one mono line above; "Let's talk." stays giant.
  - [x] The "2.25×" label now reads "lower error than the other 4 models" (accurate to the resume; not the chart's comparison).

## Phase 4: Foundations for every page (new)

Every page is built on the same layer, so these come before any new page.

- [~] **4.1 Phone and speed pass.** Real phones (`npm run dev:phone`, add `?fps` to see the frame rate): frame rate, battery and heat with the three.js layer and the GPU pond on screen the whole time; the reduced-motion version of the glass and the water. Built so far: automatic quality steps (render resolution 2× → 1.5× → 1.25× → 1×, stepping down when a device can't hold ~45 fps, phones start at 1.5×, kept for the session) and the `?fps` readout. Waiting on: a check on your real phone.
- [ ] **4.2 The page recipe.** Photo + time-of-day tint + where the glass rests, shown on one real page (probably Work, at noon). Once approved, every page uses it.
- [ ] **4.3 The glass transition.** Replaces the shared colour flood: the glass name carries you between pages (passes in front of the screen, or the page sinks into the water). Each page's own entrance builds on it.

## Phase 5: About, your story

- [ ] **5.1 Story copy.** Draft the chapters from your answers. You edit them in your own voice.
- [ ] **5.2 The line.** The path that draws as you scroll, with chapters, photos and images for each. Builds on the photo cards from Home; it adds to them, it doesn't repeat them.
- [ ] **5.3 Asmara.** The origin world, golden hour. Home's hero already uses Harnet Avenue, so this chapter needs different images (Claude asks you for photos).
- [ ] **5.4 Places (new).** The 3D paper-terrain maps: Asmara → Seattle → Sweden → Japan → Rio, travelled as you scroll.
- [ ] **5.5 Leap of faith.** The turning point where the page flips (dusk).
- [ ] **5.6 Chapter 07.** The line still drawing into a glitchy, time-travel future (midnight).
- [ ] **5.7 Small details.** Seahawks, superheroes, Eritrea. The stats are already on Home; About adds the detail behind them.

## Phase 6: Work

- [ ] **6.1 Projects index.** All projects, with hover previews (tap on mobile), built from Home's glow frames.
- [ ] **6.2 Case study: ECC.** This also sets the template.
- [ ] **6.3 Case study: Fabriq.**
- [ ] **6.4 Research: Quantum and NASA GRACE.** Paper reader plus an interactive chart; the night pond with the moon on the water.
- [ ] **6.5 Lighter pages.** Between Worlds and Beaches & Barrels.

## Phase 7: BK Web Studios

- [ ] **7.1 The world swap.** Entering BKWS changes the whole atmosphere: the glass letters break up into BKWS's pixel font and the retro-OS world takes over.
- [ ] **7.2 The page.** What BKWS is and does, client sites in device mockups (never linked), and a big "visit the site" call to action.

## Phase 8: Education, Skills, Resume

- [ ] **8.1** Education and skills pages (approach decided then).
- [ ] **8.2** Resume page and download.

## Phase 9: Contact and the ending

Home's footer already has "Let's talk.", click-to-copy email, resume, LinkedIn and GitHub, so this phase is smaller than planned.

- [ ] **9.1** The Contact page and the site's final moment (where the glass ends up for good).
- [ ] **9.2** The manual light/dark switch and its reveal. The scroll-driven light changes are built inside each page's own steps.

## Phase 10: Finish

- [ ] **10.1** Full pass on real devices, every page.
- [ ] **10.2** Accessibility and speed, every page.
- [ ] **10.3** SEO, share images, launch.
