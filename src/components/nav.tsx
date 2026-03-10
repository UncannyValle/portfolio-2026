"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EMPTY_NAV_LINKS: string[] = [];

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionIds = isHome ? NAV_LINKS : EMPTY_NAV_LINKS;
  const scrolled = useScrolled(40);
  const active = useActiveSection(sectionIds);
  const { resolvedTheme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) {
      return;
    }

    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const getSectionHref = (item: string) => (isHome ? `#${item}` : `/#${item}`);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-4 pt-4">
      <div
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border px-4 py-3 transition-all md:px-6",
          scrolled
            ? "border-border/90 bg-background/70 shadow-lg shadow-black/10 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link
          href="/"
          className="font-mono text-lg font-semibold tracking-tight text-[var(--accent)]"
        >
          &lt;JV /&gt;
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item}
              href={getSectionHref(item)}
              className={cn(
                "rounded-full px-4 py-2 font-mono text-xs tracking-[0.18em] uppercase transition-colors",
                active === item
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="rounded-full md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-2 w-full max-w-6xl rounded-2xl border border-border bg-popover/95 p-3 shadow-xl backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href={getSectionHref(item)}
                className={cn(
                  "rounded-xl px-3 py-2 font-mono text-xs tracking-[0.16em] uppercase",
                  active === item
                    ? "bg-foreground text-background"
                    : "text-foreground",
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
