import { prisma } from "@/lib/prisma";
import { EducationManager } from "@/components/admin/EducationManager";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const educations = await prisma.education.findMany({ orderBy: { order: "asc" } });

  return <EducationManager educations={educations} />;
}
