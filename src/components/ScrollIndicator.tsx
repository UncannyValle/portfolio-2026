export function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-muted-foreground">
      <span className="font-mono tracking-[0.22em] uppercase">Scroll</span>
      <span className="h-12 w-px rounded-full bg-foreground/20">
        <span className="block h-full w-full origin-top bg-accent motion-safe:animate-scroll-line" />
      </span>
    </div>
  );
}
