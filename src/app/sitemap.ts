import type { MetadataRoute } from "next";
import { siteUrl, projects } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/bk-web-studios`, changeFrequency: "monthly", priority: 0.6 },
    ...projects
      .filter((p) => p.paperUrl)
      .map((p) => ({ url: `${siteUrl}/papers/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
