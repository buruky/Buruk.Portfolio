# Redesign branch

This branch is a blank slate for a full frontend redesign. The old Next.js/React/Tailwind
site was removed on purpose; it still lives on `main`. No framework is chosen yet, so don't
assume React or Next.js. Pick whatever the design calls for.

Only the content carried over:

- `content/site.json`: all copy and data (profile, education, skills, BK Web Studios,
  projects, client sites, SEO meta, page copy).
- `content/media/`: images, screenshots, papers, demo video, resume. Paths in `site.json`
  are relative to this folder.

Treat `content/` as the source of truth. Feel free to restructure it, swap or re-export
assets, or add new ones if the redesign needs that.
