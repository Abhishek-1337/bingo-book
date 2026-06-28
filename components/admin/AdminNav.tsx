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
                ? "bg-accent text-white"
                : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
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
          className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          View Portfolio
        </a>
        <form action={logoutAction}>
          <button
            type="submit"
            className="block w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
