import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/inovasi/ransum-ruminansia", "/ai", "/deep", "/download", "/janjian", "/harga-peternakan", "/edukasi-peternakan"].map(path => ({
    url: `https://www.adioranye.my.id${path || "/"}`,
  }));
}
