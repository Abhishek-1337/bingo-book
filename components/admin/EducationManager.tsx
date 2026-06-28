"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions";

type Education = {
  id: string;
  school: string;
  degree: string;
  field?: string | null;
  logo?: string | null;
  startDate: Date;
  endDate?: Date | null;
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

export function EducationManager({ educations }: { educations: Education[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Education</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Education
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Education" : "New Education"}
          </h3>
          <form
            action={editingId ? (fd) => updateEducation(editingId, fd) : createEducation}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="school" placeholder="School" required className="input" />
              <input name="degree" placeholder="Degree" required className="input" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="field" placeholder="Field of Study" className="input" />
              <input name="logo" placeholder="School Logo URL" className="input" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="label">Start Date</label>
                <input name="startDate" type="date" required className="input" />
              </div>
              <div>
                <label className="label">End Date</label>
                <input name="endDate" type="date" className="input" />
              </div>
              <div>
                <label className="label">Order</label>
                <input name="order" type="number" defaultValue={0} className="input" />
              </div>
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
        {educations.map((edu) => (
          <div key={edu.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{edu.school}</p>
              <p className="text-sm text-text-secondary">
                {edu.degree}
                {edu.field ? ` - ${edu.field}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(edu.id);
                  setShowForm(true);
                }}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteEducation(edu.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {educations.length === 0 && (
          <p className="text-text-secondary text-sm">No education entries yet.</p>
        )}
      </div>
    </div>
  );
}
