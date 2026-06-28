import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create profile
  await prisma.profile.upsert({
    where: { id: "seed-profile" },
    update: {},
    create: {
      id: "seed-profile",
      name: "Abhishek Vishwakarma",
      headline: "Full Stack Developer",
      bio: "Passionate full stack developer with experience building modern web applications. I love working with React, Next.js, Node.js, and PostgreSQL.",
      location: "India",
      email: "abhishek@example.com",
      github: "https://github.com/abhishek",
      linkedin: "https://linkedin.com/in/abhishek",
    },
  });

  // Create experience
  await prisma.experience.create({
    data: {
      company: "Tech Corp",
      role: "Full Stack Developer",
      description: "Building and maintaining web applications using React, Node.js, and PostgreSQL.",
      startDate: new Date("2022-01-01"),
      current: true,
      order: 0,
    },
  });

  // Create education
  await prisma.education.create({
    data: {
      school: "University of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science",
      startDate: new Date("2018-08-01"),
      endDate: new Date("2022-05-01"),
      order: 0,
    },
  });

  // Create skills
  const skills = [
    { name: "React", category: "Frontend", level: "Expert", order: 0 },
    { name: "Next.js", category: "Frontend", level: "Expert", order: 1 },
    { name: "TypeScript", category: "Frontend", level: "Advanced", order: 2 },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", order: 3 },
    { name: "Node.js", category: "Backend", level: "Expert", order: 0 },
    { name: "PostgreSQL", category: "Backend", level: "Advanced", order: 1 },
    { name: "Prisma", category: "Backend", level: "Advanced", order: 2 },
    { name: "Git", category: "Tools", level: "Advanced", order: 0 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Create project
  await prisma.project.create({
    data: {
      title: "Portfolio Website",
      description: "A LinkedIn-style portfolio website built with Next.js, Prisma, and PostgreSQL.",
      tags: ["Next.js", "React", "Prisma", "Tailwind CSS"],
      url: "https://example.com",
      githubUrl: "https://github.com/abhishek/portfolio",
      order: 0,
    },
  });

  // Create certification
  await prisma.certification.create({
    data: {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: new Date("2023-06-01"),
      url: "https://aws.amazon.com/certification",
    },
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
