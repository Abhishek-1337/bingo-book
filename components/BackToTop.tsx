"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// back to top — isolated
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="fixed bottom-6 right-[68px] z-50 h-11 w-11 rounded-full bg-ink text-bg grid place-items-center shadow-lg hover:scale-105 transition-transform hover:bg-[color-mix(in_srgb,var(--ink)_80%,transparent)]">
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
