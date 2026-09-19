import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackToTop } from "@/components/BackToTop";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });
const display = Newsreader({ variable: "--font-display", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  title: "Abhishek Vishwakarma — Archive",
  description: "Full Stack Developer — isolated works, notes & experiments.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        {/* nav */}
        <nav className="nav-blur sticky top-0 z-40">
          <div className="mx-auto max-w-[1160px] px-6 h-[56px] flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <span className="h-7 w-7 rounded-full bg-ink text-bg grid place-items-center font-mono text-[11px] font-bold">AV</span>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted">Archive — 2026</span>
            </a>
            <div className="hidden md:flex items-center gap-1 font-mono text-xs">
              {[
                ["Work", "/experience"],
                ["Skills", "/skills"],
              ].map(([l, h]) => (
                <a key={h} href={h} className="px-3 py-1.5 rounded-full hover:bg-card border border-transparent hover:border-line transition-colors text-muted hover:text-ink">
                  {l}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase text-muted"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Available for work</span>
            </div>
          </div>
        </nav>

        {children}

        {/* footer */}
        <footer className="mt-12 border-t border-line py-10">
          <div className="mx-auto max-w-[1160px] px-6 flex flex-col md:flex-row justify-between gap-4 font-mono text-[11px] tracking-wide uppercase text-muted">
            <span>© {new Date().getFullYear()} Abhishek Vishwakarma — Built as an archive.</span>
            <span className="opacity-60">India — UTC+5:30</span>
          </div>
        </footer>

        <ThemeToggle />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
