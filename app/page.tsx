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

export default async function Home() {
  const [profile, experiences, education, projects, skills, certifications, achievements] =
    await Promise.all([
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Portfolio Not Set Up
          </h1>
          <p className="text-text-secondary">
            Visit <a href="/admin/login" className="text-accent hover:underline">/admin/login</a> to set up your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1128px] px-4 py-8">
      <div className="space-y-6">
        <ProfileHeader profile={profile} />
        <div id="about"><About bio={profile.bio} /></div>
        <div id="experience"><Experience items={experiences} /></div>
        <Education items={education} />
        <div id="projects"><Projects items={projects} /></div>
        <div id="skills"><Skills items={skills} /></div>
        <Certifications items={certifications} />
        <Achievements items={achievements} />
        <div id="contact"><ContactForm /></div>
      </div>
    </main>
  );
}
