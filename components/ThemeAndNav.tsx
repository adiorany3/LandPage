"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/content";

export default function ThemeAndNav() {
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const shouldUseLight = saved === "light";
    document.body.classList.toggle("light", shouldUseLight);

    const frame = window.requestAnimationFrame(() => {
      setLight(shouldUseLight);
      setShowTop(window.scrollY > 500);
    });
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function toggleTheme() {
    const next = !light;
    setLight(next);
    document.body.classList.toggle("light", next);
    window.localStorage.setItem("theme", next ? "light" : "dark");
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Ubah tema">
        {light ? "☾" : "☀"}
      </button>
      <button
        className="menu-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Buka navigasi"
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
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas"
      >
        ↑
      </button>
    </>
  );
}
