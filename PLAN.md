# Redesign plan

One step at a time. For each step, Claude builds or proposes one thing, you review it, and we only move on when you're happy. We work out the details of each step when we get to it, not before.

**Status key:** `[ ]` not started · `[~]` in progress · `[x]` done

**Where the brief lives:** your questionnaire answers and decisions are in Claude's memory. References are in [`content/inspo/`](content/inspo/README.md). The intro prototype is at https://claude.ai/artifact/633aYbMJfikoh9BQiuhZs9.

---

## Big picture

The site is a set of **worlds you travel between**. Your origin and name open it (the Ge'ez intro). Your story runs as a line through time, ending in a glitchy, unfinished chapter. BK Web Studios is its own world that leads into the real BKWS site. The base feels calm and warm (the *Ctrl* mood). The loud Spider-Verse energy is saved for the "travel" moments: the intro, page transitions, the light/dark flip, the leap of faith, and chapter 07.

## Skills and tools per step

Claude uses its design and motion skills and research tools at each step, not just hand-written code.

| Steps | Skills / tools |
| --- | --- |
| 0.2, and any new library | Web research and official docs before choosing or using anything |
| 1.1 Typography, 1.2 Colour | `impeccable` (typography, colour, direction), web research for fonts |
| 1.3 Motion language | `animate`, `apple-design`, `emil-design-eng`, `animation-vocabulary` |
| 1.4 Sound kit | Web research for sound sources |
| Demos in Phase 1 | Artifacts (a link you can open), Figma MCP if connected |
| 2.x Skeleton and every build step | `run` (launch the site and screenshot it), `mobile-native` |
| 3.x–8.x Each page | `impeccable` (shape, critique, polish), `animate`, `find-animation-opportunities` |
| 5.4 NASA chart | `dataviz` |
| 10.x Finish | `break-ui` (worst-case content), `improve-animations`, `review-animations`, `impeccable-finish-reviewer`, `impeccable-documenter` (records the design system), `/code-review`, `security-review` |

---

## Phase 0: Groundwork (no visible site yet)

- [x] **0.1 Research pass.** Read your resume, look at bkwebstudios.com's brand, and go through your GitHub repos for case-study material. Output: short notes for you to check. → [docs/research-notes.md](docs/research-notes.md)
- [x] **0.2 Tech stack.** Research and propose the framework and libraries for animation, smooth scroll, shaders/3D and sound, with reasons. You approve before anything is installed. → [docs/tech-stack.md](docs/tech-stack.md)
- [x] **0.3 Site map.** Every page, what's on it, and how pages link. One diagram for you to approve. → [docs/site-map.md](docs/site-map.md)

## Phase 1: Look and feel (shown as small demos, not the real site)

- [x] **1.1 Typography.** 2–3 font pairings, each shown with your name and real copy. You pick one. → Chosen: **Anybody** (display), **Hanken Grotesk** (body), **Martian Mono** (small labels), **Abyssinica SIL** (Ge'ez).
- [x] **1.2 Colour worlds.** The calm base, light and dark versions, how each page shifts, and the BKWS world. → Chosen: **time of day**, every page its own drenched time-of-day world, with depth from light, shadow, sky gradients and grain ([palettes](https://claude.ai/artifact/M7m2FUQmDessxiieGyKru6) · [depth demo](https://claude.ai/artifact/Gbw3CiXSMZXd4ednWVRi9Y)). The depth demo is a direction, not the final look.
- [x] **1.3 Motion language.** One set of timings and easings, the glitch kit (RGB split, halftone, stutter), grain and texture. → [docs/motion-language.md](docs/motion-language.md) · [playground](https://claude.ai/artifact/77BqumFV2oMzhmDG1fN1TM)
- [x] **1.4 Sound kit.** A small set of soft, clean sounds you can click through, plus when each one plays. → Chosen: **Glass (original)**, all in one key. [docs/sound-kit.md](docs/sound-kit.md)

## Phase 2: Skeleton

- [x] **2.1 Project setup.** Content loads from `content/site.json`. A preview link you can open on your phone.
- [x] **2.2 The shell.** Menu button, page transitions, sound toggle, skip-intro. Works on mobile from day one. Every page uses one shared colour flood for now; each page's unique entrance (docs/motion-language.md §4) is built in that page's step.
- [x] **2.3 Sound.** The Glass kit is generated live in the browser (no audio files) and connected: the Enter chord, the menu, the sound toggle, and each world's arrival sound.

## Phase 3: Home

- [x] **3.1 Intro, for real.** Port the Ge'ez prototype with the chosen fonts, colours and sounds.
- [x] **3.2 Intro → nav.** The name shrinks into the logo, and ቡሩኽ becomes the monogram.
- [ ] **3.3 After the name.** The motion piece that shows your different directions.
- [ ] **3.4 The rest of home.** Ways into Work, About and BKWS.

## Phase 4: About, your story

- [ ] **4.1 Story copy.** Draft the chapters from your answers. You edit them in your own voice.
- [ ] **4.2 The line.** The path that draws as you scroll, with chapters, photos and images for each.
- [ ] **4.3 Asmara.** The origin world.
- [ ] **4.4 Leap of faith.** The turning point where the page flips.
- [ ] **4.5 Chapter 07.** The line still drawing into a glitchy, time-travel future.
- [ ] **4.6 Small details.** Seahawks, superheroes, Eritrea, and the stats (from your resume).

## Phase 5: Work

- [ ] **5.1 Projects index.** All projects, with hover previews (tap on mobile).
- [ ] **5.2 Case study: ECC.** This also sets the template.
- [ ] **5.3 Case study: Fabriq.**
- [ ] **5.4 Research: Quantum and NASA GRACE.** Paper reader plus an interactive chart.
- [ ] **5.5 Lighter pages.** Between Worlds and Beaches & Barrels.

## Phase 6: BK Web Studios

- [ ] **6.1 The world swap.** Entering BKWS changes the whole atmosphere.
- [ ] **6.2 The page.** What BKWS is and does, client sites in device mockups, and a big "visit the site" call to action.

## Phase 7: Education, Skills, Resume

- [ ] **7.1** Education and skills pages (approach decided then).
- [ ] **7.2** Resume page and download.

## Phase 8: Contact and ending

- [ ] **8.1** Contact: click-to-copy email, book a call, links.
- [ ] **8.2** Giant footer and the site's final moment.

## Phase 9: Light ↔ dark

- [ ] **9.1** The theme changes as you scroll, plus the reveal when you switch it yourself.

## Phase 10: Finish

- [ ] **10.1** Phone pass on real devices.
- [ ] **10.2** Reduced-motion version, accessibility, speed.
- [ ] **10.3** SEO, share images, launch.
