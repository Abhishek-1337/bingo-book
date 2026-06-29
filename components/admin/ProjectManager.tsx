"use client";

import { useState } from "react";
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
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export function ProjectManager({ projects }: { projects: Project[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const editingProject = editingId ? projects.find((p) => p.id === editingId) : null;

  function handleOpen(project?: Project) {
    if (project) {
      setEditingId(project.id);
    } else {
      setEditingId(null);
    }
    setShowForm(true);
  }

  function handleClose() {
    setShowForm(false);
    setEditingId(null);
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Projects</h2>
        <button onClick={() => handleOpen()} className="btn-primary">
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-card p-6 shadow-xl border border-card-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">
                {editingId ? "Edit Project" : "New Project"}
              </h3>
              <button
                onClick={handleClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-text-secondary hover:bg-card-border hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <form
              action={editingId ? (fd) => updateProject(editingId, fd) : createProject}
              className="space-y-3"
            >
              <input name="title" placeholder="Project Title" required className="input" defaultValue={editingProject?.title ?? ""} />
              <textarea name="description" placeholder="Description" rows={3} className="input resize-none" defaultValue={editingProject?.description ?? ""} />
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="url" placeholder="Live Demo URL" className="input" defaultValue={editingProject?.url ?? ""} />
                <input name="githubUrl" placeholder="GitHub URL" className="input" defaultValue={editingProject?.githubUrl ?? ""} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <ImageUpload name="image" label="Project Image" currentUrl={editingProject?.image} />
                <input name="tags" placeholder="Tags (comma separated)" className="input" defaultValue={editingProject?.tags.join(", ") ?? ""} />
              </div>
              <input name="order" type="number" placeholder="Order" defaultValue={editingProject?.order ?? 0} className="input w-24" />
              <input type="hidden" name="id" />
              <div className="flex gap-2 pt-2">
                <FormButton />
                <button type="button" onClick={handleClose} className="btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{project.title}</p>
              <div className="flex gap-1 mt-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag text-xs">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
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
          <p className="text-text-secondary text-sm">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
