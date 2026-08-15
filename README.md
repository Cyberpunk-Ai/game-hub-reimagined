# GameFlex — Cloud Game Hub

A production-ready competitive gaming platform: tournaments, squads, matches,
wallets, leaderboards, messaging and a social feed.

Built with **TanStack Start** (React 19, SSR), **Vite**, **Tailwind CSS v4**,
**TanStack Query** and a **swappable backend layer** (Supabase by default).

## Requirements

- Node.js 20+ (or Bun 1.1+)
- A Postgres-backed auth/data provider — Supabase (hosted or self-hosted) works out of the box

## Quick start

```sh
git clone <this-repository-url>
cd cloud-game-hub
npm install          # or: bun install
cp .env.example .env # fill in your own values
npm run dev
```

The app runs at http://localhost:8080.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Production build (`.output/`) |
| `npm start` | Run the built server (`node .output/server/index.mjs`) |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Configuration

Everything is driven by environment variables — see `.env.example` for the full
list. No hosting platform, vendor SDK or proprietary service is required.

### Backend providers

Each capability is selected independently, so you can migrate one piece at a
time (details in [`docs/backend-providers.md`](docs/backend-providers.md)):

| Variable | Values | Default |
| --- | --- | --- |
| `VITE_BACKEND_PROVIDER` | `supabase`, `rest` | `supabase` |
| `VITE_AUTH_PROVIDER` | `supabase`, `custom` | `supabase` |
| `VITE_STORAGE_PROVIDER` | `supabase`, `s3`, `r2`, `vps` | `supabase` |
| `VITE_REALTIME_PROVIDER` | `supabase`, `none` | `supabase` |

Supply the matching credentials (`VITE_SUPABASE_URL`,
`VITE_SUPABASE_PUBLISHABLE_KEY`, or `VITE_BACKEND_REST_URL` /
`VITE_AUTH_API_URL` / `VITE_STORAGE_API_URL`) for whichever providers you pick.

### Branding, auth and observability

- `VITE_APP_NAME`, `VITE_APP_DESCRIPTION`, `VITE_SITE_URL`, `VITE_CURRENCY`,
  `VITE_SUPPORT_EMAIL` — site identity, no hardcoded branding in code.
- `VITE_OAUTH_PROVIDERS` — comma-separated social logins (`google,apple,github,…`).
  They must also be enabled in your auth backend.
- `VITE_ERROR_REPORTING_URL` — optional JSON endpoint for client error reports
  (Sentry tunnel, Logflare, your own collector). Unset = console only in dev.

Variables prefixed with `VITE_` are exposed to the browser; unprefixed mirrors
(`SUPABASE_URL`, …) are server-only and read inside server functions.

## Database

SQL migrations live in `supabase/migrations/`. Apply them with the Supabase CLI
(`supabase db push`) or any Postgres migration runner against your own database.

## Deployment

`npm run build` produces a self-contained Node server in `.output/`. Deploy it
anywhere that runs Node (a VPS, Docker, Fly.io, Render, Cloudflare, …) and set
the same environment variables in that environment.

## Project structure

```
src/
  backend/       provider-agnostic adapters (data, auth, storage, realtime)
  components/    UI components (shadcn/ui + feature components)
  features/      feature modules with their own api/hooks
  integrations/  Supabase client + generated types
  lib/           cross-cutting utilities (auth context, oauth, error reporting)
  pages/         page components
  routes/        TanStack Start file-based routes
  services/      domain services (tournaments, payments, social, …)
supabase/migrations/  SQL schema
```
