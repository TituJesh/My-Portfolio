import type { MetadataRoute } from "next";
import { notes, projects, site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...notes.map((n) => ({ url: `${site.url}/notes/${n.slug}`, lastModified: new Date(n.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
