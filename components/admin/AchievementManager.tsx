"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createAchievement, updateAchievement, deleteAchievement } from "@/lib/actions";

type Achievement = {
  id: string;
  title: string;
  description?: string | null;
  date: Date;
  icon?: string | null;
  url?: string | null;
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

function formatDate(date: Date) {
  return new Date(date).toISOString().split("T")[0];
}

const iconOptions = ["🏆", "🎖️", "🏅", "🥇", "🎯", "⭐", "🚀", "💡", "🔥", "✨"];

export function AchievementManager({ achievements }: { achievements: Achievement[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const editingAchievement = editingId ? achievements.find((a) => a.id === editingId) : null;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Achievements</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Achievement
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Achievement" : "New Achievement"}
          </h3>
          <form
            action={editingId ? (fd) => updateAchievement(editingId, fd) : createAchievement}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="title" placeholder="Achievement Title" required className="input" defaultValue={editingAchievement?.title ?? ""} />
              <div>
                <label className="label">Date</label>
                <input name="date" type="date" required className="input" defaultValue={editingAchievement?.date ? new Date(editingAchievement.date).toISOString().split("T")[0] : ""} />
              </div>
            </div>
            <textarea name="description" placeholder="Description (optional)" rows={2} className="input" defaultValue={editingAchievement?.description ?? ""} />
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="url" placeholder="URL (optional)" className="input" defaultValue={editingAchievement?.url ?? ""} />
              <input name="order" type="number" placeholder="Order" className="input" defaultValue={editingAchievement?.order ?? 0} />
            </div>
            <div>
              <label className="label">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {iconOptions.map((icon) => (
                  <label key={icon} className="cursor-pointer">
                    <input type="radio" name="icon" value={icon} className="hidden" defaultChecked={editingAchievement?.icon === icon} />
                    <span className="inline-block text-2xl p-2 rounded-lg border border-card-border hover:border-accent transition-colors has-[:checked]:bg-accent has-[:checked]:text-white">
                      {icon}
                    </span>
                  </label>
                ))}
              </div>
            </div>
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
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{achievement.icon || "🏆"}</span>
              <div>
                <p className="font-semibold">{achievement.title}</p>
                <p className="text-sm text-text-secondary">
                  {formatDate(achievement.date)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(achievement.id);
                  setShowForm(true);
                }}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteAchievement(achievement.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {achievements.length === 0 && (
          <p className="text-text-secondary text-sm">No achievements yet.</p>
        )}
      </div>
    </div>
  );
}
