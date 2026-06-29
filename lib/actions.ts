"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { checkAdminSession, setAdminSession, clearAdminSession, verifyPassword } from "@/lib/auth";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

// ==================== AUTH ====================

export async function loginAction(_prevState: unknown, formData: FormData) {
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") ?? headerStore.get("x-real-ip") ?? "unknown";

  const { allowed, retryAfter } = checkRateLimit(ip);
  if (!allowed) {
    return { error: `Too many attempts. Try again in ${retryAfter} seconds.` };
  }

  const password = formData.get("password") as string;

  if (!verifyPassword(password)) {
    return { error: "Invalid password" };
  }

  resetRateLimit(ip);
  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

// ==================== PROFILE ====================

export async function getProfile() {
  return prisma.profile.findFirst();
}

export async function updateProfile(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const website = formData.get("website") as string;
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const twitter = formData.get("twitter") as string;
  const profileImage = formData.get("profileImage") as string;
  const coverImage = formData.get("coverImage") as string;

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: {
        name,
        headline,
        bio: bio || null,
        location: location || null,
        email: email || null,
        phone: phone || null,
        website: website || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
        ...(profileImage && { profileImage }),
        ...(coverImage && { coverImage }),
      },
    });
  } else {
    await prisma.profile.create({
      data: {
        name,
        headline,
        bio: bio || null,
        location: location || null,
        email: email || null,
        phone: phone || null,
        website: website || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
        profileImage: profileImage || null,
        coverImage: coverImage || null,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/profile");
}

// ==================== EXPERIENCE ====================

export async function getExperiences() {
  return prisma.experience.findMany({ orderBy: { order: "asc" } });
}

export async function createExperience(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const logo = formData.get("logo") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const current = formData.get("current") === "on";
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.experience.create({
    data: {
      company,
      role,
      logo: logo || null,
      description: description || null,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      current,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const logo = formData.get("logo") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const current = formData.get("current") === "on";
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.experience.update({
    where: { id },
    data: {
      company,
      role,
      logo: logo || null,
      description: description || null,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      current,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function deleteExperience(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

// ==================== EDUCATION ====================

export async function getEducations() {
  return prisma.education.findMany({ orderBy: { order: "asc" } });
}

export async function createEducation(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const school = formData.get("school") as string;
  const degree = formData.get("degree") as string;
  const field = formData.get("field") as string;
  const logo = formData.get("logo") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.education.create({
    data: {
      school,
      degree,
      field: field || null,
      logo: logo || null,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const school = formData.get("school") as string;
  const degree = formData.get("degree") as string;
  const field = formData.get("field") as string;
  const logo = formData.get("logo") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.education.update({
    where: { id },
    data: {
      school,
      degree,
      field: field || null,
      logo: logo || null,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function deleteEducation(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.education.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/education");
}

// ==================== PROJECTS ====================

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function createProject(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const url = formData.get("url") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const tagsRaw = formData.get("tags") as string;
  const order = parseInt(formData.get("order") as string || "0");

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await prisma.project.create({
    data: {
      title,
      description: description || null,
      image: image || null,
      url: url || null,
      githubUrl: githubUrl || null,
      tags,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const url = formData.get("url") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const tagsRaw = formData.get("tags") as string;
  const order = parseInt(formData.get("order") as string || "0");

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await prisma.project.update({
    where: { id },
    data: {
      title,
      description: description || null,
      image: image || null,
      url: url || null,
      githubUrl: githubUrl || null,
      tags,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

// ==================== SKILLS ====================

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function createSkill(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.skill.create({
    data: {
      name,
      category,
      level: level || null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const level = formData.get("level") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.skill.update({
    where: { id },
    data: {
      name,
      category,
      level: level || null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
}

export async function deleteSkill(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// ==================== CERTIFICATIONS ====================

export async function getCertifications() {
  return prisma.certification.findMany({ orderBy: { date: "desc" } });
}

export async function createCertification(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const url = formData.get("url") as string;
  const image = formData.get("image") as string;

  await prisma.certification.create({
    data: {
      name,
      issuer,
      date: new Date(date),
      url: url || null,
      image: image || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const issuer = formData.get("issuer") as string;
  const date = formData.get("date") as string;
  const url = formData.get("url") as string;
  const image = formData.get("image") as string;

  await prisma.certification.update({
    where: { id },
    data: {
      name,
      issuer,
      date: new Date(date),
      url: url || null,
      image: image || null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function deleteCertification(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.certification.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

// ==================== MESSAGES ====================

export async function sendMessage(_prevState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Name, email, and message are required" };
  }

  await prisma.message.create({
    data: {
      name,
      email,
      subject: subject || null,
      message,
    },
  });

  return { success: "Message sent successfully!" };
}

export async function getMessages() {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  return prisma.message.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markMessageRead(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.message.update({
    where: { id },
    data: { read: true },
  });

  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.message.delete({ where: { id } });
  revalidatePath("/admin/messages");
}

// ==================== ACHIEVEMENTS ====================

export async function getAchievements() {
  return prisma.achievement.findMany({ orderBy: { order: "asc" } });
}

export async function createAchievement(formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const icon = formData.get("icon") as string;
  const url = formData.get("url") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.achievement.create({
    data: {
      title,
      description: description || null,
      date: new Date(date),
      icon: icon || null,
      url: url || null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function updateAchievement(id: string, formData: FormData) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const date = formData.get("date") as string;
  const icon = formData.get("icon") as string;
  const url = formData.get("url") as string;
  const order = parseInt(formData.get("order") as string || "0");

  await prisma.achievement.update({
    where: { id },
    data: {
      title,
      description: description || null,
      date: new Date(date),
      icon: icon || null,
      url: url || null,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/achievements");
}

export async function deleteAchievement(id: string) {
  const session = await checkAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.achievement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/achievements");
}
