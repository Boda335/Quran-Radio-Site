import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

/** Decorative section divider: ──── ✦ ──── */
export const SectionDivider = ({ className }: Props) => (
  <div className={cn("container py-2", className)} aria-hidden="true">
    <div className="flex items-center gap-4 max-w-md mx-auto opacity-70">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-primary/40" />
      <span className="text-primary text-lg leading-none select-none">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-primary/40 to-primary/40" />
    </div>
  </div>
);
