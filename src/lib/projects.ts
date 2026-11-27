// Projects for the Work index (/work) and the full-screen project pages (/work/[slug]), from content/site.json.
// Each project can have a short looping clip, close to a GIF: save it as content/media/videos/<slug>.mp4
// (MP4/H.264, muted, 3–8 s, 16:10, ideally under ~2 MB), or point "previewVideo" at another file.
// Projects without one show only their cover.
import type { ImageMetadata } from "astro";
import site from "@/lib/site";

const shots = import.meta.glob<{ default: ImageMetadata }>("../../content/media/images/screenshots/*.{png,jpg,jpeg,webp}", { eager: true });
const videos = import.meta.glob<string>("../../content/media/videos/*.{mp4,webm}", { eager: true, query: "?url", import: "default" });
const papers = import.meta.glob<string>("../../content/media/papers/*.pdf", { eager: true, query: "?url", import: "default" });
const media = <T>(map: Record<string, T>, path?: string | null) => (path ? map[`../../content/media/${path}`] : undefined);

const LANE: Record<string, { key: string; label: string }> = {
  "Salesforce/CRM": { key: "salesforce", label: "Salesforce" },
  "Full Stack": { key: "fullstack", label: "Full stack" },
  "Data Science & Research": { key: "research", label: "Research" },
};
// only numbers that are true (content/site.json, resume)
const STAT: Record<string, string> = {
  "ecc-salesforce-case-management": "10 staff · every day",
  fabriq: "3rd of 10+ teams",
  "nasa-grace-climate-research": "2.25× lower error",
};

type Raw = (typeof site.projects)[number] & { previewVideo?: string; summary?: string; demoLogin?: { email: string; password: string }; caseStudy?: unknown[] };

export const projects = (site.projects as Raw[]).map((p, i) => ({
  ...p,
  index: String(i + 1).padStart(2, "0"),
  short: p.name.split(" — ")[0].replace(/ Salesforce Case Management App$/, " Case Management"),
  kind: p.name.includes(" — ") ? p.name.split(" — ")[1] : null,
  line: (p.summary ?? p.description).split(/(?<=\.)\s/)[0],
  img: media(shots, p.screenshot.src)?.default,
  contain: p.screenshot.fit === "contain",
  lane: LANE[p.lane] ?? { key: "other", label: p.lane },
  stat: STAT[p.slug],
  video: media(videos, p.previewVideo ?? `videos/${p.slug}.mp4`),
  paper: media(papers, p.paperUrl),
  demo: media(videos, p.demoVideo),
}));
export type Project = (typeof projects)[number];
export const LANES = Object.values(LANE);
