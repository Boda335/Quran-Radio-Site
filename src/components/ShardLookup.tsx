import { useState } from "react";
import {
  Search,
  Layers,
  Server,
  Activity,
  Copy,
  Check,
  AlertCircle,
  WifiOff,
} from "lucide-react";
import { FaWifi } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { useStats, useGuildLookup } from "@/lib/stats";
import { cn } from "@/lib/utils";

interface LookupResult {
  guildId: string;
  shardId: number;
  totalShards: number;
  exists: boolean;
  name?: string;
  memberCount?: number;
}

export const ShardLookup = () => {
  const { t } = useI18n();

  const { data: stats } = useStats();

  const [input, setInput] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const { data: api, isLoading, isError } = useGuildLookup(submittedId);

  const totalShards = stats?.totalShards ?? stats?.perShard?.length ?? 0;

  const computeShardFallback = (id: string) => {
    return Number((BigInt(id) >> 22n) % BigInt(totalShards || 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const id = input.trim();

    if (!id) {
      setError(t("lookup.err.empty"));
      return;
    }

    if (!/^\d{17,20}$/.test(id)) {
      setError(t("lookup.err.invalid"));
      return;
    }

    setError(null);
    setSubmittedId(id);
  };

  const result: LookupResult | null = submittedId
    ? {
        guildId: submittedId,
        shardId:
          api?.exists && typeof api.shardId === "number"
            ? api.shardId
            : computeShardFallback(submittedId),

        totalShards,
        exists: api?.exists ?? false,
        name: api?.name,
        memberCount: api?.memberCount,
      }
    : null;

  const handleCopy = async () => {
    if (!result) return;

    await navigator.clipboard.writeText(
      `Server ID: ${result.guildId}\nShard: #${result.shardId}`,
    );

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="surface-card rounded-2xl p-6 md:p-8 max-w-2xl">
      <div className="flex items-start gap-4 mb-6">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
          <Search className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-serif text-2xl font-semibold mb-1">
            {t("lookup.title")}
          </h3>
          <p className="text-sm text-muted-foreground">{t("lookup.desc")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
        <Input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(null);
          }}
          placeholder={t("lookup.placeholder")}
          className={cn("flex-1 font-mono", error && "border-destructive")}
        />

        <Button disabled={isLoading}>
          {isLoading ? "..." : t("lookup.button")}
        </Button>
      </form>

      {error && (
        <div className="text-sm text-red-500 flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {isError && (
        <div className="text-sm text-red-500 flex items-center gap-2">
          <AlertCircle size={16} />
          {t("lookup.apiError")}
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 rounded-xl border">
          <div className="flex justify-between mb-3">
            <span className="text-sm flex items-center gap-2">
              {result.exists ? (
                <>
                  <FaWifi size={14} className="text-primary" />
                  {t("lookup.online")}
                </>
              ) : (
                <>
                  <WifiOff size={14} />
                  {t("lookup.offline")}
                </>
              )}
            </span>

            <Button size="sm" variant="ghost" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </Button>
          </div>

          <div className="space-y-2 text-sm">
            <Row icon={Server} label={t("lookup.serverId")}>
              {result.guildId}
            </Row>

            <Row icon={Layers} label={t("lookup.shard")}>
              {result.exists
                ? `#${result.shardId + 1} / ${result.totalShards}`
                : t("lookup.notfound")}
            </Row>

            {result.name && (
              <Row icon={Activity} label={t("lookup.serverName")}>
                {result.name}
              </Row>
            )}

            {result.memberCount != null && (
              <Row icon={Activity} label={t("lookup.members")}>
                {result.memberCount.toLocaleString()}
              </Row>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ icon: Icon, label, children }) => (
  <div className="flex justify-between py-1">
    <span className="flex items-center gap-2 text-muted-foreground">
      <Icon size={14} />
      {label}
    </span>
    <span>{children}</span>
  </div>
);
