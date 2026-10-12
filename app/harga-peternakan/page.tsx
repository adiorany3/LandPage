import type { Metadata } from "next";
import Link from "next/link";
import CommodityPrices from "@/components/CommodityPrices";
import styles from "./page.module.css";

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
      <nav aria-label="Navigasi utama" className={styles.navigation}>
        <Link href="/">← Kembali ke beranda</Link>
      </nav>
      <CommodityPrices />
    </main>
  );
}
