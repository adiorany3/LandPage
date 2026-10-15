import Link from "next/link";
import { navItems } from "@/data/content";
import styles from "./SubpageHeader.module.css";

// ponytail: satu shell untuk semua subhalaman; tambah prop bila suatu halaman
// butuh gaya header berbeda alih-alih mem forked markup per halaman.
export default function SubpageHeader({
  activeHref,
  section
}: {
  activeHref?: string;
  section?: string;
}) {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/" aria-label="Adioranye, kembali ke beranda">
        <span className={styles.mark}>A<span>.</span></span>
        <span><strong>ADIORANYE</strong><small>{section ?? "RESEARCH & TECHNOLOGY"}</small></span>
      </Link>
      <nav className={styles.nav} aria-label="Navigasi utama">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href.startsWith("#") ? `/${item.href}` : item.href}
            aria-current={item.href === activeHref || `/${item.href}` === activeHref ? "page" : undefined}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <Link className={styles.home} href="/">&larr; Beranda</Link>
    </header>
  );
}
