import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/content";
import ThemeAndNav from "./ThemeAndNav";

// ponytail: memakai kelas global `.site-header` yang sama persis dengan beranda
// supaya navigasi, brand, dan efek glass tidak pernah berbeda antarhalaman.
export default function SubpageHeader({
  activeHref,
  section
}: {
  activeHref?: string;
  section?: string;
}) {
  return (
    <header className="site-header">
      <Link className="brand" href="/#top" aria-label="Kembali ke bagian atas">
        <Image src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" width={120} height={120} />
        <span>
          <strong>Galuh Adi Insani</strong>
          <small>{section ?? "@adiorany3"}</small>
        </span>
      </Link>
      <nav className="nav" aria-label="Navigasi utama">
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
      <ThemeAndNav />
    </header>
  );
}
