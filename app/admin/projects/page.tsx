import { prisma } from "@/lib/prisma";
import { ProjectManager } from "@/components/admin/ProjectManager";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return <ProjectManager projects={projects} />;
}
