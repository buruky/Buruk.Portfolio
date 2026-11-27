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

/** Flip it. From a switch, a band of the new light sweeps across the screen like a moving horizon (~900 ms): night
 *  comes down from the top, day rises from the bottom, each with a soft glowing edge (cool moonlight / warm sunrise).
 *  The page changes while the band covers it, so you see the old light ahead of the band and the new light behind it.
 *  Then it's remembered. Reduced motion: it simply switches. */
export function setNight(on: boolean, from?: { x: number; y: number }) {
  try { localStorage.setItem(KEY, on ? "on" : "off"); } catch { /* in-memory only */ }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelector(".night-sweep")?.remove();
  if (reduce || !from) { apply(on); return; }
  const band = document.createElement("div");
  band.className = "night-sweep";
  band.dataset.tone = on ? "moon" : "sun";
  band.setAttribute("aria-hidden", "true");
  document.body.append(band);
  // down for night, up for day; it covers the screen, the light changes underneath, then it carries on off the far side
  const dir = on ? 1 : -1;
  const cover = band.animate({ transform: [`translateY(${-dir * 100}%)`, "translateY(0%)"] }, { duration: 430, easing: "cubic-bezier(0.55, 0, 1, 0.45)", fill: "forwards" });
  cover.finished.then(() => {
    apply(on);
    return band.animate({ transform: ["translateY(0%)", `translateY(${dir * 100}%)`] }, { duration: 520, easing: "cubic-bezier(0.23, 1, 0.32, 1)", fill: "forwards" }).finished;
  }).finally(() => band.remove());
}
