# Redesign branch

This branch is a full frontend redesign. The old Next.js/React/Tailwind site was removed on
purpose; it still lives on `main`.

The new site is **Astro 7** (multi-page, static), with plain CSS design tokens in
`src/styles/tokens.css`. Don't add React or Tailwind. The full stack and the reasons are in
`docs/tech-stack.md`. Work follows `PLAN.md` one step at a time; the brief is in `PRODUCT.md`
and `docs/`.

- `npm run dev`: local dev server. `npm run dev:phone`: the same, reachable from a phone on
  the same Wi-Fi.
- `npm run build` and `npm run check` (types) must pass before committing.
- `playground/` holds the owner's own experiments and isn't part of the site.

Only the content carried over:

- `content/site.json`: all copy and data (profile, education, skills, BK Web Studios,
  projects, client sites, SEO meta, page copy).
- `content/media/`: images, screenshots, papers, demo video, resume. Paths in `site.json`
  are relative to this folder.

Treat `content/` as the source of truth. Feel free to restructure it, swap or re-export
assets, or add new ones if the redesign needs that.
