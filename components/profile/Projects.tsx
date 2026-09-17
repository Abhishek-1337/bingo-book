import { ProjectCard } from "./ProjectCard";
type Project = { id: string; title: string; description?: string | null; image?: string | null; url?: string | null; githubUrl?: string | null; tags: string[] };

// projects — grid isolated
export function Projects({ items }: { items: Project[] }) {
  if (!items.length) return null;
  return (
    <div className="iso-card p-6 md:p-7">
      <div className="flex items-center justify-between mb-5">
        <span className="iso-tab"><b>03</b> Projects</span>
        <span className="section-label">{items.length} works</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  );
}
