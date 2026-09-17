"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/actions";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="card p-4 h-fit">
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-ink text-bg"
                : "text-muted hover:bg-card-soft hover:text-ink"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-card-border space-y-2">
        <a
          href="/"
          target="_blank"
          className="block rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-card-soft hover:text-ink transition-colors"
        >
          View Portfolio
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
