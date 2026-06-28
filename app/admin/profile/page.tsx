import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst();

  return <ProfileForm profile={profile} />;
}
