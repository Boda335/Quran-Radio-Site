import { Server, Radio, Headphones, Users, Layers, Hash, Activity, Clock, AlertCircle, WifiOff } from "lucide-react";
import { useStats, formatUptime } from "@/lib/stats";
import { StatCard } from "@/components/StatCard";
import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const LiveStats = () => {
  const { data, isLoading, isError } = useStats();
  const { ref, shown } = useReveal();
  const { t } = useI18n();

  const offline = isError || (!isLoading && !data?.success);

  const items = [
    { icon: Server,     label: t("stat.totalServers"),  value: data?.totalGuilds },
    { icon: Users,      label: t("stat.totalUsers"),    value: data?.totalUsers },
    { icon: Hash,       label: t("stat.totalChannels"), value: data?.totalChannels },
    { icon: Radio,      label: t("stat.totalRadios"),   value: data?.totalRadio },
    { icon: Headphones, label: t("stat.activeRadios"),  value: data?.activeRadios },
    { icon: Activity,   label: t("stat.averagePing"),   value: data?.averagePing, suffix: "ms" },
    { icon: Clock,      label: t("stat.averageUptime"), value: data?.averageUptime, formatter: (n: number) => formatUptime(n) },
    { icon: Layers,     label: t("stat.activeShards"),  value: data?.totalShards },
  ];

  return (
    <section id="statistics" className="py-24 md:py-32 relative">
      <div ref={ref} className="container">
        <div className={cn("text-center max-w-2xl mx-auto mb-14", shown && "animate-fade-in")}>
          <div className="inline-flex items-center gap-2 mb-4">
            {offline ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-destructive">{t("stats.offline")}</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-success opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-primary/90">{t("stats.live")}</span>
              </>
            )}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            {t("stats.title1")} <span className="text-gradient-gold">{t("stats.title2")}</span>
          </h2>
          <p className="text-muted-foreground">
            {isLoading ? t("stats.connecting") : offline ? t("stats.retryLater") : t("stats.subtitle")}
          </p>
        </div>

        {offline ? (
          <div className="surface-card rounded-2xl p-8 text-center max-w-md mx-auto border-destructive/40">
            <WifiOff className="h-8 w-8 text-destructive mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">{t("stats.errorBox")}</p>
          </div>
        ) : (
          <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-4", shown && "animate-fade-in")}
               style={shown ? { animationDelay: "150ms" } : undefined}>
            {items.map((it) => (
              <StatCard
                key={it.label}
                icon={it.icon}
                label={it.label}
                value={it.value}
                suffix={it.suffix}
                formatter={it.formatter}
                loading={isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
