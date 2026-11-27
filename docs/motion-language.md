# Step 1.3: Motion language

One set of rules every animation on the site follows. Individual animations get designed in later steps; they must use these tokens.

**Principle:** a calm base, with loud moments only when you travel. Most of the site moves quickly and quietly. The Spider-Verse energy (glitch, colour floods, stutter) is saved for five "travel" moments, so they feel special.

## 1. Tiers: how much something moves depends on how often it's seen

| Tier | Seen | Examples | Rule |
| --- | --- | --- | --- |
| **Never** | constantly | keyboard focus, text selection, typing, the sound toggle's state, filter results while reading, chart data, scrolling on phones | No animation. An instant change, or a 120 ms colour change at most. |
| **Quiet** | tens of times per visit | link and card hover, menu open/close, hover previews, the copy-email confirmation, filter changes | Fast, subtle, ≤ 320 ms. Never moves content you're reading. |
| **Reveal** | once per section | headings rising line by line, images unmasking, numbers counting, the story thread drawing | Plays once as the section enters. Content is visible by default; animation only enhances it. |
| **Travel** | a few times per visit | the intro, page transitions, the light/dark flip, the leap of faith, chapter 07 | The only tier allowed to use the glitch kit, colour floods and sound swells. |

## 2. Easing curves (the only ones we use)

| Token | Curve | For |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | anything entering or leaving: reveals, menu items, previews |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | things moving across the screen: colour floods, the thread, theme flips |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | the menu panel |
| `ease` | built in | hover colour changes only |
| `linear` | built in | constant motion: grain, marquees, scroll-linked effects |

Never `ease-in` on interface elements. In GSAP the same curves are registered with CustomEase, so the CSS and JavaScript feel identical.

## 3. Durations

| Token | Time | For |
| --- | --- | --- |
| `--t-press` | 120 ms | press feedback |
| `--t-hover` | 160 ms | hover colour, underline |
| `--t-ui` | 220 ms | previews, filter crossfades, copy confirmation |
| `--t-panel` | 320 ms | menu panel open/close |
| `--t-reveal` | 700 ms + 40 ms stagger per line | split-text and image reveals |
| `--t-flood` | 450 ms cover + 450 ms reveal | page transitions (about 1 s total) |
| `--t-glitch` | ≤ 400 ms per burst | glitch kit, never looping |
| Intro | 2–4 s, skippable | the Ge'ez intro |

## 4. The travel moments

- **Page transitions: every page arrives its own way.** Each destination has its own screen effect and text effect, drawn from its time of day. All of them share the same budget (about 1 s), the same curves, a 120 ms RGB split on the logo, and the direction rule (going later in the day comes from the top, earlier from the bottom, where the effect has a direction).

  | Going to | Screen | Text |
  | --- | --- | --- |
  | Home (morning) | **Sunrise:** the colour rises with a glowing edge | ብሩኽ flicks through vowel forms; BURUK stretches out |
  | Work (noon) | **Blinds:** slats flip open like sun through window blinds | letters streak in with a speed stretch |
  | Education, Skills, Resume (afternoon) | **Paper stack:** three sheets slide up | lines rise calmly (visited often) |
  | About (golden hour) | **Long shadow:** a low diagonal sweep | letters drop with long shadows that shorten |
  | BK Web Studios | **CRT power-on:** a line opens into a scanlined screen | pixel font types on |
  | Contact (sunset) | **Sun iris:** a circle grows from the horizon | "Say hi" squashes and stretches |
  | Research (night) | **Pixel dissolve:** cells fill like stars appearing | the heading decodes from scrambled characters |
  | 404 (midnight) | **Screen tear:** slices jump sideways with colour split | scramble through Latin and fidel |

  Reduced motion: every transition becomes a 200 ms colour crossfade with a text fade.

- **The light/dark flip** follows scroll position directly, so it's never on a timer. When the visitor switches it manually, it spreads out as a circle from the switch (600 ms, `--ease-in-out`).
- **The leap of faith (chapter 04)** flips the scene upside down as you scroll through it, controlled by the scroll position.
- **Chapter 07** has the line still drawing, with glitch bursts every few seconds while it's on screen.
- **The intro** is already designed (see the prototype).

