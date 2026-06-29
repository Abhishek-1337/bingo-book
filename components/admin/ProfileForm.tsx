"use client";

import { updateProfile } from "@/lib/actions";
import { useRef } from "react";
import { ImageUpload } from "./ImageUpload";

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

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China",
  "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece",
  "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras",
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
  "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco",
  "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia",
  "Senegal", "Serbia", "Sierra Leone", "Singapore", "Slovakia",
  "Slovenia", "Somalia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
  "Tunisia", "Turkey", "Turkmenistan", "UAE", "Uganda",
  "Ukraine", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

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
              Country
            </label>
            <select
              id="location"
              name="location"
              defaultValue={profile?.location ?? ""}
              className="input"
            >
              <option value="">Select Country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
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
          <ImageUpload
            name="profileImage"
            label="Profile Image"
            currentUrl={profile?.profileImage}
          />
          <ImageUpload
            name="coverImage"
            label="Cover Image"
            currentUrl={profile?.coverImage}
          />
        </div>

        <button type="submit" className="btn-primary">
          Save Profile
        </button>
      </form>
    </div>
  );
}
