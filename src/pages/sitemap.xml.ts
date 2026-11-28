// The sitemap for search engines (robots.txt points here): every page, project pages from content/site.json.
import type { APIRoute } from "astro";
import { projects } from "@/lib/projects";

const PAGES = ["/", "/work", "/about", "/bk-web-studios", "/research", "/resume", "/contact", "/credits"];

export const GET: APIRoute = ({ site }) => {
  const urls = [...PAGES, ...projects.map((p) => `/work/${p.slug}`)].map((path) => new URL(path, site).href);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
