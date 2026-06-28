import { prisma } from "@/lib/prisma";
import { CertificationManager } from "@/components/admin/CertificationManager";

export const dynamic = "force-dynamic";

export default async function AdminCertificationsPage() {
  const certifications = await prisma.certification.findMany({ orderBy: { date: "desc" } });

  return <CertificationManager certifications={certifications} />;
}
