type Achievement = {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  icon?: string | null;
  url?: string | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function Achievements({ items }: { items: Achievement[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">Achievements</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((achievement) => (
          <div
            key={achievement.id}
            className="flex items-start gap-4 p-4 rounded-xl bg-project-card text-project-card-text"
          >
            <div className="text-3xl">{achievement.icon || "🏆"}</div>
            <div className="flex-1">
              <h3 className="font-semibold">
                {achievement.url ? (
                  <a
                    href={achievement.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {achievement.title}
                  </a>
                ) : (
                  achievement.title
                )}
              </h3>
              {achievement.description && (
                <p className="mt-1 text-sm opacity-80 line-clamp-2">
                  {achievement.description}
                </p>
              )}
              <p className="mt-2 text-xs opacity-60">{formatDate(achievement.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
