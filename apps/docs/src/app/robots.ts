import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ui.hotfix.jobs/sitemap.xml",
    host: "https://ui.hotfix.jobs",
  };
}
