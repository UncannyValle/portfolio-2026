import type { Career, Skill } from "@/types";

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
