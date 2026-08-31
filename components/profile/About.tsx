// about — isolated note
export function About({ bio }: { bio?: string | null }) {
  if (!bio) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-4">
        <span className="iso-tab"><b>01</b> About</span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-muted">— Biography</span>
      </div>
      <h2 className="display text-[26px] mb-3">A quiet builder.</h2>
      <p className="prose-muted text-[14.5px] whitespace-pre-wrap">{bio}</p>
    </div>
  );
}
