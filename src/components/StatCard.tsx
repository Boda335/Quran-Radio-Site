import { LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  icon: LucideIcon;
  label: string;
  value?: number;
  suffix?: string;
  loading?: boolean;
  formatter?: (n: number) => string;
  accent?: boolean;
}

export const StatCard = ({ icon: Icon, label, value, suffix, loading, formatter, accent }: Props) => {
  const animated = useCountUp(value);
  const display = value == null
    ? "—"
    : formatter
      ? formatter(animated)
      : Math.round(animated).toLocaleString("en-US");

  return (
    <div
      className={cn(
        "surface-card relative overflow-hidden rounded-2xl p-6 hover-glow group",
        accent && "border-gold-strong",
      )}
    >
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
          {loading ? (
            <Skeleton className="h-9 w-24 bg-primary/10" />
          ) : (
            <p className="font-serif text-3xl md:text-4xl font-semibold text-foreground tabular-nums">
              {display}
              {suffix && <span className="ml-1 text-base text-primary/80 font-sans">{suffix}</span>}
            </p>
          )}
        </div>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};
