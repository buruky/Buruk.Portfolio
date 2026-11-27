# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (multi-page) with its ClientRouter, GSAP (ScrollTrigger, SplitText, DrawSVG), Lenis, OGL for shaders, Three.js only on a page that needs real 3D, Howler.js for sound, plain CSS with design tokens, TypeScript, Vercel. Agreed in `docs/tech-stack.md` (step 0.2). Nothing installed yet.

## Users

- **Primary:** recruiters and hiring managers deciding whether to contact Buruk about entry-level Software Engineer, Data Science, or Salesforce/CRM Developer roles.
- **Equally important:** the site as a creative statement. It shows what Buruk can make and how they think, for other developers and designers and for Buruk themself.
- **Secondary:** small-business visitors who pass through to BK Web Studios.

## Product Purpose

Buruk Yimesgen's personal portfolio. Buruk graduated in June 2026 from the University of Washington with a double major in Computer Science & Systems and Mathematics. It has two jobs:
1. Get Buruk hired.
2. Be a showcase that proves craft, passion, and willingness to put time into the work.

Success means a visitor leaves within 30 seconds knowing **Buruk is passionate about the work and willing to spend time on it**.

## Positioning

The site is built from things only Buruk has:
- The Tigrinya name **ብሩኽ** ("blessed"), written in Ge'ez.
- An origin in Asmara, Eritrea.
- A real arc: Running Start setbacks → advisors saying to switch fields → falling in love with math → the CS + Math double major → freelancing for nonprofits → founding BK Web Studios.
- Shipped work across three directions (Salesforce/CRM, full stack, data science research).
- A story that is explicitly *not finished*.

## Operating Context

- Visitors arrive from applications, LinkedIn, GitHub, and word of mouth, often on phones.
- It's a multi-page site: Home, About, Work, Research, BK Web Studios, Education, Skills, Resume, Contact, 404. See `docs/site-map.md`.
- Buruk maintains it by editing code. Content lives in `content/site.json`, and long case studies will live in MDX.

## Capabilities and Constraints

- **Intro:** the Ge'ez name animation on every visit, 2–4 s before scrolling, always skippable.
- **Sound:** opt-in at the intro (soft, clean, never overwhelming), with a persistent toggle.
- **Menu:** a visible menu button with different sizes and weights per item.
- **Pages and transitions:** multi-page, with transitions between pages. The theme shifts between light and dark as you scroll.
- **Mobile matters a lot.** Every hover or cursor effect needs a touch equivalent.
- **No "book a call" on the portfolio.**
- **Client sites** may appear inside BK Web Studios but must **never be linked**.
- **BK Web Studios** must lead visitors to bkwebstudios.com, with no pricing on the portfolio.
- **OutTheGC** stays off the site, except a possible hidden easter egg in the chapter 07 glitch.
- **Undecided:** the ending style and the exact after-intro motion piece.

## Brand Commitments

- **Name and voice:** "Buruk Yimesgen". Buruk wants to come across as **fun, cool, smooth**.
- **ብሩኽ** becomes the monogram and favicon.
- **BK Web Studios** has its own existing brand (warm paper, ember, teal, retro-OS pixel fonts; see `docs/research-notes.md`). The portfolio must feel distinct from it, while the BKWS section leads into that world.
- **Personal details** to include lightly in About: Eritrea, sports (Seattle Seahawks fan), superheroes, movies and shows.

## Evidence on Hand

- **Facts and copy:** `content/site.json` (profile, education, experience, skills, projects, client sites, copy).
- **Media:** `content/media/` (profile photos, project screenshots, the ECC demo video, both research papers as PDF, resume).
- **Resume facts:** 10 staff use the ECC app daily across 3 roles; intake went from hours to minutes; 70+ students facilitated over 5 quarters; 15+ years / 10,000+ points of NASA GRACE data; XGBoost reached 2.25× lower MSE; 3rd place of 10+ teams at a hackathon; ICPC. GPA is 3.6.
- **Repos:** ECC, ECCManager (the earlier version of the ECC app), Fabriq, FabriqAWS, Between-Worlds, Beaches-N-Barrels.
- **Not available:** testimonials, press or awards. Do not invent any.

## Product Principles

1. **Only-Buruk material first.** Every signature moment comes from Buruk's name, origin, story, or real work.
2. **Calm base, loud moments.** Restraint everywhere except deliberate "travel" moments, so those hit.
3. **Phone-first parity.** Nothing important exists only on hover.
4. **Proof over claims.** Numbers, demos and real artifacts instead of adjectives.
5. **Unfinished on purpose.** The story points forward.

## Accessibility & Inclusion

Aim for WCAG 2.2 AA:
- a reduced-motion version of every animation
- sound off unless the visitor chooses it
- an always-available skip-intro
- full keyboard use and readable contrast in both themes
