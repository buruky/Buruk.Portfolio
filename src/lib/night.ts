// Day / Night (step 9.2). Night turns every world to its nighttime: html[data-night] switches the world colours
// (tokens.css), the glass scenes dim and pick up moonlight (they listen for "bk:night"), and light surfaces (the
// resume sheet, BKWS paper) go dark. It starts from the device's light/dark setting and remembers the visitor's
// choice. Base.astro sets it before the first paint; this module flips it.
const KEY = "bk-night";

export const isNight = () => document.documentElement.dataset.night === "on";

/** Saved choice, else the device setting. Also used inline in Base.astro (keep the two in step). */
export function preferredNight(): boolean {
  try { const v = localStorage.getItem(KEY); if (v) return v === "on"; } catch { /* private mode */ }
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

/** The browser's bar colour follows the world's colour, day or night. */
export function syncThemeColor() {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--world-bg").trim();
  if (meta && bg) meta.content = bg;
}

function apply(on: boolean) {
  const html = document.documentElement;
  if (on) html.dataset.night = "on"; else delete html.dataset.night;
  syncThemeColor();
  document.dispatchEvent(new CustomEvent("bk:night", { detail: { on } }));
}

/** Flip it. From a switch: the new light spreads out as a circle from that point (600 ms), then it's remembered. */
export function setNight(on: boolean, from?: { x: number; y: number }) {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* in-memory only */ }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vt = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
  if (!vt || reduce || !from) { apply(on); return; }
  const html = document.documentElement;
  html.classList.add("night-flip"); // this view transition only: no page-level cross-fade
  const t = vt.call(document, () => apply(on));
  const r = Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y));
  t.ready.then(() => {
    const a = html.animate({ clipPath: [`circle(0px at ${from.x}px ${from.y}px)`, `circle(${r}px at ${from.x}px ${from.y}px)`] },
      { duration: 600, easing: "cubic-bezier(0.77, 0, 0.175, 1)", pseudoElement: "::view-transition-new(root)" });
    a.finished.finally(() => html.classList.remove("night-flip"));
  }).catch(() => html.classList.remove("night-flip"));
}
