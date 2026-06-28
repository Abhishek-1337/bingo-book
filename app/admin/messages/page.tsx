import { prisma } from "@/lib/prisma";
import { MessageManager } from "@/components/admin/MessageManager";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });

  return <MessageManager messages={messages} />;
}
