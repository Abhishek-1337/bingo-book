"use client";
import { useEffect, useState } from "react";

// theme — isolated toggle
export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const s = localStorage.getItem("theme");
    const d = s ? s === "dark" : true;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => {
    const n = !dark;
    setDark(n);
    document.documentElement.classList.toggle("dark", n);
    localStorage.setItem("theme", n ? "dark" : "light");
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-card border border-line shadow-lg grid place-items-center hover:scale-105 hover:border-accent/40 transition-all">
      {dark ? "☀" : "☾"}
    </button>
  );
}
