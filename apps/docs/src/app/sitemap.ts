import type { MetadataRoute } from "next";
import { navigation } from "@/lib/navigation";

const BASE = "https://ui.hotfix.jobs";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = new Set<string>(["/", "/docs"]);
  for (const group of navigation) {
    for (const item of group.items) paths.add(item.href);
  }
  return [...paths].map((path) => ({
    url: `${BASE}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : path === "/docs" ? 0.9 : 0.7,
  }));
}
