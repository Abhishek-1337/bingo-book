"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
  name: string;
  label: string;
  currentUrl?: string | null;
  accept?: string;
  className?: string;
};

export function ImageUpload({
  name,
  label,
  currentUrl,
  accept = "image/*",
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlMode, setUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      setPreview(data.url);
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = data.url;
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (preview && preview.includes("blob.vercel-storage.com")) {
      try {
        await fetch("/api/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: preview }),
        });
      } catch {
        // silently fail
      }
    }
    setPreview(null);
    setError(null);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input type="hidden" name={name} ref={hiddenInputRef} value={preview ?? ""} />

      {preview && (
        <div className="relative mb-2 h-32 w-32 overflow-hidden rounded-lg border border-card-border">
          <Image src={preview} alt={label} fill className="object-cover" sizes="128px" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
          >
            ✕
          </button>
        </div>
      )}

      {urlMode ? (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Paste image URL"
            className="input flex-1"
            defaultValue={preview ?? ""}
            onBlur={(e) => {
              setPreview(e.target.value || null);
              if (hiddenInputRef.current) {
                hiddenInputRef.current.value = e.target.value;
              }
            }}
          />
          <button
            type="button"
            onClick={() => setUrlMode(false)}
            className="btn-secondary text-sm"
          >
            Upload
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <label className="btn-secondary cursor-pointer text-sm">
            {uploading ? "Uploading..." : "Choose File"}
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
          <button
            type="button"
            onClick={() => setUrlMode(true)}
            className="text-xs text-text-secondary hover:text-text-primary"
          >
            Or paste URL
          </button>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
