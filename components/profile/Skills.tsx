type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string | null;
};

const CATEGORY_ICONS: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  DevOps: "🚀",
  Mobile: "📱",
  Testing: "🧪",
  Tools: "🛠️",
  "AI / ML": "🤖",
};

const LEVEL_WIDTH: Record<string, string> = {
  Beginner: "w-1/4",
  Intermediate: "w-1/2",
  Advanced: "w-3/4",
  Expert: "w-full",
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
      <div className="grid gap-5 sm:grid-cols-2">
        {Object.entries(grouped).map(([category, skills]) => (
          <div
            key={category}
            className="rounded-lg border border-card-border p-4 bg-background/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{CATEGORY_ICONS[category] ?? "💻"}</span>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                {category}
              </h3>
              <span className="ml-auto text-xs text-text-muted">{skills.length}</span>
            </div>
            <div className="space-y-2.5">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    {skill.level && (
                      <span className="text-xs text-text-secondary">{skill.level}</span>
                    )}
                  </div>
                  {skill.level && (
                    <div className="h-1.5 w-full rounded-full bg-card-border overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-accent ${LEVEL_WIDTH[skill.level] ?? "w-1/2"}`}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
