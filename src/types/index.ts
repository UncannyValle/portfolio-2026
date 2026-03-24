export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  accent: string;
  href?: string;
}

export interface ProjectPostFrontmatter {
  title: string;
  subtitle: string;
  description: string;
  publishedAt: string;
  tags: string[];
  color: string;
  accent: string;
  heroImage?: string;
  heroAlt?: string;
  images?: string[];
}

export interface ProjectPostSummary extends ProjectPostFrontmatter {
  slug: string;
  readingTimeMinutes: number;
}

export interface ProjectPost extends ProjectPostSummary {
  content: string;
}

export interface Skill {
  name: string;
  years: number;
  category: "frontend" | "backend" | "devops" | "ai";
}

export interface Career {
  company: string;
  role: string;
  period: string;
  logo: string;
  highlight: string;
}
