import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // The content editor is not for crawlers, and the redirect to its login
    // page is not a useful result either.
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
