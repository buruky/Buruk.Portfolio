import site from "@content/site.json";

/** All copy and data, from content/site.json (the source of truth). */
export default site;
export type Site = typeof site;
export type Project = Site["projects"][number];
