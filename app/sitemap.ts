import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/inovasi/ransum-ruminansia", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/edukasi-peternakan", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/harga-peternakan", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/download", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/janjian", changeFrequency: "monthly" as const, priority: 0.6 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `https://www.adioranye.my.id${path || "/"}`,
    changeFrequency,
    priority,
  }));
}
