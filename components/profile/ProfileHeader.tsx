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
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
};

// hero — editorial isolated
export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="iso-card overflow-hidden">
      {/* cover */}
      <div className="relative h-[168px] w-full bg-gradient-to-br from-[#0d1a2e] via-[#1a2e4a] to-[#c67c4e] overflow-hidden">
        {profile.coverImage && (
          <Image src={profile.coverImage} alt="Cover" fill className="object-cover mix-blend-luminosity opacity-80" sizes="1160px" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-6 font-mono text-[11px] tracking-[0.14em] uppercase text-white/80">Portfolio — Archive № 01</div>
      </div>

      <div className="relative px-6 md:px-8 pb-7">
        {/* avatar */}
        <div className="relative -mt-10 flex items-end gap-5">
          <div className="h-[92px] w-[92px] rounded-2xl border-4 border-card overflow-hidden bg-bg-soft shadow-lg shrink-0">
            {profile.profileImage ? (
              <Image src={profile.profileImage} alt={profile.name} width={92} height={92} className="object-cover h-full w-full" />
            ) : (
              <div className="grid place-items-center h-full w-full display text-3xl">{profile.name.charAt(0)}</div>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2 pb-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs tracking-wide uppercase text-muted">Open to collaborations</span>
          </div>
        </div>

        {/* name */}
        <div className="mt-5 grid md:grid-cols-[1.35fr_0.65fr] gap-6 items-start">
          <div>
            <h1 className="name-display text-[34px] md:text-[40px]">{profile.name}</h1>
            <p className="mt-2 font-mono text-xs tracking-[0.08em] uppercase text-accent font-medium">{profile.headline}</p>
            {profile.location && <p className="t-sub mt-2">{profile.location} · {profile.email}</p>}
          </div>
          <div className="md:text-right">
            <p className="t-sub leading-relaxed hidden md:block">
              Building quietly — interfaces, systems, and small tools that feel good to use.
            </p>
            <div className="mt-3 flex md:justify-end flex-wrap gap-1.5">
              {[
                profile.email && ["Email", `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`],
                profile.website && ["Website", profile.website],
                profile.github && ["GitHub", profile.github],
                profile.linkedin && ["LinkedIn", profile.linkedin],
                profile.twitter && ["Twitter", profile.twitter],
              ]
                .filter(Boolean)
                .map((e: any) => (
                  <a key={e[0]} href={e[1]} target="_blank" rel="noopener noreferrer" className="pill-link">
                    {e[0]}
                  </a>
                ))}
            </div>
          </div>
        </div>

        {/* index */}
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-4">
          {[
            ["01", "About", "#about"],
            ["02", "Experience", "#experience"],
            ["03", "Projects", "#projects"],
            ["04", "Skills", "#skills"],
            ["05", "Contact", "#contact"],
          ].map(([n, l, h]) => (
            <a key={h} href={h} className="group flex items-center gap-2 rounded-full border border-line bg-bg-soft px-3 py-1.5 font-mono text-xs hover:border-accent/40 transition-colors">
              <span className="text-accent font-bold">{n}</span>
              <span className="tracking-wide text-ink group-hover:text-accent">{l}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
