"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      let closestId = activeSection;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) {
          continue;
        }

        const distance = Math.abs(element.getBoundingClientRect().top - 200);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      }

      if (closestId && closestId !== activeSection) {
        setActiveSection(closestId);
      }
    };

    const onScroll = () => {
      if (timeoutRef.current !== null) {
        return;
      }

      timeoutRef.current = window.setTimeout(() => {
        updateActiveSection();
        timeoutRef.current = null;
      }, 120);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [sectionIds, activeSection]);

  return activeSection;
}
