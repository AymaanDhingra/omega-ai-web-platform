# OMEGA AI Web Platform

OMEGA v1.0 RC platform for a mock-first AI Trading Operating System that accumulates experience.

Core loop:

```text
Knowledge → Market Intelligence → AI → SignalFlow → Paper Trading → Analytics → Experience → Knowledge
```

## Recovery Baseline

- [Recovery analysis](docs/RECOVERY_ANALYSIS.md)
- [OMEGA Architecture](OMEGA_ARCHITECTURE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [v1.0 Platform Consolidation](docs/V1_PLATFORM_CONSOLIDATION.md)
- [Project status](docs/PROJECT_STATUS.md)
- [Changelog](CHANGELOG.md)
- [Next phase handoff](NEXT_PHASE.md)

## Run

```powershell
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Verify

```powershell
npm run lint
npm run test
npm run build
```

## Current Scope

- React / Next.js / Tailwind frontend
- Modular TypeScript models, mock data, mock services, and reusable dashboard components
- Multi-page App Router frontend for dashboard, markets, AI, knowledge, strategies, backtesting, paper trading, portfolio, trades, analytics, chat, news, admin, and settings
- Frontend API contracts in `api/` that call adapter interfaces before reaching mock services
- API adapter layer in `adapters/` for market, portfolio, AI, knowledge, strategy, analytics, paper trading, TradingView testing, news, and system data
- Backend contract definitions in `lib/contracts/backend.ts` for future request, response, error, pagination, filtering, sorting, and versioning models
- Data source abstraction in `lib/data-sources.ts` for mock, local, REST, WebSocket, broker, exchange, and TradingView sources
- Mock paper trading, analytics, and TradingView testing contract models for future backend integration
- Shared app result states and a mock system event bus in `lib/result.ts` and `lib/events.ts`
- Feature flags for every frontend module in `lib/feature-flags.ts`
- Mock-first Experience Engine that converts paper trading outcomes into lessons, patterns, and knowledge updates without ML training
- Simulated market watch, portfolio, AI states, system health, trade center, backtesting, paper trading, knowledge uploads, autonomous loops, analytics, TradingView testing placeholders, news intelligence, chat commands, module registry, and admin panels
- Live trading and broker connections are intentionally locked until API credentials, execution permissions, and risk rules are supplied

## Current Structure

- `app/page.tsx` loads the typed dashboard snapshot.
- `app/*/page.tsx` provides module-specific pages.
- `api/` contains frontend API contracts.
- `adapters/` contains replaceable data adapters that currently point to mock services.
- `components/` contains reusable UI components by domain.
- `components/modules/` contains independently renderable OMEGA modules.
- `lib/contracts/` contains backend, analytics, paper trading, and TradingView testing contracts.
- `lib/types/` contains shared TypeScript interfaces.
- `lib/mock/` contains mock data and the OMEGA module registry.
- `lib/data-sources.ts`, `lib/result.ts`, and `lib/events.ts` define integration readiness primitives.
- `lib/feature-flags.ts` contains frontend feature gates.
- `services/` contains mock service interfaces for future provider replacement.
- `hooks/` contains reusable client hooks.
- `tests/` contains smoke coverage.

## Routes

- `/`
- `/markets`
- `/ai`
- `/knowledge`
- `/strategies`
- `/backtesting`
- `/paper`
- `/portfolio`
- `/trades`
- `/analytics`
- `/chat`
- `/news`
- `/admin`
- `/settings`

## Still Not Implemented

No backend, database, authentication, broker APIs, exchange APIs, real AI providers, live feeds, real TradingView integration, secrets management, background workers, autonomous execution, or live risk engine.

## Project Asset

- `public/assets/omega-brain.png` was generated for the AI Brain dashboard panel.
