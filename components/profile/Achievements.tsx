type Ach = { id: string; title: string; description?: string | null; date: Date; icon?: string | null; url?: string | null };
function fmt(d: Date) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }

// achievements — bento isolated
export function Achievements({ items }: { items: Ach[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="iso-tab"><b>—</b> Achievements</span>
        <span className="section-label">Highlights</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((a) => (
          <div key={a.id} className="rounded-2xl bg-bg-soft border border-line p-4 flex gap-3">
            <span className="text-xl shrink-0">{a.icon || "◆"}</span>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold leading-tight">
                {a.url ? <a href={a.url} target="_blank" className="hover:underline">{a.title} ↗</a> : a.title}
              </div>
              {a.description && <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--muted-2)] line-clamp-2">{a.description}</p>}
              <p className="mt-1.5 font-mono text-[11px] tracking-wide text-muted">{fmt(a.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
