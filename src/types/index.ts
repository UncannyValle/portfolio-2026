export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  accent: string;
  href?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "devops" | "ai";
}

export interface Career {
  company: string;
  role: string;
  period: string;
  logo: string;
  highlight: string;
}
