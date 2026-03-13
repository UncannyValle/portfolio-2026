"use client";

import { useEffect, useState } from "react";

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative z-10 border-t border-border/80 px-4 py-8 text-center">
      <p className="font-mono text-xs text-muted-foreground md:text-sm">
        Designed and coded by Julian Valle · Built with React & TypeScript ·{" "}
        {year}
      </p>
    </footer>
  );
}
