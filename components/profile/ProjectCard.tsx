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
        className="group cursor-pointer rounded-lg border border-card-border p-4 shadow-sm hover:shadow-md hover:border-accent/30 transition-all"
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
          <p className="mt-1 text-sm text-text-secondary line-clamp-2">
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
        <p className="mt-3 text-xs text-blue-300">Click to view details</p>
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
