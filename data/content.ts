// All editable content lives here. Anything in square brackets is a placeholder to fill in.

export const site = {
  name: "Titu Jeshurun",
  initials: "TJ",
  role: "Designer + Cloud Engineer",
  tagline: "Designs it. Deploys it.",
  description: "Titu Jeshurun is a designer and cloud engineer in Chennai, India. UI/UX craft and cloud infrastructure, treated as equals.",
  // PLACEHOLDER: set the production domain before deploying (used for canonical URL, sitemap and Open Graph).
  url: "https://example.com",
  location: "Chennai, India",
  region: "ap-south-1",
  timeZone: "Asia/Kolkata",
  // PLACEHOLDER: real contact details.
  email: "[your-email@example.com]",
  calendarUrl: "[https://cal.com/your-handle]",
  photo: null as string | null, // PLACEHOLDER: "/photo.jpg" (square, 400x400 or larger). Initials show until set.
  social: {
    github: "[https://github.com/your-handle]",
    linkedin: "[https://linkedin.com/in/your-handle]",
    x: "[https://x.com/your-handle]",
  },
  deployHost: "[host]", // PLACEHOLDER: e.g. "Vercel" or "Cloudflare Pages"
  version: "v1.0.0",
  year: 2026,
};

export const stages = [
  { id: "top", label: "TJ", short: "Top" },
  { id: "index", label: "Index", short: "Index" },
  { id: "work", label: "Work", short: "Work" },
  { id: "stack", label: "Stack", short: "Stack" },
  { id: "notes", label: "Notes", short: "Notes" },
  { id: "contact", label: "Contact", short: "Contact" },
] as const;

export type StageId = (typeof stages)[number]["id"];

export const bio = [
  "[PLACEHOLDER bio, line 1: who you are and what you care about.]",
  "[PLACEHOLDER bio, line 2: the kind of work you do best.]",
  "[PLACEHOLDER bio, line 3: what you are looking for next.]",
];

export const identities = [
  {
    title: "Design",
    lead: "Interfaces people can read at a glance.",
    points: ["[Placeholder: a design strength]", "[Placeholder: a design strength]", "[Placeholder: a design strength]"],
  },
  {
    title: "Cloud",
    lead: "Infrastructure that is small, documented and rebuildable.",
    points: ["[Placeholder: a cloud strength]", "[Placeholder: a cloud strength]", "[Placeholder: a cloud strength]"],
  },
];

export type Project = {
  slug: string;
  title: string;
  meta: string; // mono metadata line, e.g. "AWS · Terraform · UI/UX"
  outcome: string; // one line
  thumbnail: { src: string; width: number; height: number; alt: string };
  problem: string;
  decisions: string[];
  result: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "[Project one title]",
    meta: "AWS · Terraform · UI/UX",
    outcome: "[One-line outcome for project one.]",
    thumbnail: { src: "/work/project-one.svg", width: 640, height: 400, alt: "Placeholder thumbnail for project one" },
    problem: "[PLACEHOLDER: the problem this project set out to solve, in two or three sentences.]",
    decisions: ["[Placeholder design decision]", "[Placeholder design decision]", "[Placeholder infrastructure decision]"],
    result: "[PLACEHOLDER: what shipped and what changed because of it. No invented metrics.]",
  },
  {
    slug: "project-two",
    title: "[Project two title]",
    meta: "Docker · GitHub Actions · Design system",
    outcome: "[One-line outcome for project two.]",
    thumbnail: { src: "/work/project-two.svg", width: 640, height: 400, alt: "Placeholder thumbnail for project two" },
    problem: "[PLACEHOLDER: the problem this project set out to solve.]",
    decisions: ["[Placeholder design decision]", "[Placeholder infrastructure decision]"],
    result: "[PLACEHOLDER: result.]",
  },
  {
    slug: "project-three",
    title: "[Project three title]",
    meta: "PostgreSQL · FastAPI · Prototyping",
    outcome: "[One-line outcome for project three.]",
    thumbnail: { src: "/work/project-three.svg", width: 640, height: 400, alt: "Placeholder thumbnail for project three" },
    problem: "[PLACEHOLDER: the problem this project set out to solve.]",
    decisions: ["[Placeholder design decision]", "[Placeholder infrastructure decision]"],
    result: "[PLACEHOLDER: result.]",
  },
];

export const stack: { group: string; items: string[] }[] = [
  { group: "Design tools", items: ["Figma", "Photoshop", "Illustrator", "After Effects"] },
  { group: "Cloud and DevOps", items: ["AWS", "Terraform", "Docker", "GitHub Actions", "Linux"] },
  { group: "Languages", items: ["TypeScript", "Python", "SQL"] },
  { group: "Tooling", items: ["Git", "VS Code", "Postman"] },
];

export const notes = [
  { slug: "note-one", title: "[Placeholder note title]", date: "2026-01-15", readTime: "4 min" },
  { slug: "note-two", title: "[Placeholder note title]", date: "2025-11-02", readTime: "6 min" },
  { slug: "note-three", title: "[Placeholder note title]", date: "2025-08-20", readTime: "3 min" },
];
