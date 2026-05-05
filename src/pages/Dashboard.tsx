import { Link } from "react-router-dom";
import { Moon, ArrowLeft, Server, Users, Radio, Activity, Clock, Layers, Wifi, WifiOff, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStats, formatNumber, formatUptime } from "@/lib/stats";
import { StatCard } from "@/components/StatCard";
import { Skeleton } from "@/components/ui/skeleton";
import { INVITE_URL } from "@/lib/config";
import { useI18n } from "@/lib/i18n";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ThemeSelector } from "@/components/ThemeSelector";
import { ShardLookup } from "@/components/ShardLookup";
import { cn } from "@/lib/utils";

const ConnectionPill = ({ isError, isFetching }: { isError: boolean; isFetching: boolean }) => {
  const { t } = useI18n();
  if (isError) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs">
        <WifiOff className="h-3.5 w-3.5 text-warning" />
        <span className="text-warning font-medium">{t("dash.reconnecting")}</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs">
      <span className="relative flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full rounded-full bg-success opacity-75", isFetching && "animate-ping")} />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </span>
      <Wifi className="h-3 w-3 text-success" />
      <span className="text-success font-medium">{t("dash.online")}</span>
    </span>
  );
};

const pingTone = (ping: number) =>
  ping < 80 ? "text-success" : ping < 150 ? "text-warning" : "text-destructive";

const Dashboard = () => {
  const { data, isLoading, isError, isFetching } = useStats();
  const { t } = useI18n();
  const offline = isError || (!isLoading && data?.success === false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="grid h-9 w-9 place-items-center rounded-lg border border-primary/30 bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Moon className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-serif text-base font-semibold">Quran Radio</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-primary/70">{t("nav.dashboard")}</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <ConnectionPill isError={offline} isFetching={isFetching} />
            <LanguageSelector compact />
            <ThemeSelector />
            <Button asChild variant="outline" size="sm" className="hidden md:inline-flex border-primary/30 bg-primary/5 hover:bg-primary/10 h-9">
              <Link to="/"><ArrowLeft className="h-4 w-4 me-1.5 rtl:rotate-180" />{t("dash.home")}</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-gold text-primary-foreground hover:opacity-90 h-9">
              <a href={INVITE_URL} target="_blank" rel="noopener noreferrer">{t("dash.invite")}</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-10 md:py-14">
        <div className="mb-8 md:mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">{t("dash.eyebrow")}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-2">{t("dash.title")}</h1>
          <p className="text-muted-foreground">{t("dash.subtitle")}</p>
        </div>

        <Tabs defaultValue="statistics" className="space-y-8">
          <TabsList className="bg-card/60 border border-primary/10 p-1 h-auto flex-wrap">
            <TabsTrigger value="statistics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2">
              {t("dash.tab.statistics")}
            </TabsTrigger>
            <TabsTrigger value="shards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2">
              {t("dash.tab.shards")}
            </TabsTrigger>
            <TabsTrigger value="lookup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2">
              {t("dash.tab.lookup")}
            </TabsTrigger>
            <TabsTrigger value="broadcasts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 py-2">
              {t("dash.tab.broadcasts")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="statistics" className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <StatCard icon={Server} label={t("stat.totalServers")} value={data?.totalGuilds} loading={isLoading} accent />
              <StatCard icon={Users} label={t("stat.totalUsers")} value={data?.totalUsers} loading={isLoading} />
              <StatCard icon={Radio} label={t("stat.totalRadios")} value={data?.totalRadio} loading={isLoading} />
              <StatCard icon={Activity} label={t("stat.averagePing")} value={data?.averagePing} suffix="ms" loading={isLoading} />
              <StatCard
                icon={Clock}
                label={t("stat.averageUptime")}
                value={data?.averageUptime}
                loading={isLoading}
                formatter={(n) => formatUptime(n)}
              />
            </div>
          </TabsContent>

          <TabsContent value="shards">
            {isLoading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-44 rounded-2xl bg-primary/5" />
                ))}
              </div>
            ) : !data?.perShard?.length ? (
              <div className="surface-card rounded-2xl p-10 text-center text-muted-foreground">
                {t("dash.noShards")}
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {data.perShard.map((s) => (
                  <article key={s.shardId} className="surface-card rounded-2xl p-6 hover-glow">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2.5">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
                          <Layers className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t("dash.shard")}</p>
                          <p className="font-serif text-lg font-semibold">#{s.shardId}</p>
                        </div>
                      </div>
                      <span className={cn("text-sm font-medium tabular-nums", pingTone(s.ping))}>
                        {s.ping}ms
                      </span>
                    </div>

                    <dl className="grid grid-cols-3 gap-3 mb-4">
                      <Metric label={t("dash.guilds")} value={formatNumber(s.guilds)} icon={Server} />
                      <Metric label={t("dash.users")} value={formatNumber(s.users)} icon={Users} />
                      <Metric label={t("dash.channels")} value={formatNumber(s.channels)} icon={Hash} />
                    </dl>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/10 text-xs">
                      <span className="text-muted-foreground inline-flex items-center gap-1.5">
                        <Clock className="h-3 w-3" /> {t("dash.uptime")}
                      </span>
                      <span className="text-foreground font-medium">{formatUptime(s.uptime)}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lookup">
            <ShardLookup />
          </TabsContent>

          <TabsContent value="broadcasts">
            <div className="surface-card rounded-2xl p-12 text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <Radio className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-2">{t("dash.broadcasts.title")}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">{t("dash.broadcasts.desc")}</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const Metric = ({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Server }) => (
  <div className="rounded-lg bg-background/40 border border-primary/10 p-3">
    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
      <Icon className="h-3 w-3" />
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </div>
    <p className="font-serif text-lg font-semibold tabular-nums">{value}</p>
  </div>
);

export default Dashboard;
