import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [profile, experiences, education, projects, skills, certifications, messages] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.experience.count(),
      prisma.education.count(),
      prisma.project.count(),
      prisma.skill.count(),
      prisma.certification.count(),
      prisma.message.count(),
    ]);

  return (
    <div className="card p-6">
      <h2 className="section-title">Dashboard</h2>

      {!profile && (
        <div className="mb-6 rounded-lg bg-yellow-50 p-4 text-yellow-700 text-sm">
          Your profile is not set up yet. Go to{" "}
          <a href="/admin/profile" className="font-medium underline">
            Profile
          </a>{" "}
          to get started.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Profile" value={profile ? "Set up" : "Not set up"} href="/admin/profile" />
        <StatCard label="Experience" value={experiences} href="/admin/experience" />
        <StatCard label="Education" value={education} href="/admin/education" />
        <StatCard label="Projects" value={projects} href="/admin/projects" />
        <StatCard label="Skills" value={skills} href="/admin/skills" />
        <StatCard label="Certifications" value={certifications} href="/admin/certifications" />
        <StatCard label="Messages" value={messages} href="/admin/messages" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string | number;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-card-border p-4 hover:shadow-md transition-shadow"
    >
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
    </a>
  );
}
