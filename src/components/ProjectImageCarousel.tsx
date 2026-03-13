"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProjectImageCarouselProps {
  images: string[];
  alt: string;
  accent: string;
}

export function ProjectImageCarousel({
  images,
  alt,
  accent,
}: ProjectImageCarouselProps) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="mt-16 space-y-4">
      <h2 className="font-display text-2xl font-bold tracking-tight">
        Screenshots
      </h2>

      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-card/60">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={src} className="w-full shrink-0">
              <Image
                src={src}
                alt={`${alt} screenshot ${i + 1}`}
                width={1600}
                height={900}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-border bg-background/80 p-1.5 text-muted-foreground backdrop-blur-sm transition-colors hover:text-foreground"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={`dot-${
                // biome-ignore lint/suspicious/noArrayIndexKey: index is stable for dots
                i
              }`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-6" : "w-1.5 bg-muted-foreground/40",
              )}
              style={i === index ? { backgroundColor: accent } : undefined}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}