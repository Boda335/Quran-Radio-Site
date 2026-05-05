# Quran Radio — Dashboard

A modern, real-time web dashboard for a sharded Discord bot that powers a Quran Radio streaming system. The dashboard provides live operational insight across all shards, a guild lookup utility, and full multilingual support.

---

## Overview

This application visualizes the live state of a distributed Discord bot. It aggregates per-shard metrics, exposes a guild (server) lookup tool, and degrades gracefully when upstream services are unavailable.

Key capabilities:

- Quran Radio streaming bot monitoring
- Live aggregated statistics across all shards
- Guild lookup with intelligent fallback
- Real-time dashboard with auto-refresh
- Multi-language UI with RTL support

---

## Architecture

The frontend is a single-page React application. The backend layer is implemented as Supabase Edge Functions, which act as an HTTPS facade in front of the bot's internal HTTP API. This isolates the browser from direct network access to the bot host and centralizes CORS, caching, and error handling.

```
┌──────────────┐      HTTPS       ┌────────────────────────┐      HTTP       ┌──────────────┐
│   Browser    │ ───────────────▶ │  Supabase Edge Function│ ──────────────▶ │  Discord Bot │
│ (React + RQ) │ ◀─────────────── │   (bot-stats / guild)  │ ◀────────────── │   (sharded)  │
└──────────────┘                  └────────────────────────┘                 └──────────────┘
```

---

## Backend API

### 1. Bot Stats

```
GET /functions/v1/bot-stats
```

Returns aggregated real-time statistics for the entire bot fleet. Polled by the dashboard at a short interval to keep the UI live.

Response shape:

```json
{
  "success": true,
  "timestamp": 1777648296719,
  "totalShards": 4,
  "totalGuilds": 12450,
  "totalUsers": 1820345,
  "totalChannels": 39820,
  "averagePing": 72,
  "averageUptime": 86400000,
  "perShard": [
    {
      "shardId": 0,
      "guilds": 3120,
      "users": 455321,
      "channels": 9850,
      "radio": 142,
      "ping": 68,
      "uptime": 86400000
    }
  ],
  "botInfo": {
    "id": "123456789012345678",
    "username": "Quran Radio",
    "version": "2.4.0"
  }
}
```

### 2. Guild Lookup

```
GET /functions/v1/guild?id={guildId}
```

Resolves a Discord guild ID to its hosting shard and basic metadata.

If the guild exists:

```json
{
  "success": true,
  "exists": true,
  "shardId": 0,
  "name": "Guild Name",
  "memberCount": 153
}
```

If the guild does not exist:

```json
{
  "success": true,
  "exists": false
}
```

#### Lookup behavior

1. The frontend calls `/functions/v1/guild?id=...`.
2. If the guild is found, `shardId` and metadata are taken directly from the backend.
3. If the guild is not found, or the request fails, the client falls back to a deterministic shard calculation based on the Discord Snowflake format:

   ```ts
   const shardId = Number((BigInt(guildId) >> 22n) % BigInt(totalShards));
   ```

This guarantees that the lookup tool always returns a useful shard result, even during partial outages.

---

## Frontend

- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS with a semantic design token system
- **Data layer:** TanStack React Query for caching, polling, and retry
- **Routing:** React Router
- **State for live data:** React Query keys per endpoint, with smart polling intervals

### Smart polling

| State    | Interval   |
|----------|------------|
| Healthy  | 5 seconds  |
| Failing  | 30 minutes |

This avoids hammering the upstream API when it is degraded, while keeping the UI fresh during normal operation.

---

## Dashboard Features

- Live aggregate bot statistics (servers, users, channels, radios, ping, uptime)
- Per-shard breakdown with health indicators
- Guild lookup tool (live API + Snowflake fallback)
- Copy-to-clipboard for server and shard info
- Online / offline / reconnecting state pills
- Section-based landing page with the same live data

---

## Internationalization

The app ships with a dictionary-based i18n system. Strings are accessed through a typed helper:

```ts
const { t } = useI18n();
t("lookup.title");
```

Supported languages:

- Arabic (`ar`) — default, RTL
- English (`en`)
- Turkish (`tr`)
- Spanish (`es`)
- German (`de`)
- French (`fr`)

RTL layout is toggled automatically when an RTL locale is active.

---

## Reliability

- **Fallback shard calculation** when the guild API is unreachable
- **Retry with backoff** on transient failures
- **Adaptive polling** to slow down during outages
- **HTTPS proxy** via edge functions to avoid mixed-content issues with the upstream HTTP bot host
- **Graceful UI states** for loading, empty, and error conditions

---

## Project Structure

```
src/
├── components/         # UI components (Navbar, ShardLookup, StatCard, ...)
│   └── sections/       # Landing page sections
├── pages/              # Route-level pages (Index, Dashboard, NotFound)
├── lib/
│   ├── stats.ts        # React Query hook + types for bot-stats
│   ├── i18n.tsx        # Translation provider and dictionaries
│   ├── themes.tsx      # Theme provider
│   └── config.ts       # Shared constants
├── integrations/
│   └── supabase/       # Auto-generated client and types
└── index.css           # Design tokens

supabase/
└── functions/
    └── bot-stats/      # HTTPS proxy edge function
```

---

## Local Development

Prerequisites: Node.js 18+ and Bun (or npm/pnpm).

```bash
bun install
bun run dev
```

The dev server runs Vite with HMR. Environment variables are auto-provisioned for the connected backend.

---

## Tech Stack

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS
- TanStack React Query
- Supabase Edge Functions (Deno runtime)
- Discord sharded bot API (upstream)

---

## Summary

A real-time Discord bot monitoring and utility dashboard, built around a sharded backend, an HTTPS edge-function proxy, and a resilient frontend that keeps working — including shard lookup — even when the upstream API is down.
