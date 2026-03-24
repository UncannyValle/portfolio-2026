import type { Career, Skill } from "@/types";

export const SKILLS: Skill[] = [
  { name: "React / Next.js", years: 6, category: "frontend" },
  { name: "TypeScript", years: 5, category: "frontend" },
  { name: "Tailwind / SCSS", years: 5, category: "frontend" },
  { name: "Node.js / Express", years: 4, category: "backend" },
  { name: ".NET 8 / C#", years: 3, category: "backend" },
  { name: "SQL Server", years: 4, category: "backend" },
  { name: "GraphQL / REST", years: 4, category: "backend" },
  { name: "Docker / CI/CD", years: 3, category: "devops" },
  { name: "OpenAI Integration", years: 2, category: "ai" },
  { name: "Shopify Storefront", years: 2, category: "frontend" },
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
