import Image from "next/image";

type Edu = { id: string; school: string; degree: string; field?: string | null; logo?: string | null; startDate: Date; endDate?: Date | null };
function fmt(d: Date) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }

// education — minimal isolated
export function Education({ items }: { items: Edu[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <span className="iso-tab"><b>—</b> Education</span>
        <span className="section-label">Study</span>
      </div>
      <div className="space-y-5">
        {items.map((e) => (
          <div key={e.id} className="flex gap-4 p-3 rounded-2xl bg-bg-soft border border-line/60">
            <div className="h-10 w-10 rounded-lg bg-card border border-line grid place-items-center overflow-hidden shrink-0">
              {e.logo ? <Image src={e.logo} alt={e.school} width={40} height={40} className="object-contain p-1" /> : <span className="text-sm font-bold text-muted">{e.school[0]}</span>}
            </div>
            <div>
              <h3 className="text-sm font-semibold">{e.school}</h3>
              <p className="text-sm text-muted">{e.degree}{e.field ? ` · ${e.field}` : ""}</p>
              <p className="font-mono text-[11px] text-muted mt-1">{fmt(e.startDate)} — {e.endDate ? fmt(e.endDate) : "Present"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
