import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Skills } from "@/components/profile/Skills";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skills — Abhishek Vishwakarma",
  description: "Tools and technologies, ordered by proficiency.",
};

// skills — dedicated page, keeps home decluttered
export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  return (
    <main className="mx-auto max-w-[1160px] px-4 md:px-6 py-6 md:py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-muted hover:text-accent transition-colors mb-6">
        <ArrowLeft size={13} aria-hidden="true" />
        Back to archive
      </Link>
      <div className="mb-6">
        <span className="section-label">Toolbox</span>
        <h1 className="name-display text-[30px] md:text-[36px] mt-1">Skills</h1>
      </div>
      <Skills items={skills} />
    </main>
  );
}
