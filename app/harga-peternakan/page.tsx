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
  },
};

export default function HargaPeternakanPage() {
  return (
    <main className={styles.shell}>
      <SubpageHeader activeHref="/harga-peternakan" section="DATA / PETERNAKAN" />
      <CommodityPrices />
    </main>
  );
}
