"use client";

import { updateProfile } from "@/lib/actions";
import { useRef } from "react";

type Profile = {
  name: string;
  headline: string;
  bio?: string | null;
  location?: string | null;
  profileImage?: string | null;
  coverImage?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    await updateProfile(formData);
    // Form stays with updated values since revalidatePath refreshes the page
  }

  return (
    <div className="card p-6">
      <h2 className="section-title">Edit Profile</h2>

      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="label">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={profile?.name}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="headline" className="label">
              Headline *
            </label>
            <input
              type="text"
              id="headline"
              name="headline"
              required
              defaultValue={profile?.headline}
              className="input"
              placeholder="e.g. Full Stack Developer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="label">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            defaultValue={profile?.bio ?? ""}
            className="input resize-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="label">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={profile?.location ?? ""}
              className="input"
              placeholder="e.g. San Francisco, CA"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={profile?.email ?? ""}
              className="input"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="label">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={profile?.phone ?? ""}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="website" className="label">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              defaultValue={profile?.website ?? ""}
              className="input"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="github" className="label">
              GitHub
            </label>
            <input
              type="url"
              id="github"
              name="github"
              defaultValue={profile?.github ?? ""}
              className="input"
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="label">
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              defaultValue={profile?.linkedin ?? ""}
              className="input"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
          <div>
            <label htmlFor="twitter" className="label">
              Twitter
            </label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              defaultValue={profile?.twitter ?? ""}
              className="input"
              placeholder="https://twitter.com/..."
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="profileImage" className="label">
              Profile Image URL
            </label>
            <input
              type="url"
              id="profileImage"
              name="profileImage"
              defaultValue={profile?.profileImage ?? ""}
              className="input"
              placeholder="https://..."
            />
          </div>
          <div>
            <label htmlFor="coverImage" className="label">
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              defaultValue={profile?.coverImage ?? ""}
              className="input"
              placeholder="https://..."
            />
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
}
