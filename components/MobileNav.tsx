"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  ["Work", "/experience"],
  ["Skills", "/skills"],
] as const;

// mobile nav — hamburger dropdown; desktop uses the inline links
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid h-9 w-9 place-items-center rounded-full border border-transparent text-muted transition-colors hover:border-line hover:bg-card hover:text-ink"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>
      {open && (
        <div className="mobile-menu absolute inset-x-0 top-full border-b border-line">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-1 px-6 py-3 font-mono text-sm">
            {LINKS.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-transparent px-3 py-2.5 text-muted transition-colors hover:border-line hover:bg-card hover:text-ink"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