## 5. The glitch kit (travel tier only)

| Effect | What it does | Limit |
| --- | --- | --- |
| **RGB split** | Red and cyan copies slip ±3 px apart | 2–4 frames (≤ 120 ms) |
| **Stutter** | Time skips: the motion jumps back a step, then lurches forward | ≤ 400 ms, stepped timing |
| **Scramble** | Letters flicker through random Latin and fidel characters before settling | 30 ms per tick, ≤ 400 ms |
| **Halftone** | A dot screen washes over the colour flood, like comic print | Only during floods |

Glitches never loop forever. The only repeating one is chapter 07, which fires at random every 3–6 s and stops when off screen.

## 6. Ambient: grain and light

- **Grain** shifts at 12 fps (stepped, like film) with linear timing. It's static with reduced motion.
- **Light** (the sun glow, horizon light) drifts a little with scroll inside each world, never on a timer.
- **Night details** (stars, windows) twinkle slowly (3–6 s), only while visible.
- **The pointer (revised 2026-11-26):** no custom cursor, no glow blob, nothing that needs precise aim, and **nothing that follows the pointer around** (the scene and lights hold still). Since the glass ብሩኽ hero, **water and glass are the interaction language**: you touch the scene, it answers, and it settles.
  | Where | Interaction |
  | --- | --- |
  | Home (built) | **The pond:** click or tap anywhere that isn't a link for a ripple and a quiet water drop; a mouse draws a thin wake; the glass letters bob when rings reach them and can be grabbed and flicked. At the end of Home the name comes out from behind the green veil and rests beside "Let's talk.", where it can be flicked again. |
  | Every page | **The glass ብሩኽ travels with you:** the one object that lives through the whole site (the "one asset" idea from the hero picks). Each page decides where it rests and how it reacts. |
  | Research (night) | **Moon on water:** the same pond at night, with the moon's reflection breaking up under ripples (after Hiroshige's moonlit prints) |
  | The leap (dusk) | **Windows answer you:** windows near a tap or click switch on and fade slowly (after teamLab's resonating lamps); decided when 4.4 is built |
  | Chapter 07, 404 (midnight) | **TV static:** text you touch fills with static, colour split and shake |
  | BK Web Studios | Its own world; decided with that page |

  Dropped with the old hero: wind through grass (Home), and "the pointer is the sun" / dust in a sunbeam as pointer-follow effects. A fixed sun can still cast the headline shadows. Rejected earlier: the big glow, star-layer parallax, letters widening near the pointer, Tom and Jerry satellites, star trails, speed-stirred grain.

  On phones, everything works by tap; nothing depends on hover.

## 7. Interruption rules

- Hover, menu and previews use **transitions, not keyframes**, so a quick back-and-forth retargets smoothly instead of restarting.
- A page transition, once started, finishes. Clicking another link queues the next one instead of breaking the flood.
- On every page change, all page animations and scroll triggers are **killed and rebuilt** (the ClientRouter cleanup pattern from the tech stack).
- Scroll-linked effects use smoothed scrub so fast flicks don't jitter.

## 8. Reduced motion and phones

| | Reduced motion | Phones |
| --- | --- | --- |
| Travel | Colour crossfade (200 ms), no glitch, stutter or flip | Same as desktop, lower shader resolution |
| Reveal | Fade only (200 ms), no movement | Same as desktop |
| Thread | Shown fully drawn | Draws with scroll |
| Grain and light | Static | Static light, grain on |
| Smooth scroll | Off | Off (native scrolling) |
| Hover effects | Fine | Not used; previews appear on tap instead |

## 9. Never ship

`transition: all`, `scale(0)` entrances, `ease-in` on interface elements, hover motion without `(hover: hover) and (pointer: fine)`, animating `width`/`height`/`top`/`left` (use transform, opacity or clip-path), content that stays hidden until an animation runs, anything without a reduced-motion version.
