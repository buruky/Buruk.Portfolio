---
target: hero intro animation
total_score: 19
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 3
target_identity: "file:S:\\Personal_CS\\Buruk.Portfolio\\src\\components\\HeroStage.tsx"
target_fingerprint: "sha256:cccf4a4abe0dd1fd7d4d5b164435fc1af561d0a68c4def8fe0665d649d79dd08"
target_path: "S:\\Personal_CS\\Buruk.Portfolio\\src\\components\\HeroStage.tsx"
timestamp: 2026-10-20T20-13-17Z
slug: src-components-herostage-tsx
---
## Design Health Score — 19/36 (Acceptable, 53%; heuristic 10 n/a)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | ~1.2–1.5s empty dark scrim while the 3D chunk loads; first frame white |
| 2 | Match system / real world | 3 | Press-then-legend works; two rows collapsing to one isn't keyboard-like |
| 3 | User control and freedom | 1 | ~5s unskippable, replays every refresh |
| 4 | Consistency and standards | 2 | Tiny dim 3D legends jump to large bold CSS legends; docked "m" oversized |
| 5 | Error prevention | 2 | Safety timeout good; scrolled reload, resize mid-dock, WebGL throw unhandled |
| 6 | Recognition rather than recall | 3 | Nav stays visible over scrim |
| 7 | Flexibility and efficiency | 1 | No faster path for repeat visitors |
| 8 | Aesthetic and minimalist design | 3 | On-palette; dark keys on dark scrim, murky figure-ground |
| 9 | Error recovery | 2 | Silent fallbacks |
| 10 | Help and documentation | n/a | Portfolio intro |

## Design Specificity
Authored for this person (name typing on real 3D keycaps, docking onto the resting CSS keycaps). Held back by an unreadable typing payoff, legend mismatch at handoff, chocolate-like material. Detector: 0 findings in hero files; overlay flagged Logo.tsx 10px badge, SkillsMarquee marquee, Geist Mono 56% (brand), CopyEmailButton 3.2:1 contrast on mobile — all outside the hero.

## Priority Issues
1. [P1] Typing payoff unreadable — legend ~25% of cap, 80ms stagger. Fix: legend 55–60% of cap, key light during press, PRESS_STAGGER ~120ms + word pause. ($impeccable animate)
2. [P1] Keys clip through each other on dock (linear lerp row merge). Fix: ~40ms per-key dock stagger, arc back row over front row. ($impeccable animate)
3. [P1] No skip; ~5s on every refresh. Fix: first pointer/key/wheel fast-forwards to a 300ms dock. ($impeccable harden)
4. [P2] Dead lead-in while chunk downloads. Fix: preload chunk on mount; bail to reveal if scene hasn't started by ~2.5s. ($impeccable optimize)
5. [P2] Handoff swaps scale/typography. Fix: x-only scale for wide keys, draw legends after document.fonts.ready, fade CSS h1 in under canvas before canvas fades. ($impeccable polish)

## Persona Red Flags
- Jordan: first 1.5s looks broken; resting name reads "BurukYimesgen" (word gap ~6px vs ~4px).
- Riley: scrolled-down reload flies keys off the top; scroll mid-intro; resize mid-dock stale targets; no error boundary around Canvas.
- Casey: slow ≥768px devices can sit on dark scrim up to 12s.
- Sam: ~5s forced dimmed motion, no pause (WCAG 2.2.2 edge); h1 stays in a11y tree (good).

## Minor
Material reads as bonbons (lower clearcoat, cooler body); ripples in screen space; shadows nearly invisible on scrim; desktop rests in one row after flying in two.

## Questions
- Lift the scrim while the name types so typing and light build together?
- Drop the scatter fly-in: keys already in a row, pressed in sequence?
- Who is this for on the tenth visit?
