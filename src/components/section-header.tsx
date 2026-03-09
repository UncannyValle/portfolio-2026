"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  const [ref, isInView] = useInView<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      className={cn("mb-10 space-y-3 text-center md:mb-14", className)}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0px)" : "translateY(18px)",
        transition: "all 700ms ease",
      }}
    >
      <p className="font-mono text-xs tracking-[0.28em] text-[var(--accent)] uppercase">
        Section
      </p>
      <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
