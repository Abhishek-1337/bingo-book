import { prisma } from "@/lib/prisma";
import { AchievementManager } from "@/components/admin/AchievementManager";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const achievements = await prisma.achievement.findMany({ orderBy: { order: "asc" } });

  return <AchievementManager achievements={achievements} />;
}
