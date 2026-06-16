# Changelog

All notable changes to the OMEGA AI Web Platform will be tracked here.

## 2026-06-16

### Added

- Added repository recovery analysis in `docs/RECOVERY_ANALYSIS.md`.
- Added architecture documentation and diagrams in `docs/ARCHITECTURE.md`.
- Added persistent project tracker in `docs/PROJECT_STATUS.md`.
- Added this changelog.
- Added shared TypeScript models in `lib/types/`.
- Added the OMEGA module registry in `lib/mock/modules.ts`.
- Added domain mock data in `lib/mock/`.
- Added mock service abstractions in `services/`.
- Added reusable dashboard, market, trading, portfolio, AI, and layout components.
- Added system health mock state and dashboard panel.
- Added smoke tests in `tests/smoke.test.tsx`.
- Added `npm run test`.
- Added multi-page App Router pages for dashboard, markets, AI, knowledge, strategies, backtesting, paper trading, portfolio, trades, analytics, chat, news, admin, and settings.
- Added independently renderable module components in `components/modules/`.
- Added frontend API contract files in `api/`.
- Added shared layout system components: `SharedHeader`, `PageHeader`, `StatusBadge`, `ModuleHeader`, `LoadingState`, `EmptyState`, `ErrorState`, `AppShell`, and `ModulePage`.
- Added frontend feature flag system in `lib/feature-flags.ts`.
- Added enriched module registry metadata: version, feature flag, dependencies, page route, current status, future backend dependency, and future AI dependency.
- Added mock TradingView testing preparation interfaces and UI.
- Added analytics placeholders for AI accuracy, strategy accuracy, market performance, paper trading results, signal statistics, portfolio statistics, and historical metrics.
- Added API adapter layer in `adapters/` for market, portfolio, AI, knowledge, strategy, analytics, paper trading, TradingView testing, news, and system data.
- Added backend contract definitions in `lib/contracts/backend.ts`.
- Added paper trading contracts in `lib/contracts/paper-trading.ts`.
- Added TradingView testing contracts in `lib/contracts/tradingview-testing.ts`.
- Added analytics model contracts in `lib/contracts/analytics.ts`.
- Added data source descriptors in `lib/data-sources.ts`.
- Added shared app result models in `lib/result.ts`.
- Added mock system event definitions and dispatcher in `lib/events.ts`.
- Added mock paper trading state in `lib/mock/paper-trading.ts`.
- Added mock analytics model sets in `lib/mock/analytics-models.ts`.
- Added mock TradingView testing contract fixtures in `lib/mock/tradingview-contracts.ts`.
- Added paper trading and TradingView testing mock services.
- Added `api/tradingViewTesting.ts`.
- Added `NEXT_PHASE.md` for future development handoff.
- Initialized a local Git repository on the `main` branch for upload readiness.

### Changed

- Reduced `app/page.tsx` from a monolithic client dashboard to a small server entrypoint.
- Moved dashboard data out of rendering code and behind typed mock services.
- Replaced mojibake rupee display values with ASCII `INR` labels in mock data.
- Reworked `DashboardConsole` into a composed overview of independently renderable modules.
- Expanded smoke tests to cover routes, feature flags, API contracts, registry metadata, reusable states, and TradingView testing mocks.
- Routed app pages through `systemApi` for dashboard snapshot loading.
- Routed frontend API contracts through adapters instead of directly reaching mock services.
- Expanded analytics API coverage with reusable analytics model sets.
- Expanded paper trading API coverage with account, order, position, portfolio, journal, and performance contract methods.
- Expanded smoke tests from 8 to 13 subtests for adapters, contracts, data sources, result states, paper trading contracts, TradingView testing contracts, and the event bus.

### Verified

- `npm install` passes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- Phase 4 remains frontend-only and mock-only.

### Notes

- Current app remains a frontend-only Next.js prototype with simulated data and provider-shaped mock services.
- Live trading remains locked and unimplemented.
- Current folder is now a local Git repository, but GitHub CLI is not installed and no GitHub remote is configured, so GitHub upload requires an authenticated remote or upload tool.
