type Skill = { id: string; name: string; category: string; level?: string | null };

// level -> subtle opacity hint, not a bar
const levelStyle: Record<string, string> = {
  Expert: "font-medium opacity-100",
  Advanced: "opacity-80",
  Intermediate: "opacity-60",
  Beginner: "opacity-50",
};

// skills — editorial index, no cards, no bars
export function Skills({ items }: { items: Skill[] }) {
  if (!items.length) return null;
  const grouped = items.reduce((a, s) => ((a[s.category] ??= []).push(s), a), {} as Record<string, Skill[]>);

  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <span className="iso-tab"><b>04</b> Skills</span>
        <span className="section-label">{items.length} tools</span>
      </div>

      <div className="divide-y divide-line/60">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="flex gap-5 py-4 first:pt-0 last:pb-0">
            <div className="w-[88px] shrink-0">
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase font-semibold text-muted">{cat}</div>
              <div className="mt-1 h-px w-6 bg-accent/40" />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 min-w-0 flex-1">
              {list.map((s, i) => (
                <span key={s.id} className="inline-flex items-baseline gap-1.5 text-[13.5px] leading-none">
                  <span className={levelStyle[s.level ?? ""] ?? "opacity-70"}>{s.name}</span>
                  {s.level && <span className="font-mono text-[10px] tracking-wide text-muted">{s.level}</span>}
                  {i < list.length - 1 && <span className="text-muted/25 ml-1">·</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-1.5 font-mono text-[10px] text-muted/60">
        <span className="opacity-100">Expert</span>
        <span>·</span>
        <span className="opacity-60">Beginner</span>
        <span className="ml-auto hidden sm:inline">ordered by proficiency</span>
      </div>
    </div>
  );
}
