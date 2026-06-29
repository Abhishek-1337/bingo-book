"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 w-12 h-12 rounded-full bg-card border-2 border-yellow-400 shadow-lg flex items-center justify-center text-foreground hover:scale-110 transition-all z-50 animate-pulse"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
