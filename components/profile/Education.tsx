import Image from "next/image";

type Education = {
  id: string;
  school: string;
  degree: string;
  field?: string | null;
  logo?: string | null;
  startDate: Date;
  endDate?: Date | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function Education({ items }: { items: Education[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">Education</h2>
      <div className="space-y-6">
        {items.map((edu) => (
          <div key={edu.id} className="flex gap-4">
            <div className="relative h-12 w-12 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
              {edu.logo ? (
                <Image
                  src={edu.logo}
                  alt={edu.school}
                  fill
                  className="object-contain p-1"
                  sizes="48px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-gray-400">
                  {edu.school.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{edu.school}</h3>
              <p className="text-foreground">
                {edu.degree}
                {edu.field ? ` - ${edu.field}` : ""}
              </p>
              <p className="text-sm text-text-secondary">
                {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : "Present"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
