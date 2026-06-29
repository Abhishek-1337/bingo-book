"use client";

import Image from "next/image";

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

export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-[200px] w-full bg-gradient-to-r from-[#0a66c2] to-[#004182]">
        {profile.coverImage && (
          <Image
            src={profile.coverImage}
            alt="Cover"
            fill
            className="object-cover"
            sizes="(max-width: 1128px) 100vw, 1128px"
          />
        )}
      </div>

      <div className="relative px-6 pb-6">
        <div className="relative -mt-[48px] mb-4">
          <div className="relative h-[96px] w-[96px] rounded-full border-4 border-white overflow-hidden bg-gray-200">
            {profile.profileImage ? (
              <Image
                src={profile.profileImage}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-gray-500">
                {profile.name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground">{profile.name}</h1>
        <p className="text-foreground">{profile.headline}</p>

        {profile.location && (
          <p className="text-sm text-text-secondary mt-1">{profile.location}</p>
        )}

        <div className="flex flex-wrap gap-3 mt-3">
          {profile.email && (
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`} target="_blank" rel="noopener noreferrer" className="social-link">
              Email
            </a>
          )}
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="social-link">
              Website
            </a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
              Twitter
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-card-border">
          {[
            { label: "About", href: "#about" },
            { label: "Experience", href: "#experience" },
            { label: "Projects", href: "#projects" },
            { label: "Skills", href: "#skills" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-3 py-1 text-xs font-medium text-text-secondary bg-background hover:text-accent hover:bg-accent/10 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
