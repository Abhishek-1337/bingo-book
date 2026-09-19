import { ArrowUpRight } from "lucide-react";
import { AchievementIcon } from "@/components/achievement-icons";

type Ach = { id: string; title: string; description?: string | null; date: Date; icon?: string | null; url?: string | null };
function fmt(d: Date) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }

// achievements — bento isolated
export function Achievements({ items }: { items: Ach[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="iso-tab">Achievements</span>
        <span className="section-label">Highlights</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((a) => (
          <div key={a.id} className="rounded-2xl bg-bg-soft border border-line p-4 flex gap-3">
            <AchievementIcon name={a.icon} className="h-4 w-4 mt-[2px] shrink-0 text-accent" />
            <div className="min-w-0">
              <div className="t-title">
                {a.url ? <a href={a.url} target="_blank" className="link-accent inline-flex items-center gap-0.5">{a.title}<ArrowUpRight size={13} aria-hidden="true" /></a> : a.title}
              </div>
              {a.description && <p className="t-desc mt-1 line-clamp-2">{a.description}</p>}
              <p className="t-meta mt-1.5">{fmt(a.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
