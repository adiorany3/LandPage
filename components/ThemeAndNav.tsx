"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/content";

const themeKey = "adioranye-next-portfolio-theme";

export default function ThemeAndNav() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(themeKey);
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const shouldUseLight = saved === "light" || (!saved && prefersLight);
    document.body.classList.toggle("light", shouldUseLight);
    setLight(shouldUseLight);

    const onScroll = () => setShowTop(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.body.classList.toggle("light", next);
    window.localStorage.setItem(themeKey, next ? "light" : "dark");
  }

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <button
        className="theme-toggle"
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle light and dark theme"
      >
        {light ? "☾" : "◐"}
      </button>

      <button
        className="menu-toggle"
        id="menuToggle"
        type="button"
        aria-label="Buka navigasi"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        ☰
      </button>

      <nav className={`mobile-nav ${open ? "open" : ""}`} aria-label="Navigasi mobile">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className={`top-button ${showTop ? "show" : ""}`}
        type="button"
        aria-label="Kembali ke atas"
        onClick={scrollTop}
      >
        ↑
      </button>
    </>
  );
}
