"use client";

import { useEffect, useState } from "react";

export function useCounter(target: number, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }

    const safeDuration = Math.max(duration, 1);
    const steps = Math.max(Math.floor(safeDuration / 16), 1);
    const increment = target / steps;
    let current = 0;

    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        window.clearInterval(timer);
        return;
      }

      setCount(Math.round(current));
    }, 16);

    return () => window.clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}
