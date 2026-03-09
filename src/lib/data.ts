import type { Career, Project, Skill } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "InfoTrack Court Filing Platform",
    subtitle: "Legal SaaS",
    description:
      "Redesigned flagship court filing platform. AI powered document extraction cut filing from 1 hour to 30 seconds.",
    tags: ["React", "TypeScript", ".NET 8", "OpenAI"],
    color: "#2563eb",
    accent: "#60a5fa",
  },
  {
    title: "Headless Commerce Platform",
    subtitle: "Ecommerce",
    description:
      "Production ecommerce with App Router, React Server Components, and edge caching.",
    tags: ["Next.js", "Shopify", "Vercel"],
    color: "#059669",
    accent: "#34d399",
  },
  {
    title: "One Stop Portal",
    subtitle: "Public Sector",
    description:
      "Maryland's licensing and compliance portal serving 50,000+ users.",
    tags: ["Vue.js", "Ruby on Rails", "Storybook"],
    color: "#7c3aed",
    accent: "#a78bfa",
  },
  {
    title: "Aware3 Platform",
    subtitle: "Platform Modernization",
    description:
      "Modernized legacy Knockout.js to React SPA, serving 8,000+ users.",
    tags: ["React", "Laravel", "HighCharts", "ArcGIS"],
    color: "#dc2626",
    accent: "#f87171",
  },
  {
    title: "EKC Data Analytics",
    subtitle: "Data Platform",
    description:
      "Data analytics portal tracking Kansas City economic growth across 500,000+ businesses.",
    tags: ["React", "TypeScript", "REST API"],
    color: "#d97706",
    accent: "#fbbf24",
  },
];

export const SKILLS: Skill[] = [
  { name: "React / Next.js", level: 95, category: "frontend" },
  { name: "TypeScript", level: 92, category: "frontend" },
  { name: "Tailwind / SCSS", level: 90, category: "frontend" },
  { name: "Node.js / Express", level: 85, category: "backend" },
  { name: ".NET 8 / C#", level: 75, category: "backend" },
  { name: "SQL Server", level: 80, category: "backend" },
  { name: "GraphQL / REST", level: 88, category: "backend" },
  { name: "Docker / CI/CD", level: 78, category: "devops" },
  { name: "OpenAI Integration", level: 82, category: "ai" },
  { name: "Shopify Storefront", level: 85, category: "frontend" },
];

export const CAREERS: Career[] = [
  {
    company: "Independent Contractor",
    role: "Full Stack Engineer",
    period: "Aug 2025 to Present",
    logo: "🏗️",
    highlight: "Headless commerce with Next.js + Shopify",
  },
  {
    company: "InfoTrack",
    role: "Full Stack React / .NET Engineer",
    period: "May 2024 to Jul 2025",
    logo: "⚖️",
    highlight: "AI document extraction, 1hr to 30s filing",
  },
  {
    company: "Active Logic",
    role: "Full Stack Software Engineer",
    period: "May 2022 to Mar 2024",
    logo: "⚡",
    highlight: "Legacy to React SPA, 8,000+ users",
  },
  {
    company: "Enovational",
    role: "Frontend Developer",
    period: "Jun 2020 to May 2022",
    logo: "🏛️",
    highlight: "Maryland's OneStop Portal, 50K+ users",
  },
];
