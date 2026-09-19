import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Experience } from "@/components/profile/Experience";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience — Abhishek Vishwakarma",
  description: "Work history and roles.",
};

// experience — dedicated page, keeps home decluttered
export default async function ExperiencePage() {
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="mx-auto max-w-[880px] px-4 md:px-6 py-6 md:py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft size={13} aria-hidden="true" />
        Back to archive
      </Link>
      <div className="mb-6">
        <span className="section-label">Work history</span>
        <h1 className="name-display text-[30px] md:text-[36px] mt-1">Experience</h1>
      </div>
      <Experience items={experiences} />
    </main>
  );
}
