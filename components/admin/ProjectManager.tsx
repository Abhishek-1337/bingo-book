"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createProject, updateProject, deleteProject } from "@/lib/actions";

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

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Projects</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Project
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Project" : "New Project"}
          </h3>
          <form
            action={editingId ? (fd) => updateProject(editingId, fd) : createProject}
            className="space-y-3"
          >
            <input name="title" placeholder="Project Title" required className="input" />
            <textarea name="description" placeholder="Description" rows={3} className="input resize-none" />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="url" placeholder="Live Demo URL" className="input" />
              <input name="githubUrl" placeholder="GitHub URL" className="input" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="image" placeholder="Project Image URL" className="input" />
              <input name="tags" placeholder="Tags (comma separated)" className="input" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="order" type="number" placeholder="Order" defaultValue={0} className="input" />
            </div>
            <input type="hidden" name="id" />
            <div className="flex gap-2">
              <FormButton />
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
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
                onClick={() => {
                  setEditingId(project.id);
                  setShowForm(true);
                }}
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
