"use client";

import { useMemo, useState } from "react";

import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { Skill } from "@/types";

interface SkillsProps {
  skills: Skill[];
}

const CATEGORIES = ["all", "frontend", "backend", "devops", "ai"] as const;

type Category = (typeof CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  ai: "AI",
};

const CATEGORY_GRADIENTS: Record<Exclude<Category, "all">, string> = {
  frontend: "from-amber-300 to-yellow-500",
  backend: "from-blue-400 to-blue-600",
  devops: "from-emerald-400 to-emerald-600",
  ai: "from-violet-400 to-purple-600",
};

export function Skills({ skills }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [ref, isInView] = useInView<HTMLElement>(0.16);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") {
      return skills;
    }
    return skills.filter((skill) => skill.category === activeCategory);
  }, [activeCategory, skills]);

  return (
    <section id="skills" ref={ref} className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Skills"
          subtitle="A balanced stack across frontend craftsmanship, backend systems, DevOps discipline, and AI product integration."
        />

        <Card className="border border-border/80 bg-card/85 py-0">
          <CardContent className="space-y-8 p-6 md:p-8">
            <Tabs
              value={activeCategory}
              onValueChange={(value) => setActiveCategory(value as Category)}
            >
              <TabsList className="h-auto w-full flex-wrap gap-2 bg-transparent p-0">
                {CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="rounded-full border border-border bg-card px-4 py-2 font-mono text-xs tracking-[0.14em] uppercase data-active:bg-foreground data-active:text-background"
                  >
                    {CATEGORY_LABELS[category]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="space-y-5">
              {filteredSkills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium md:text-base">
                      {skill.name}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground md:text-sm">
                      {skill.level}%
                    </p>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
                        CATEGORY_GRADIENTS[skill.category],
                      )}
                      style={{
                        width: isInView ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
