"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createCertification, updateCertification, deleteCertification } from "@/lib/actions";
import { ImageUpload } from "./ImageUpload";

type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: Date;
  url?: string | null;
  image?: string | null;
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

export function CertificationManager({ certifications }: { certifications: Certification[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const editingCert = editingId ? certifications.find((c) => c.id === editingId) : null;

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Certifications</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="btn-primary"
        >
          Add Certification
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Certification" : "New Certification"}
          </h3>
          <form
            action={editingId ? (fd) => updateCertification(editingId, fd) : createCertification}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input name="name" placeholder="Certification Name" required className="input" defaultValue={editingCert?.name ?? ""} />
              <input name="issuer" placeholder="Issuing Organization" required className="input" defaultValue={editingCert?.issuer ?? ""} />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="label">Date</label>
                <input name="date" type="date" required className="input" defaultValue={editingCert?.date ? new Date(editingCert.date).toISOString().split("T")[0] : ""} />
              </div>
              <input name="url" placeholder="Credential URL" className="input" defaultValue={editingCert?.url ?? ""} />
              <ImageUpload name="image" label="Image" currentUrl={editingCert?.image} />
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
        {certifications.map((cert) => (
          <div key={cert.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{cert.name}</p>
              <p className="text-sm text-text-secondary">
                {cert.issuer} · {formatDate(cert.date)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(cert.id);
                  setShowForm(true);
                }}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteCertification(cert.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {certifications.length === 0 && (
          <p className="text-text-secondary text-sm">No certifications yet.</p>
        )}
      </div>
    </div>
  );
}
