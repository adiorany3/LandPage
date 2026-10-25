import type { Metadata } from "next";
import CommodityPrices from "@/components/CommodityPrices";
import styles from "./page.module.css";
import SubpageHeader from "@/components/SubpageHeader";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Harga Komoditas Peternakan",
  description: "Pantau harga telur, daging, ternak, pakan, dan susu beserta tanggal data dan sumbernya.",
  alternates: { canonical: "/harga-peternakan" },
  openGraph: {
    title: "Harga Komoditas Peternakan",
    description: "Pantau harga telur, daging, ternak, pakan, dan susu beserta tanggal data dan sumbernya.",
    url: "/harga-peternakan",
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Harga komoditas peternakan" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function HargaPeternakanPage() {
  return (
    <main className={styles.shell}>
      <SubpageHeader activeHref="/harga-peternakan" section="DATA / PETERNAKAN" />
      <CommodityPrices />
    </main>
  );
}
