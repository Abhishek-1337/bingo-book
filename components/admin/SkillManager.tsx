"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions";

type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string | null;
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

export function SkillManager({ skills }: { skills: Skill[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Skills</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Skill
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Skill" : "New Skill"}
          </h3>
          <form
            action={editingId ? (fd) => updateSkill(editingId, fd) : createSkill}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <input name="name" placeholder="Skill Name" required className="input" />
              <input name="category" placeholder="Category" required className="input" />
              <input name="level" placeholder="Level (e.g. Expert)" className="input" />
            </div>
            <input name="order" type="number" placeholder="Order" defaultValue={0} className="input w-24" />
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
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm text-text-secondary">
                {skill.category}
                {skill.level ? ` · ${skill.level}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(skill.id);
                  setShowForm(true);
                }}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteSkill(skill.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-text-secondary text-sm">No skills yet.</p>
        )}
      </div>
    </div>
  );
}
