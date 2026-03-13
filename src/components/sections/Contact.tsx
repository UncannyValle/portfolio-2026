"use client";

import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useInView } from "@/hooks/useInView";
import { CONTACT_EMAIL } from "@/lib/constants";

export function Contact() {
  const [ref, isInView] = useInView<HTMLElement>(0.2);

  return (
    <section
      id="contact"
      ref={ref}
      className="px-4 pt-20 pb-24 md:pt-28 md:pb-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Contact"
          subtitle="Available for full time roles, contract work, and product focused collaboration."
        />

        <Card
          className="mx-auto max-w-3xl border border-border/80 bg-card/90 py-0"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0px)" : "translateY(20px)",
            transition: "all 700ms ease",
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(232, 200, 114, 0.16), transparent 45%), radial-gradient(circle at 85% 10%, rgba(96, 165, 250, 0.12), transparent 36%)",
          }}
        >
          <CardContent className="space-y-6 p-8 text-center md:p-12">
            <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s Build Something Great
            </h3>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              If you are building SaaS products and need engineering support
              across frontend, backend, and AI integration, I would love to
              connect.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <a href={`mailto:${CONTACT_EMAIL}`}>Email Me</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-7"
              >
                <a
                  href="https://linkedin.com/in/julian-valle"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
