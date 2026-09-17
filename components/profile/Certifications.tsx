type Cert = { id: string; name: string; issuer: string; date: Date; url?: string | null };
function fmt(d: Date) { return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }); }

// certs — list isolated
export function Certifications({ items }: { items: Cert[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="iso-tab">Certifications</span>
        <span className="section-label">Verified</span>
      </div>
      <div className="divide-y divide-line">
        {items.map((c) => (
          <div key={c.id} className="flex gap-3 py-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="t-title">
                {c.url ? <a href={c.url} target="_blank" className="link-accent">{c.name} ↗</a> : c.name}
              </div>
              <div className="t-meta mt-1">{c.issuer} · {fmt(c.date)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
