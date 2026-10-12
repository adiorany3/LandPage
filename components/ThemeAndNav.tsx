"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/content";

export default function ThemeAndNav() {
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light") setLight(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("light", light);
    window.localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    setLight(prev => !prev);
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={light ? "Gunakan tema gelap" : "Gunakan tema terang"}>{light ? "☾" : "☀"}</button>
      <button className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Tutup navigasi" : "Buka navigasi"} aria-controls="mobile-navigation">☰</button>
      <nav className={`mobile-nav ${open ? "open" : ""}`} id="mobile-navigation" aria-label="Navigasi mobile">
        {navItems.map((item) => <a key={item.href} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <button className={`top-button ${showTop ? "show" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Kembali ke atas">↑</button>
    </>
  );
}
