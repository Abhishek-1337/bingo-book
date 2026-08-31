type Skill = { id: string; name: string; category: string; level?: string | null };

// dot level hint
const levelDot: Record<string, string> = {
  Beginner: "opacity-40",
  Intermediate: "opacity-60",
  Advanced: "opacity-80",
  Expert: "opacity-100",
};

// skills — airy pill list (no heavy cards)
export function Skills({ items }: { items: Skill[] }) {
  if (!items.length) return null;
  const grouped = items.reduce((a, s) => ((a[s.category] ??= []).push(s), a), {} as Record<string, Skill[]>);
  const cats = Object.entries(grouped);

  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="iso-tab"><b>04</b> Skills</span>
        <span className="section-label">{items.length} tools</span>
      </div>

      <div className="divide-y divide-line/70">
        {cats.map(([cat, list]) => (
          <div key={cat} className="py-4 first:pt-0 last:pb-0 flex gap-4">
            {/* category label */}
            <div className="w-[92px] shrink-0 pt-1">
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase font-semibold text-muted">{cat}</div>
              <div className="font-mono text-[10px] text-muted/60 mt-1">{list.length} items</div>
            </div>
            {/* pills */}
            <div className="flex flex-wrap gap-1.5 content-start flex-1">
              {list.map((s) => (
                <span
                  key={s.id}
                  title={s.level ?? undefined}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-line bg-card-soft text-[13px] leading-none"
                >
                  <span className={`h-1.5 w-1.5 rounded-full bg-accent ${s.level ? levelDot[s.level] ?? "opacity-60" : "opacity-30"}`} />
                  {s.name}
                  {s.level && <span className="font-mono text-[10px] text-muted ml-0.5">· {s.level[0]}</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
