import { prisma } from "@/lib/prisma";
import { ExperienceManager } from "@/components/admin/ExperienceManager";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return <ExperienceManager experiences={experiences} />;
}
