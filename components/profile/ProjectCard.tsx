"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Project = { id: string; title: string; description?: string | null; image?: string | null; url?: string | null; githubUrl?: string | null; tags: string[] };

// project card — isolated tile
export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <>
      <button onClick={() => setOpen(true)} className="text-left w-full group rounded-2xl border border-line bg-card-soft overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all">
        {project.image && (
          <div className="relative h-[156px] w-full overflow-hidden bg-bg-soft">
            <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" sizes="400px" />
            <div className="absolute top-3 left-3 font-mono text-[11px] tracking-wide uppercase bg-card/90 backdrop-blur px-2 py-1 rounded-full border border-line">View ↗</div>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-[15px] leading-tight">{project.title}</h3>
          {project.description && <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--muted-2)] line-clamp-2">{project.description}</p>}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="font-mono text-[11px] tracking-wide px-2 py-1 rounded-full bg-card border border-line text-muted">{t}</span>
            ))}
          </div>
        </div>
      </button>

      {open &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="relative w-full max-w-lg rounded-2xl bg-card border border-line overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
              {project.image && (
                <div className="relative h-[240px] w-full bg-bg-soft">
                  <Image src={project.image} alt={project.title} fill className="object-cover" sizes="600px" />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between gap-4">
                  <h3 className="display text-2xl">{project.title}</h3>
                  <button onClick={() => setOpen(false)} className="h-8 w-8 rounded-full border border-line grid place-items-center hover:bg-bg-soft">✕</button>
                </div>
                {project.description && <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--muted-2)] whitespace-pre-wrap">{project.description}</p>}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-ink text-bg">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-2">
                  {project.url && (
                    <a href={project.url} target="_blank" className="btn-a text-xs">
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" className="btn-b text-xs">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
