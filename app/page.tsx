import { prisma } from "@/lib/prisma";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { About } from "@/components/profile/About";
import { Experience } from "@/components/profile/Experience";
import { Education } from "@/components/profile/Education";
import { Projects } from "@/components/profile/Projects";
import { Skills } from "@/components/profile/Skills";
import { Certifications } from "@/components/profile/Certifications";
import { Achievements } from "@/components/profile/Achievements";
import { ContactForm } from "@/components/profile/ContactForm";

export const dynamic = "force-dynamic";

// home — isolated bento layout
export default async function Home() {
  const [profile, experiences, education, projects, skills, certifications, achievements] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { date: "desc" } }),
    prisma.achievement.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    return (
      <div className="grid place-items-center min-h-[60vh] p-8">
        <div className="iso-card p-8 text-center max-w-md">
          <p className="section-label mb-2">Empty archive</p>
          <h1 className="display text-2xl mb-2">Portfolio not set up</h1>
          <p className="text-sm text-muted">Visit <a href="/admin/login" className="underline text-accent">/admin/login</a> to seed your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1160px] px-4 md:px-6 py-6 md:py-8">
      {/* hero */}
      <ProfileHeader profile={profile} />

      {/* bento */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-6 items-start">
        {/* left stack */}
        <div className="space-y-6">
          <div id="about"><About bio={profile.bio} /></div>
          <div id="experience"><Experience items={experiences} /></div>
          <div id="projects"><Projects items={projects} /></div>
          <Achievements items={achievements} />
        </div>

        {/* right rail — isolated sticky */}
        <div className="space-y-6 lg:sticky lg:top-[72px]">
          <div id="skills"><Skills items={skills} /></div>
          <Education items={education} />
          <Certifications items={certifications} />
          <div id="contact"><ContactForm /></div>
        </div>
      </div>
    </main>
  );
}
