"use client";

import { useState, type CSSProperties } from "react";
import { BrainCircuit, Container, Monitor, Server, Wrench, type LucideIcon } from "lucide-react";

type Skill = { id: string; name: string; category: string; level?: string | null };

// level -> bar fill
const levelPct: Record<string, number> = {
  Expert: 95,
  Advanced: 78,
  Intermediate: 58,
  Beginner: 35,
};
const pctOf = (s: Skill) => levelPct[s.level ?? ""] ?? 50;

// card order: frontend and backend first, the rest after
const GROUP_ORDER = ["Frontend", "Backend", "DevOps", "AI / ML", "Tools"];
const GROUP_ICON: Record<string, LucideIcon> = {
  Frontend: Monitor,
  Backend: Server,
  DevOps: Container,
  "AI / ML": BrainCircuit,
  Tools: Wrench,
};

function groupsOf(items: Skill[]) {
  const map = new Map<string, Skill[]>();
  for (const s of items) {
    if (!map.has(s.category)) map.set(s.category, []);
    map.get(s.category)!.push(s);
  }
  return [...map.entries()].sort(
    ([a], [b]) => (GROUP_ORDER.indexOf(a) === -1 ? 99 : GROUP_ORDER.indexOf(a)) - (GROUP_ORDER.indexOf(b) === -1 ? 99 : GROUP_ORDER.indexOf(b))
  );
}

// skills — filterable group cards: frontend, backend, and the rest
export function Skills({ items }: { items: Skill[] }) {
  const [active, setActive] = useState("All");
  if (!items.length) return null;
  const groups = groupsOf(items);
  const visible = active === "All" ? groups : groups.filter(([cat]) => cat === active);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <span className="iso-tab">Skills</span>
        <span className="section-label">{items.length} tools</span>
      </div>

      {/* tag filters */}
      <div className="flex flex-wrap gap-1.5 mb-6" role="group" aria-label="Filter skills by group">
        {["All", ...groups.map(([cat]) => cat)].map((tag) => {
          const count = tag === "All" ? items.length : groups.find(([c]) => c === tag)?.[1].length ?? 0;
          const on = active === tag;
          return (
            <button
              key={tag}
              onClick={() => setActive(tag)}
              aria-pressed={on}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide transition-colors ${
                on
                  ? "bg-ink text-bg border-ink"
                  : "border-line bg-bg-soft text-muted hover:border-accent/40 hover:text-ink"
              }`}
            >
              {tag}
              <span className={on ? "opacity-60" : "opacity-50"}> · {count}</span>
            </button>
          );
        })}
      </div>

      <div className={visible.length > 1 ? "grid gap-5 md:grid-cols-2 items-start" : "max-w-2xl"}>
        {visible.map(([cat, list]) => {
          const Icon = GROUP_ICON[cat] ?? Wrench;
          return (
            <section key={cat} className="iso-card p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <Icon size={16} aria-hidden="true" className="text-accent shrink-0" />
                <h2 className="font-mono text-[12px] tracking-[0.14em] uppercase font-semibold text-ink">{cat}</h2>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[11px] text-muted">{list.length}</span>
              </div>
              <div className="space-y-4">
                {list.map((s) => (
                  <div key={s.id}>
                    <div className="flex items-baseline justify-between gap-3 mb-1.5">
                      <span className="t-title text-[14px]">{s.name}</span>
                      <span className="font-mono text-[11px] tracking-wide text-muted shrink-0">
                        {s.level ?? "—"}
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={`${s.name} proficiency`}
                      aria-valuenow={pctOf(s)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-[6px] overflow-hidden rounded-full bg-line/50"
                    >
                      <div
                        key={active}
                        className="skill-bar h-full rounded-full bg-accent"
                        style={{ "--w": `${pctOf(s)}%` } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
