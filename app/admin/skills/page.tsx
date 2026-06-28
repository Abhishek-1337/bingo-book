import { prisma } from "@/lib/prisma";
import { SkillManager } from "@/components/admin/SkillManager";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return <SkillManager skills={skills} />;
}
