import { Briefcase, Code2, NotepadText } from "lucide-react";

export const NAV_LINKS = ["about", "skills", "projects", "careers", "contact"];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/UncannyValle", icon: Code2 },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/julian-valle",
    icon: Briefcase,
  },
  {
    label: "Resume",
    href: "https://docs.google.com/document/d/1ez6bAjfosdbM-iID4RHCN4EeHYgB8KgPf6WKCjvWm0w/edit?tab=t.0#heading=h.v0lc7ak3cicd",
    icon: NotepadText,
  },
];

export const CONTACT_EMAIL = "hello@julianvalle.dev";

export const SITE_METADATA = {
  title: "Julian Valle | Senior Full Stack Engineer",
  description:
    "Building scalable, AI powered SaaS applications with React, TypeScript, and .NET.",
};
