// about — isolated note
export function About({ bio }: { bio?: string | null }) {
  if (!bio) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-4">
        <span className="iso-tab"><b>01</b> About</span>
        <span className="font-mono text-[11px] tracking-wide uppercase text-muted">— Biography</span>
      </div>
      <h2 className="card-h mb-3">A quiet builder.</h2>
      <p className="lead whitespace-pre-wrap">{bio}</p>
    </div>
  );
}
