"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions";

type Skill = {
  id: string;
  name: string;
  category: string;
  level?: string | null;
  order: number;
};

const PREDEFINED_SKILLS: Record<string, string[]> = {
  Frontend: [
    "React", "Next.js", "Vue.js", "Angular", "Svelte",
    "TypeScript", "JavaScript", "HTML5", "CSS3",
    "Tailwind CSS", "Sass/SCSS", "Bootstrap", "Material UI",
    "Redux", "Zustand", "Recoil", "GraphQL (Apollo)",
    "Storybook", "Webpack", "Vite",
  ],
  Backend: [
    "Node.js", "Express.js", "NestJS", "Fastify",
    "Python", "Django", "Flask", "FastAPI",
    "Java", "Spring Boot",
    "Go", "Rust",
    "Ruby on Rails",
    "PostgreSQL", "MySQL", "MongoDB", "Redis",
    "Prisma", "TypeORM", "Sequelize",
    "REST APIs", "GraphQL",
  ],
  DevOps: [
    "Docker", "Kubernetes", "AWS", "GCP", "Azure",
    "Vercel", "Netlify", "Heroku",
    "CI/CD", "GitHub Actions", "Jenkins", "CircleCI",
    "Terraform", "Ansible",
    "Nginx", "Linux",
    "Datadog", "Grafana", "Prometheus",
  ],
  Mobile: [
    "React Native", "Flutter", "Swift", "Kotlin",
    "Expo", "Ionic",
  ],
  Testing: [
    "Jest", "Vitest", "Mocha", "Chai",
    "Cypress", "Playwright", "Selenium",
    "React Testing Library", "Supertest",
  ],
  Tools: [
    "Git", "GitHub", "GitLab", "Bitbucket",
    "VS Code", "Figma", "Jira", "Confluence",
    "npm", "yarn", "pnpm",
    "ESLint", "Prettier",
  ],
  "AI / ML": [
    "OpenAI API", "LangChain", "Hugging Face",
    "TensorFlow", "PyTorch",
    "RAG", "Vector Databases", "Pinecone", "Weaviate",
  ],
};

const CATEGORIES = Object.keys(PREDEFINED_SKILLS);

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

export function SkillManager({ skills }: { skills: Skill[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [customName, setCustomName] = useState(false);
  const [customCategory, setCustomCategory] = useState(false);

  const editingSkill = editingId ? skills.find((s) => s.id === editingId) : null;

  function handleEdit(skill: Skill) {
    setEditingId(skill.id);
    setShowForm(true);
    const isCustomCategory = !CATEGORIES.includes(skill.category);
    const isCustomName = !isCustomCategory && !PREDEFINED_SKILLS[skill.category]?.includes(skill.name);
    setCustomCategory(isCustomCategory);
    setSelectedCategory(isCustomCategory ? "" : skill.category);
    setCustomName(isCustomName);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingId(null);
    setSelectedCategory("");
    setCustomName(false);
    setCustomCategory(false);
  }

  function handleAddNew() {
    setShowForm(true);
    setEditingId(null);
    setSelectedCategory("");
    setCustomName(false);
    setCustomCategory(false);
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Skills</h2>
        <button
          onClick={handleAddNew}
          className="btn-primary"
        >
          Add Skill
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-lg border border-card-border p-4">
          <h3 className="font-semibold mb-4">
            {editingId ? "Edit Skill" : "New Skill"}
          </h3>
          <form
            action={editingId ? (fd) => updateSkill(editingId, fd) : createSkill}
            className="space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <select
                  name="category"
                  required
                  className="input"
                  value={customCategory ? "__custom__" : selectedCategory}
                  onChange={(e) => {
                    if (e.target.value === "__custom__") {
                      setCustomCategory(true);
                      setSelectedCategory("");
                    } else {
                      setCustomCategory(false);
                      setSelectedCategory(e.target.value);
                      setCustomName(false);
                    }
                  }}
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="__custom__">Other (type custom)</option>
                </select>
                {customCategory && (
                  <input
                    name="category"
                    placeholder="Custom category"
                    required
                    className="input mt-2"
                    defaultValue={editingSkill?.category ?? ""}
                  />
                )}
              </div>
              <div>
                {!customCategory && selectedCategory && !customName ? (
                  <select
                    name="name"
                    required
                    className="input"
                    defaultValue={editingSkill?.name ?? ""}
                  >
                    <option value="">Select Skill</option>
                    {PREDEFINED_SKILLS[selectedCategory]?.map((skill) => (
                      <option key={skill} value={skill}>{skill}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name="name"
                    placeholder="Skill Name"
                    required
                    className="input"
                    defaultValue={editingSkill?.name ?? ""}
                  />
                )}
                {selectedCategory && !customCategory && (
                  <button
                    type="button"
                    onClick={() => setCustomName(!customName)}
                    className="text-xs text-text-secondary mt-1 hover:text-text-primary"
                  >
                    {customName ? "Choose from list" : "Type custom skill"}
                  </button>
                )}
              </div>
              <select name="level" className="input" defaultValue={editingSkill?.level ?? ""}>
                <option value="">Select Level</option>
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
            <input name="order" type="number" placeholder="Order" defaultValue={editingSkill?.order ?? 0} className="input w-24" />
            <input type="hidden" name="id" />
            <div className="flex gap-2">
              <FormButton />
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between rounded-lg border border-card-border p-4">
            <div>
              <p className="font-semibold">{skill.name}</p>
              <p className="text-sm text-text-secondary">
                {skill.category}
                {skill.level ? ` · ${skill.level}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="btn-secondary text-sm"
              >
                Edit
              </button>
              <form action={() => deleteSkill(skill.id)}>
                <button type="submit" className="btn-danger text-sm">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-text-secondary text-sm">No skills yet.</p>
        )}
      </div>
    </div>
  );
}
