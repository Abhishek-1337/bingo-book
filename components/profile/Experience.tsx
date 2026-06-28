import Image from "next/image";

type Experience = {
  id: string;
  company: string;
  role: string;
  logo?: string | null;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function dateRange(exp: Experience) {
  const start = formatDate(exp.startDate);
  const end = exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "";
  return `${start} - ${end}`;
}

export function Experience({ items }: { items: Experience[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-6">
        {items.map((exp) => (
          <div key={exp.id} className="flex gap-4">
            <div className="relative h-12 w-12 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
              {exp.logo ? (
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
                  {exp.company.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{exp.role}</h3>
              <p className="text-foreground">{exp.company}</p>
              <p className="text-sm text-text-secondary">{dateRange(exp)}</p>
              {exp.description && (
                <p className="mt-2 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
