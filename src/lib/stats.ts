import { useQuery } from "@tanstack/react-query";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const API = {
  stats: `${SUPABASE_URL}/functions/v1/bot-stats`,
  guild: `${SUPABASE_URL}/functions/v1/guild`,
};

const POLLING = {
  success: 5000,
  failure: 30 * 60 * 1000,
};

export interface ShardStat {
  shardId: number;
  guilds: number;
  channels: number;
  radio: number;
  azkar: number;
  adhan: number;
  users: number;
  uptime: number;
  ping: number;
}

export interface GuildLookupResponse {
  success: boolean;
  exists: boolean;
  shardId?: number;
  name?: string;
  memberCount?: number;
}

export interface BotStats {
  success: boolean;
  timestamp: number;
  totalShards: number;
  totalGuilds: number;
  totalUsers: number;
  totalChannels: number;
  totalRadio: number;
  totalAzkar: number;
  totalAdhan: number;
  averagePing: number;
  averageUptime: number;
  activeRadios: number;
  perShard: ShardStat[];
}


async function fetchStats(): Promise<BotStats> {
  const res = await fetch(API.stats, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Stats API error: ${res.status}`);
  }

  const json = await res.json();

  if (!json?.success || !json.stats) {
    throw new Error("Invalid stats response");
  }

  const perShard = json.stats.perShard ?? [];

  return {
    success: json.success,
    timestamp: json.timestamp,
    totalShards: json.totalShards,

    totalGuilds: json.stats.totalGuilds,
    totalUsers: json.stats.totalUsers,
    totalChannels: json.stats.totalChannels,
    totalRadio: json.stats.totalRadio,
    totalAzkar: json.stats.totalAzkar,
    totalAdhan: json.stats.totalAdhan,
    averagePing: json.stats.averagePing,
    averageUptime: json.stats.averageUptime,

    activeRadios: perShard.reduce((acc, s) => acc + (s.radio ?? 0), 0),

    perShard,
  };
}

async function fetchGuild(guildId: string): Promise<GuildLookupResponse> {
  const res = await fetch(`${API.guild}?id=${guildId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Guild API error: ${res.status}`);
  }

  return res.json();
}

export function useStats() {
  return useQuery({
    queryKey: ["bot-stats"],
    queryFn: fetchStats,

    refetchInterval: (q) =>
      q.state.error ? POLLING.failure : POLLING.success,

    staleTime: 4000,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}

export function useGuildLookup(guildId: string | null) {
  return useQuery({
    queryKey: ["guild-lookup", guildId],

    enabled: typeof guildId === "string" && guildId.length > 0,

    queryFn: () => {
      if (!guildId) throw new Error("Missing guildId");
      return fetchGuild(guildId);
    },

    staleTime: 60_000, // cache 1 min (important)
    refetchOnWindowFocus: false,
    retry: (n) => n < 2,
  });
}

export function formatNumber(n?: number | null): string {
  if (n == null || Number.isNaN(n)) return "—";
  return n.toLocaleString("en-US");
}

export function formatUptime(ms?: number | null): string {
  if (!ms || ms < 0) return "—";

  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);

  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  return `${m}m`;
}