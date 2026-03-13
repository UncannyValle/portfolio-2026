"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { useCounter } from "@/hooks/useCounter";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export function About() {
  const [ref, isInView] = useInView<HTMLElement>(0.18);
  const years = useCounter(5, 1200, isInView);
  const users = useCounter(50, 1400, isInView);

  const cards = [
    {
      title: "Full Stack Engineer",
      body: "I build end to end systems from accessible frontend UI to production APIs and cloud infrastructure.",
      emoji: "🚀",
      className: "md:col-span-2",
      metric: null,
    },
    {
      title: "Years of Experience",
      body: "Shipping software across legal, civic, ecommerce, and data domains.",
      emoji: "⏳",
      className: "",
      metric: `${years}+`,
    },
    {
      title: "AI & Innovation",
      body: "I apply LLM workflows that reduce manual effort and unlock measurable productivity.",
      emoji: "🤖",
      className: "",
      metric: null,
    },
    {
      title: "Users Served",
      body: "Products I helped build are used by teams and citizens at meaningful scale.",
      emoji: "📈",
      className: "",
      metric: `${users}K+`,
    },
    {
      title: "NYC Based, Globally Focused",
      body: "I partner with remote teams and clients to deliver durable systems with strong product velocity.",
      emoji: "🌍",
      className: "md:col-span-2",
      metric: null,
    },
  ];

  return (
    <section id="about" ref={ref} className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="About Me"
          subtitle="Engineering decisions grounded in product impact, maintainability, and execution speed."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className={cn(
                "border border-border/80 bg-card/85 py-0",
                card.className,
              )}
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0px)" : "translateY(20px)",
                transition: "all 700ms ease",
                transitionDelay: `${index * 120}ms`,
              }}
            >
              <CardContent className="space-y-4 p-6">
                <p className="text-2xl">{card.emoji}</p>
                <h3 className="font-display text-xl font-bold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
                {card.metric ? (
                  <p className="font-mono text-2xl font-semibold text-accent">
                    {card.metric}
                  </p>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
