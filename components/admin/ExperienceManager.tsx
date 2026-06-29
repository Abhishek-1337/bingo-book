"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions";
import { ImageUpload } from "./ImageUpload";

type Experience = {
  id: string;
  company: string;
  role: string;
  logo?: string | null;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
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

export function ExperienceManager({ experiences }: { experiences: Experience[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const editingExp = editingId ? experiences.find((e) => e.id === editingId) : null;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Experience</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Experience" : "New Experience"}
          </h3>
          <form
            action={editingId ? (fd) => updateExperience(editingId, fd) : createExperience}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="company" placeholder="Company" required className="input" defaultValue={editingExp?.company ?? ""} />
              <input name="role" placeholder="Role" required className="input" defaultValue={editingExp?.role ?? ""} />
            </div>
            <ImageUpload name="logo" label="Company Logo" currentUrl={editingExp?.logo} />
            <textarea name="description" placeholder="Description" rows={3} className="input resize-none" defaultValue={editingExp?.description ?? ""} />
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="label">Start Date</label>
                <input name="startDate" type="date" required className="input" defaultValue={editingExp?.startDate ? new Date(editingExp.startDate).toISOString().split("T")[0] : ""} />
              </div>
              <div>
                <label className="label">End Date</label>
                <input name="endDate" type="date" className="input" defaultValue={editingExp?.endDate ? new Date(editingExp.endDate).toISOString().split("T")[0] : ""} />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="current" className="rounded" defaultChecked={editingExp?.current ?? false} />
                  Currently working here
                </label>
              </div>
            </div>
            <input name="order" type="number" placeholder="Order" defaultValue={editingExp?.order ?? 0} className="input w-24" />
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
        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{exp.role}</p>
              <p className="text-sm text-text-secondary">{exp.company}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(exp.id);
                  setShowForm(true);
                }}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteExperience(exp.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-text-secondary text-sm">No experience entries yet.</p>
        )}
      </div>
    </div>
  );
}
