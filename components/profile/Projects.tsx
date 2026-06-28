import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  githubUrl?: string | null;
  tags: string[];
};

export function Projects({ items }: { items: Project[] }) {
  if (items.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="section-title">Projects</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border border-card-border p-4 hover:shadow-md transition-shadow"
          >
            {project.image && (
              <div className="relative mb-3 h-[160px] w-full rounded overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            )}
            <h3 className="font-semibold text-foreground">{project.title}</h3>
            {project.description && (
              <p className="mt-1 text-sm text-text-secondary line-clamp-3">
                {project.description}
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
