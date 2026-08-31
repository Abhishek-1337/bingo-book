type Skill = { id: string; name: string; category: string; level?: string | null };

const ICON: Record<string, string> = { Frontend: "◐", Backend: "⬢", DevOps: "⬡", Tools: "✦", "AI / ML": "✳" };
const WIDTH: Record<string, string> = { Beginner: "25%", Intermediate: "50%", Advanced: "75%", Expert: "100%" };

// skills — one card per row, scrollable
export function Skills({ items }: { items: Skill[] }) {
  if (!items.length) return null;
  const grouped = items.reduce((a, s) => ((a[s.category] ??= []).push(s), a), {} as Record<string, Skill[]>);
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-4">
        <span className="iso-tab"><b>04</b> Skills</span>
        <span className="section-label">{items.length} tools</span>
      </div>
      <div className="grid gap-3 max-h-[420px] overflow-y-auto pr-1 -mr-1 overscroll-contain scrollbar-thin">
        {Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="rounded-2xl border border-line bg-bg-soft p-4 shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-7 w-7 rounded-full bg-card border border-line grid place-items-center text-xs">{ICON[cat] ?? "•"}</span>
              <span className="font-mono text-[11px] tracking-widest uppercase font-semibold">{cat}</span>
              <span className="ml-auto font-mono text-[10px] text-muted">{list.length}</span>
            </div>
            <div className="space-y-3">
              {list.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium">{s.name}</span>
                    {s.level && <span className="font-mono text-[10px] tracking-wide text-muted">{s.level}</span>}
                  </div>
                  {s.level && (
                    <div className="mt-1.5 h-1.5 rounded-full bg-card border border-line overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: WIDTH[s.level] ?? "50%" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
