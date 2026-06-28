type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string | null;
};

export function Skills({ items }: { items: Skill[] }) {
  if (items.length === 0) return null;

  const grouped = items.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <div className="card p-6">
      <h2 className="section-title">Skills</h2>
      <div className="space-y-4">
        {Object.entries(grouped).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="tag">
                  {skill.name}
                  {skill.level && (
                    <span className="ml-1 text-text-muted">({skill.level})</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
