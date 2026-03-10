"use client";

import { useEffect, useState } from "react";

import { ScrollIndicator } from "@/components/ScrollIndicator";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-4 pt-28 pb-12"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-30 left-[10%] h-48 w-48 rounded-full bg-(--accent)/20 blur-3xl motion-safe:animate-float" />
        <div
          className="absolute right-[8%] bottom-28 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl motion-safe:animate-float"
          style={{ animationDelay: "220ms" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="max-w-3xl space-y-8">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-300 uppercase transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <span className="size-2 rounded-full bg-emerald-400 motion-safe:animate-pulse-dot" />
            Open to Opportunities
          </div>

          <div className="space-y-4">
            <h1
              className={cn(
                "font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.96] font-extrabold tracking-tight transition-all duration-700",
                loaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: "120ms" }}
            >
              Hi, I&apos;m Julian
            </h1>

            <p
              className={cn(
                "font-mono text-lg text-accent transition-all duration-700 md:text-2xl",
                loaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: "210ms" }}
            >
              Full Stack Engineer
            </p>

            <p
              className={cn(
                "max-w-2xl text-base leading-relaxed text-muted-foreground transition-all duration-700 md:text-lg",
                loaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={{ transitionDelay: "320ms" }}
            >
              I build scalable products that blend polished interfaces,
              resilient backend systems, and AI features that ship real business
              outcomes.
            </p>
          </div>

          <div
            className={cn(
              "flex flex-wrap gap-3 transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: "420ms" }}
          >
            <Button asChild size="lg" className="rounded-full px-7">
              <a href="/#projects">View Projects</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full px-7"
            >
              <a href={`mailto:${CONTACT_EMAIL}`}>Get in Touch</a>
            </Button>
          </div>

          <div
            className={cn(
              "flex items-center gap-2 transition-all duration-700",
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: "520ms" }}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
