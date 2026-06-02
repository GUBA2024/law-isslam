"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    if (saved !== "dark") {
      const rafId = window.requestAnimationFrame(() => setTheme(saved));
      return () => window.cancelAnimationFrame(rafId);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const onToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-full border border-gold/45 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 dark:text-white"
      aria-label="تبديل المظهر"
    >
      {theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن"}
    </button>
  );
}
