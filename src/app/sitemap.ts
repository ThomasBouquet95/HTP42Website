import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Three URLs, because there are three pages. The sections of the one page are
 * fragments of it, and a fragment is not a separate entry in a sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1, lastModified },
    {
      url: `${site.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.2,
      lastModified,
    },
    {
      url: `${site.url}/terms`,
      changeFrequency: "yearly",
      priority: 0.2,
      lastModified,
    },
  ];
}
