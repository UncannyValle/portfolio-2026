"use client";

import { ExternalLink } from "lucide-react";

import { SectionHeader } from "@/components/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [ref, isInView] = useInView<HTMLElement>(0.16);

  return (
    <section id="projects" ref={ref} className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Projects"
          subtitle="Selected work spanning legal tech, commerce, public sector platforms, and analytics products."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={cn(
                "relative overflow-hidden border border-border/80 bg-card/90 py-0",
                index === 0 && "md:col-span-2",
              )}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0px)" : "translateY(20px)",
                transition: "all 700ms ease",
                transitionDelay: `${index * 110}ms`,
              }}
            >
              <div
                className="h-1 w-full"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${project.color}, ${project.accent})`,
                }}
              />

              <CardContent className="space-y-5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="inline-flex rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                    style={{
                      backgroundColor: `${project.color}22`,
                      color: project.accent,
                    }}
                  >
                    {project.subtitle}
                  </span>

                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink className="size-4" />
                    </a>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-xl font-bold md:text-2xl">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
