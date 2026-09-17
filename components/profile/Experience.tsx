import Image from "next/image";

type Experience = {
  id: string; company: string; role: string; logo?: string | null;
  description?: string | null; startDate: Date; endDate?: Date | null; current: boolean;
};

function fmt(d: Date) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }

// experience — timeline isolated
export function Experience({ items }: { items: Experience[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-6">
        <span className="iso-tab">Experience</span>
        <span className="section-label">{items.length} roles</span>
      </div>
      <div className="relative pl-6 border-l border-line space-y-6">
        {items.map((e) => (
          <div key={e.id} className="relative">
            {/* dot */}
            <span className="absolute -left-[29px] top-2 h-[10px] w-[10px] rounded-full bg-accent border-2 border-card shadow" />
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-bg-soft border border-line overflow-hidden grid place-items-center shrink-0">
                {e.logo ? <Image src={e.logo} alt={e.company} width={44} height={44} className="object-contain p-1" /> : <span className="font-bold text-muted">{e.company[0]}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="t-title">{e.role}</h3>
                <p className="t-sub font-medium mt-0.5">{e.company}</p>
                <p className="t-meta mt-1">{fmt(e.startDate)} — {e.current ? "Present" : e.endDate ? fmt(e.endDate) : ""} {e.current && "· Now"}</p>
                {e.description && <p className="t-desc mt-2 whitespace-pre-wrap">{e.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
