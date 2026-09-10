import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { caseStudies } from "@/content/cases";

type Entry = MetadataRoute.Sitemap[number];

const ROUTES: Omit<Entry, "lastModified">[] = [
  { url: site.url, changeFrequency: "monthly", priority: 1 },
  { url: `${site.url}/expertise`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${site.url}/impact`, changeFrequency: "monthly", priority: 0.9 },
  { url: `${site.url}/network`, changeFrequency: "monthly", priority: 0.8 },
  { url: `${site.url}/perspectives`, changeFrequency: "weekly", priority: 0.7 },
  { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const cases: Omit<Entry, "lastModified">[] = caseStudies.map((study) => ({
    url: `${site.url}/impact/${study.slug}`,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...ROUTES, ...cases].map((entry) => ({ ...entry, lastModified }));
}
