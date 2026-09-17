"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useFormStatus } from "react-dom";
import { createProject, updateProject, deleteProject } from "@/lib/actions";
import { ImageUpload } from "./ImageUpload";

type Project = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  url?: string | null;
  githubUrl?: string | null;
  tags: string[];
  order: number;
};

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving..." : "Save Project"}
    </button>
  );
}

export function ProjectManager({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const editingProject = editingId ? projects.find((p) => p.id === editingId) : null;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!showForm) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [showForm]);

  function handleOpen(project?: Project) {
    if (project) setEditingId(project.id);
    else setEditingId(null);
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditingId(null);
  }

  const modal = showForm && mounted ? createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
        {/* header */}
        <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4">
          <h3 className="text-[15px] font-semibold tracking-tight">
            {editingId ? "Edit Project" : "New Project"}
          </h3>
          <button
            onClick={handleClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted hover:bg-bg-soft hover:text-ink transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <form
          action={editingId ? (fd) => updateProject(editingId, fd) : createProject}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            <div>
              <label className="label">Project Title *</label>
              <input name="title" placeholder="e.g. Bingo Book" required className="input" defaultValue={editingProject?.title ?? ""} />
            </div>

            <div>
              <label className="label">Description</label>
              <textarea name="description" placeholder="Short summary of the project..." rows={3} className="input resize-none" defaultValue={editingProject?.description ?? ""} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label">Live Demo URL</label>
                <input name="url" type="url" placeholder="https://..." className="input" defaultValue={editingProject?.url ?? ""} />
              </div>
              <div>
                <label className="label">GitHub URL</label>
                <input name="githubUrl" type="url" placeholder="https://github.com/..." className="input" defaultValue={editingProject?.githubUrl ?? ""} />
              </div>
            </div>

            <ImageUpload name="image" label="Project Image" currentUrl={editingProject?.image} />

            <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
              <div>
                <label className="label">Tags</label>
                <input name="tags" placeholder="React, Next.js, Tailwind (comma separated)" className="input" defaultValue={editingProject?.tags.join(", ") ?? ""} />
              </div>
              <div>
                <label className="label">Order</label>
                <input name="order" type="number" placeholder="0" defaultValue={editingProject?.order ?? 0} className="input" />
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="flex shrink-0 justify-end gap-2 border-t border-line bg-card-soft/50 px-6 py-4">
            <button type="button" onClick={handleClose} className="btn-secondary">
              Cancel
            </button>
            <FormButton />
          </div>
        </form>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Projects</h2>
        <button onClick={() => handleOpen()} className="btn-primary">
          Add Project
        </button>
      </div>

      {modal}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between rounded-xl border border-line bg-card-soft p-4">
            <div className="min-w-0 flex-1 pr-4">
              <p className="font-semibold truncate">{project.title}</p>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-[11px]">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => handleOpen(project)}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteProject(project.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <p className="text-sm text-muted">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
