type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: Date;
  url?: string | null;
  image?: string | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function Certifications({ items }: { items: Certification[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">Certifications</h2>
      <div className="space-y-4">
        {items.map((cert) => (
          <div key={cert.id} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
            <div>
              <h3 className="font-semibold text-foreground">
                {cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {cert.name}
                  </a>
                ) : (
                  cert.name
                )}
              </h3>
              <p className="text-sm text-text-secondary">
                {cert.issuer} · {formatDate(cert.date)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
