"use client";

import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "@/hooks/use-in-view";
import type { Career } from "@/types";

interface ExperienceProps {
  careers: Career[];
}

export function Experience({ careers }: ExperienceProps) {
  const [ref, isInView] = useInView<HTMLElement>(0.16);

  return (
    <section id="careers" ref={ref} className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Experience"
          subtitle="A track record of delivering high impact outcomes across startups and platform teams."
        />

        <div className="space-y-4">
          {careers.map((career, index) => (
            <Card
              key={`${career.company}-${career.period}`}
              className="border border-border/80 bg-card/90 py-0"
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0px)" : "translateX(-22px)",
                transition: "all 700ms ease",
                transitionDelay: `${index * 130}ms`,
              }}
            >
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-[auto_1fr]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background/40 text-xl">
                    {career.logo}
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-bold">
                        {career.company}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground uppercase">
                        {career.period}
                      </p>
                    </div>

                    <p className="font-semibold text-[var(--accent)]">
                      {career.role}
                    </p>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {career.highlight}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
