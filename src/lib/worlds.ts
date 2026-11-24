/** Each page is a time-of-day "world" (docs/motion-language.md, step 1.2). */
export type World =
  | "morning" | "noon" | "afternoon" | "golden" | "dusk"
  | "sunset" | "night" | "midnight" | "bkws";

/** Position in the day. Travelling to a later world floods from the top, earlier from the bottom. */
export const WORLD_TIME: Record<World, number> = {
  morning: 0, noon: 1, afternoon: 2, golden: 3, dusk: 3.2, bkws: 3.5, sunset: 4, night: 5, midnight: 6,
};

/** Page background per world, for the browser's theme colour. Mirrors src/styles/tokens.css. */
export const WORLD_BG: Record<World, string> = {
  morning: "#2f5d3a", noon: "#1e5bd8", afternoon: "#cfdcb8", golden: "#e39a2c", dusk: "#3a2a7a",
  sunset: "#b83a36", night: "#0b1433", midnight: "#070612", bkws: "#ede7dd",
};

/** The sound each world makes as you arrive (docs/sound-kit.md). */
export const WORLD_SOUND = {
  morning: "sunrise", noon: "blinds", afternoon: "paper", golden: "shadow", dusk: "shadow",
  bkws: "crt", sunset: "iris", night: "dissolve", midnight: "tear",
} as const satisfies Record<World, string>;

const ROUTES: Array<[prefix: string, world: World]> = [
  ["/work", "noon"],
  ["/education", "afternoon"],
  ["/skills", "afternoon"],
  ["/resume", "afternoon"],
  ["/about", "golden"],
  ["/bk-web-studios", "bkws"],
  ["/contact", "sunset"],
  ["/research", "night"],
];

export function worldFor(pathname: string): World {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "morning";
  for (const [prefix, world] of ROUTES) {
    if (path === prefix || path.startsWith(prefix + "/")) return world;
  }
  return "midnight"; // 404 and anything unknown
}

/** Menu items in their three sizes (site map, step 0.3). */
export const MENU: Array<{ href: string; label: string; size: "big" | "mid" | "small" }> = [
  { href: "/work", label: "Work", size: "big" },
  { href: "/about", label: "About", size: "big" },
  { href: "/bk-web-studios", label: "BK Web Studios", size: "big" },
  { href: "/contact", label: "Contact", size: "big" },
  { href: "/research", label: "Research", size: "mid" },
  { href: "/education", label: "Education", size: "small" },
  { href: "/skills", label: "Skills", size: "small" },
  { href: "/resume", label: "Resume", size: "small" },
];
