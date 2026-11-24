# Step 0.2: Tech stack (proposal)

Nothing is installed yet. Exact versions get pinned when we set up the project in step 2.1.

## Summary

| Job | Pick | Why |
| --- | --- | --- |
| Framework | **Astro** + its **ClientRouter** | Real multi-page site, very little JavaScript by default, simple to maintain. The router keeps sound and the nav alive between pages. |
| Animation | **GSAP** (with ScrollTrigger, SplitText, DrawSVG) | The standard for this kind of site, and now completely free, including the formerly paid plugins. |
| Smooth scroll | **Lenis** | Light, works with GSAP, keeps native scrolling underneath. Turned off for reduced motion. |
| Shaders / glitch | **OGL** | A small WebGL library for grain, RGB split, the CRT look and the chapter 07 glitch. |
| 3D (only if needed) | **Three.js**, loaded only on the page that uses it | Much bigger. Only worth it if we decide on a real 3D object. |
| Sound | **Howler.js** | Small, plays short sound files, handles mobile audio quirks, packs many sounds into one file. |
| Styling | **Plain CSS** with design tokens | Full control for an unusual design. Colours, fonts and timings live in one tokens file. |
| Language | **TypeScript** | You already use it. Catches mistakes in the animation code. |
| Content | Keep **`content/site.json`**, plus **MDX** files for the long case studies | One source of truth stays. Long-form writing is easier to edit in MDX than in JSON. |
| Fonts | Self-hosted (Fontsource) | Faster, more private, no flash of the wrong font during the intro. |
| Hosting | **Vercel** | You already use it for BKWS. Preview links for every change, so you can check each step on your phone. |

## The reasoning behind the big choices

### Why Astro, not Next.js

- You chose a **fully multi-page** site. Astro is built for exactly that: each page is real HTML, and JavaScript only loads where something interactive needs it. That helps on phones, which you said matter a lot.
- Next.js would work, but it's built around React apps. Most of this site is animation on top of content, not app logic, so React would mostly be weight.
- It's easy to maintain by editing code: pages are files, and components look like HTML.

### Why the ClientRouter matters (this is the key decision)

Browsers can now animate between pages natively. But a normal page load **resets the sound system**, and browsers then require another click before sound can play again. That would break sound across the site. It would also restart the nav logo and anything else that should carry over from page to page.

Astro's **ClientRouter** swaps pages without a full reload, so:
- sound keeps working after the first "Enter with sound"
- the logo from the intro and the sound toggle persist between pages
- GSAP can run custom "travel between worlds" transitions

The trade-off is that animations must be cleaned up and restarted on each page change. That's a known pattern, and Codrops published a starter for exactly this (GSAP page transitions on Astro's router) that we can learn from.

### GSAP

- Completely free since Webflow took it over, including SplitText (split-text reveals), ScrollTrigger (scroll animations) and DrawSVG (**the story line drawing itself**).
- Most of your reference sites (bleibtgleich, lxlcreative and others) are built with it, so the feel you liked is achievable.

### Lenis

- Gives the smooth, weighted scrolling of sites like bleibtgleich.
- Turned **off** when someone prefers reduced motion, and left to native scrolling on phones, which already feels right there.

### OGL for shaders, Three.js only if needed

- Most of the effects you ticked are 2D shader work: grain, colour offset, glitch, the CRT screen into BKWS, and a shader background. OGL does these at a fraction of Three.js's size.
- You also ticked "3D objects." If we pick one, Three.js loads **only on that page**, so the rest of the site stays light.

### Howler.js for sound

- Your sound brief is soft, clean and never overwhelming. That's best done with a small set of **designed sound files**, not generated beeps. The intro prototype's synthesised sounds were placeholders.
- Howler is about 7 KB, handles iPhone audio unlocking, and can pack all the UI sounds into one file.

## Things this rules out (on purpose)

- **React, Tailwind and component libraries.** They're not needed for this site and would make the custom look harder to build.
- **Webflow or Framer.** They're fast to build in, but you'd lose the custom code, and the code is part of the portfolio.

## Risks to watch

- **Too much JavaScript.** GSAP, Lenis, OGL and Howler together are fine, but we load each one only where it's used.
- **Accessibility of smooth scroll and heavy motion.** The reduced-motion version is planned from the start (step 10.2), not added at the end.
- **Page-change cleanup.** Every animated page needs a "start / stop" pattern so nothing leaks between pages. We'll set it up once in step 2.2.

## Sources

- GSAP is free, including SplitText: https://webflow.com/blog/gsap-becomes-free
- Astro view transitions and the ClientRouter: https://docs.astro.build/en/guides/view-transitions/
- Codrops, GSAP page transitions in Astro: https://tympanus.net/codrops/2026/10/07/interlude-astro-page-transitions/
- Cross-document view transitions, browser support: https://caniuse.com/cross-document-view-transitions
- Lenis: https://github.com/darkroomengineering/lenis
- Lenis accessibility caution (Thoughtworks Radar): https://www.thoughtworks.com/radar/languages-and-frameworks/lenis
- Howler.js: https://www.npmjs.com/package/howler
