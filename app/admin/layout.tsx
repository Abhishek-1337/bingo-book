import { AdminNav } from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="card border-x-0 border-t-0 rounded-none mb-6">
        <div className="mx-auto max-w-[1128px] px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">
            <a href="/admin">Portfolio Admin</a>
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-[1128px] px-4 pb-8">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          <AdminNav />
          <div>{children}</div>
        </div>
      </main>
    </div>
  );
}
