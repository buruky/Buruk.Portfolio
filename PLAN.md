# Redesign plan

One step at a time. For each step, Claude builds or proposes one thing, you review it, and we only move on when you're happy. We work out the details of each step when we get to it, not before.

**Where we are (2026-11-26):** Phases 0–4 done; About done for now; Work index (6.1) done with full-screen project pages; the rest of Work (6.2–6.5) is parked for later (2026-11-26). **Phases 7–9 built, and Research (6.4); all waiting on your review. Next: Phase 10, the finish.**

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done

**Where the brief lives:** your questionnaire answers and decisions are in Claude's memory. References are in [`content/inspo/`](content/inspo/README.md). Prototypes: [glass intro](https://claude.ai/artifact/MQ9CURwH2sanqiL37P4azM) · [pond ripples](https://claude.ai/artifact/Rq9qo8BmQdsnvoxb5koQph) · [paper-terrain maps](https://claude.ai/artifact/G7jybKfMbBKVm21Z2oK5ZL) (kept for About).

---

## Big picture

The site is a set of **worlds you travel between**, and since the new hero they share one recipe:

- **A real photo** for each page (Home is Harnet Avenue in Asmara), softly blurred.
- **The page's time-of-day colour as a tint** over that photo, not a flat fill. The palette from step 1.2 stays; it just becomes see-through. Each page's light-to-dark change happens inside that page as you scroll (Home already goes from dark into morning green).
- **The glass ብሩኽ**: the one object that travels with you through the whole site. It opens the site, floats behind Home, rests beside "Let's talk." at the end, and each page decides where it sits and how it reacts.
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
- [x] **2.2 The shell.** (2026-11-26: the header became "Corners", picked from [header drafts](https://claude.ai/artifact/RtRRqHxgpi2SRR4jfT74Fy): name top left, MENU (08) top right, sound bottom left, the section you're in bottom right via `data-section`; soft edge fades once scrolled. At the top of each page, desktop also shows the "Island": a frosted capsule with Work, About, Studio, Contact, sound and Menu, which lifts away once you scroll past the hero.) Menu, page transitions (a shared colour flood for now; replaced in 4.3), sound toggle, skip-intro.
- [x] **2.3 Sound.**

## Phase 3: Home

- [x] **3.1 Intro, for real.** Replaced on 2026-11-25 by the **glass ብሩኽ intro**: gate ("This is my portfolio, and I'm ብሩኽ") with a floating photo of you in the water → vowel cycle in glass → BURUK YIMESGEN → the name flies to the header.
- [x] **3.2 Intro → nav.** The name shrinks into the logo; ብሩኽ is the monogram.
- [x] **3.3 "I build ____."** Now part of the hero lockup under the glass name.
- [x] **3.4 The rest of Home.** Built: the glass name floating behind every section, the pond (ripples, wake, flick), the short version as photo cards on the red line, "By the numbers", selected work as glow frames (GRACE as a paper-style figure), the BKWS window, and the contact footer, where the glass comes out from behind the veil and rests beside "Let's talk." Left to do:
  - [x] Glass over text: no repositioning while scrolling (tried dodging and per-section moves; both felt distracting). The glass keeps its idle float and only moves once, at the end, to rest beside "Let's talk."
  - [x] Phone hero: the glass name now uses nearly the full width over a darker photo (only the photo dims, so the glass edges stand out), and the topics sit in a tidy 2 × 2. (The faint "BURUK YIMESGEN" was the name mid-flight to the header, not a bug.)
  - [x] Stats stuck at 0: a hover or tap that landed before the section scrolled in skipped the count-up. Counting no longer depends on it.
  - [x] Sections shaped differently: short version keeps the big heading; stats have no heading (the numbers are the headline); Work has a sticky side column with a live 01 / 03 counter (a sticky pill on narrow screens); the BKWS window's title bar is its heading with one mono line above; "Let's talk." stays giant.
  - [x] The "2.25×" label now reads "lower error than the other 4 models" (accurate to the resume; not the chart's comparison).

## Phase 4: Foundations for every page (new)

Every page is built on the same layer, so these come before any new page.

- [x] **4.1 Phone and speed pass.** Automatic quality steps (render resolution 2× → 1.5× → 1.25× → 1×, stepping down when a device can't hold ~45 fps; phones start at 1.5×; kept for the session) and a `?fps` readout. Checked on a real phone 2026-11-26: ~60 fps, no heat, no glitches. Reduced motion: the intro skips to the hero and the water and letters hold still.
- [x] **4.2 The page recipe.** Built as `src/layouts/WorldPage.astro` (GlassHero in page mode: no intro; the page's words in the hero; photo + the world's tint from `WORLD_DEEP`; the glass rests in the hero, floats behind the page, settles beside "Let's talk."; sections tagged `data-section`). First page: Work, noon over Seattle (`city-bg.jpg`, swap freely), listing all six projects. Approved 2026-11-26; every page uses it.
- [x] **4.3 Page transitions.** Back to the 1.3 decision (docs/motion-language.md §4): every page arrives its own way, now made of tinted frosted glass ("panes") that close over the page and open onto the next in their own way: sunrise (rises on past the top), blinds (tilt open), paper stack (sheets carry on up), long shadow (sweeps on across), sun iris (sets back down), pixel dissolve (clears cell by cell), screen tear (tears away). BK Web Studios keeps a solid CRT that powers on and off. Text effects come with each page's hero via `data-arrive` (Work: streak, Home: stretch). Shared: the colour split on the corner name, the glass ብሩኽ dipping and rising, and the cover waiting for the new glass scene. All in src/components/Cover.astro.

## Phase 5: About, your story

- [~] **5.1 Story copy.** Drafted (2026-11-26) in content/site.json → copy.about.chapters. Waiting on your edits and three gaps: when you came to the US, a line for chapter 07, a line per trip.
- [x] **5.2 The line.** Rebuilt after the August reference (StoryLine.astro): one red line through glass beads, chapters named by phrases (no numbers), floating photos (stand-ins from Unsplash/Commons, see CREDITS.md). Glass "asides" beside the words: Running Start's dipping curve, the leap's turning ×2 seal, a live "10 staff · every day" pill, a BK Web Studios sticker that links to the site, an "in progress" seal at the end.
- [x] **5.3 Asmara.** Chapter 01's picture is a map of Africa (src/lib/africa.ts, Natural Earth, public domain): the countries faint, Eritrea filling in red, a pin on Asmara and ኤርትራ beside it, drawn in when the line reaches the chapter.
- [ ] **5.4 Places (new).** Skipped for now (2026-11-26). The 3D paper-terrain maps: Asmara → Seattle → Sweden → Japan → Rio, travelled as you scroll.
- [ ] **5.5 Leap of faith.** The turning point where the page flips (dusk).
- [ ] **5.6 Chapter 07.** The line still drawing into a glitchy, time-travel future (midnight).
- [x] **5.7 Small details.** "Off the clock." hobbies section after the story (src/components/Hobbies.astro, copy in site.json → copy.about.hobbies): tilted frosted cards for Seahawks, basketball, movies & shows, travel, spreading into a fan as they scroll in. Lines are placeholders for your own.

## Phase 6: Work

Parked on 2026-11-26: good enough for now; come back after the other pages.

- [x] **6.1 Projects index.** /work is a quiet list of project names (filter row: All · Salesforce · Full stack · Research); hovering a row expands it in place to show its one-liner, stat and short clip; clicking opens its full-screen page /work/[slug] (clip or screenshot filling the screen, title over it, then what it is, role, stack, links, next project). Shared data in src/lib/projects.ts; clips via "previewVideo" in site.json. Phones: rows with thumbnails. Clips to come from you.
- [~] **6.2 Case study: ECC.** /work/ecc-salesforce-case-management now carries a case study written in content/site.json (project → caseStudy) and drawn by src/components/CaseStudy.astro (the template for the others): the client, the problem, built it twice (ECCManager → Salesforce), the case lifecycle from the repo's Status picklist, three roles, impact numbers, the demo video. Waiting on your review and a few facts.
- [~] **6.3 Case study: Fabriq.** Drafted in content/site.json (project → caseStudy): the hackathon, the problem, how the AI picks an outfit (from the repo's api/generate-outfit.js), the numbers, FabriqAWS as what's next. Parked 2026-11-26. Open: the stack (README says Next.js + NeonDB; the repo is React + Supabase + Cloudinary), what FabriqAWS is built with.
- [~] **6.4 Research.** Built 2026-11-27 (src/pages/research.astro): "Research, after dark." over the moon on the sea (Unsplash, widened to landscape; ripple it and the reflection breaks up). Both papers in full: a plain-English headline with the real title, authors and advisors, the abstract; NASA GRACE adds four facts and the paper-style result figure (GraceChart); Quantum adds what it covers (double slit → Grover's). A paper reader (PaperReader.astro) with real pages rendered from the PDFs (content/media/images/papers/), each opening the PDF at that page; ScholarlyArticle structured data for search. Open: the Quantum paper's PDF is dated "August 25, 2026" (correct?) and where it was written; the moon photo's photographer name for credits.
- [ ] **6.5 Lighter pages.** Between Worlds and Beaches & Barrels.

## Phase 7: BK Web Studios

- [x] **7.1 The world swap.** Cut on 2026-11-26 (you: "unneeded, just go to the next screen"). The CRT page transition still brings you in, and you land straight on BKWS's first screen: BKWS in Silkscreen pixel blocks (ember, hard shadows) on paper with scanlines, the name, tagline and a scroll cue. Plain HTML/CSS, no 3D (src/components/BkwsHero.astro); night-aware. The glass-swap prototype stays at https://claude.ai/artifact/HFZg3MvjjM1NkAts5Lo612 if you ever want it back.
- [~] **7.2 The page.** What BKWS is and does, client sites in device mockups (never linked), and a big "visit the site" call to action. **Must show off the 5 heroes** of bkwebstudios.com (its hero switcher, `?style=`): Editorial (`flash`), Cinematic (`summit`), Minimal, Retro, Collage. Built first (2026-11-26, src/components/BkwsHeroes.astro, data in site.json → bkWebStudios.heroes): "Same site, new look.", a BKWS window plus a phone showing each hero (screenshots of the live site), five tabs, a top-to-bottom redraw on each switch, cycling on its own while in view until you pick one, and a "See it live" link per style. Then (same day): the client sites (src/components/BkwsClients.astro): Always with Compassion, Isaiah Café, Simret, Galilee, each on a laptop with its phone beside it, its type and what I did (my words from bkwebstudios.com), never linked; "Four steps, about two weeks." (from $750); and a big ember "bkwebstudios.com ↗" to end. No booking on the portfolio. Reordered for UX (2026-11-26): hero (84% tall, "Scroll ▾" cue, the next section peeks in) → what it is + three facts → client work (the proof) → the five heroes, framed as "the studio's own site is a project too" → four steps → one big way out. Waiting on your review.

## Phase 8: Education, Skills, Resume

- [x] **8.1** Decided 2026-11-26: **one page, not three.** Education and Skills are sections of /resume (`/education` and `/skills` redirect to `/resume#education` and `/resume#skills`; the menu links there).
- [~] **8.2** /resume built (src/pages/resume.astro): WorldPage, afternoon over the UW Tacoma campus; the resume on a sheet of paper: Experience (with links to ECC and NASA GRACE), Education (GPA, Dean's List), Skills (each skill links to the projects whose stack names it), Activities (ICPC), and Download PDF at the top and bottom. Waiting on your review, and **the PDF needs re-exporting** (it still says "125% lower MSE" and "9 stages").

## Phase 9: Contact and the ending

Home's footer already has "Let's talk.", click-to-copy email, resume, LinkedIn and GitHub, so this phase is smaller than planned.

- [~] **9.1** Built 2026-11-26 (you chose "the glass sets"): /contact at sunset, the sun half under a calm sea (photo C, PattayaPatrol, CC BY-SA 4.0; swapped 2026-11-26 from a blurry Puget Sound shot). Shown nearly sharp (WorldPage `soft={0.8}`); the drawn horizon and the glass line up with the photo's own horizon and sun at any screen size. The hero holds everything you'd act on: "Say hi.", the email to copy, Resume, LinkedIn, GitHub, mail app. Then "Open to": Software Engineer, Data Science, Salesforce / CRM Developer. Then the ending: a pinned sunset where the glass comes together on the horizon and sinks into the water as you scroll (one ripple, one drop; scrolling back raises it), then "Thanks for coming." and "↺ Start the day again". No "Let's talk." footer on this page (WorldPage `footer={false}`, slot `end`). GlassHero: `[data-glass-set]` + `[data-horizon]`. Sign-off buttons shared in src/lib/sign-off.ts. Waiting on your review.
- [~] **9.2** Built 2026-11-26 as **Day / Night** (your pick). The switch lives in the header like sound (moved out of the menu 2026-11-27): bottom-left corner beside SOUND as "● DAY" / "☾ NIGHT" (a disc a shadow slides across into a crescent), and a matching icon in the island beside the sound waveform. Night turns every world to its nighttime (tokens.css `[data-night="on"]`), dims and cools the glass scenes' photos with moonlight on the glass, darkens the resume sheet and BKWS (its own night colour; ember stays). The new light spreads as a circle from the switch (600 ms; reduced motion: instant). Starts from the device setting, remembers your choice, carries across pages, and the browser bar colour follows. src/lib/night.ts. Not night-aware yet: Home's BKWS window and About's cards (check in Phase 10). Waiting on your review.

## Phase 10: Finish

- [ ] **10.1** Full pass on real devices, every page.
- [ ] **10.2** Accessibility and speed, every page.
- [ ] **10.3** SEO, share images, launch.
- [ ] **10.4** Photo credits on the site: some photos (e.g. the UW Quad on About, CC BY-SA) need visible credit, not just content/media/CREDITS.md. Add a small credits line or page.
