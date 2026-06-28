export function About({ bio }: { bio?: string | null }) {
  if (!bio) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">About</h2>
      <p className="text-foreground leading-relaxed whitespace-pre-wrap">{bio}</p>
    </div>
  );
}
