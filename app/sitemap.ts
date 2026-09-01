import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/about`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE.url}/privacy`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
