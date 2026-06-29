"use client";

import { useState } from "react";
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

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group cursor-pointer rounded-2xl border border-project-card-border p-6 shadow-md hover:shadow-xl transition-all bg-project-card text-project-card-text min-h-[200px]"
      >
        {project.image && (
          <div className="relative mb-4 h-[140px] w-full rounded-xl overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          </div>
        )}
        <h3 className="font-semibold text-lg">{project.title}</h3>
        {project.description && (
          <p className="mt-2 text-sm opacity-80 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/10 font-medium">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs opacity-50 group-hover:opacity-100 transition-opacity">Click to view details →</p>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-card shadow-xl border border-card-border">
            {project.image && (
              <div className="relative h-[280px] w-full rounded-t-xl overflow-hidden bg-gray-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary hover:bg-card-border hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              {project.description && (
                <p className="mt-3 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
