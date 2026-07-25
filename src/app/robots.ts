import type { MetadataRoute } from "next";
import { seo } from "@/data/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: seo.robots.index ? "/" : undefined,
      disallow: seo.robots.index ? undefined : "/",
    },
    sitemap: `${seo.siteUrl}/sitemap.xml`,
    host: seo.siteUrl,
  };
}
