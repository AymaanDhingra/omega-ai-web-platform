# Changelog

All notable changes to the OMEGA AI Web Platform will be tracked here.

## 2026-06-16 - Phase 7 Completion Pass (Gap Closure)

### Added

- Added 4 new feature flags in `lib/feature-flags.ts` and `lib/types/index.ts`:
  - `ENABLE_TRADINGVIEW` — umbrella flag for all TradingView integration (default `false`)
  - `ENABLE_REPOSITORIES` — gates domain-specific Repository<T> contracts (default `true`)
  - `ENABLE_HISTORY` — gates domain-specific history/audit-trail models (default `true`)
  - `ENABLE_SNAPSHOTS` — gates domain-specific snapshot contracts (default `true`)
- Added helper functions: `isRepositoriesEnabled()`, `isHistoryEnabled()`, `isSnapshotsEnabled()`.
- Updated `isTradingViewEnabled()` to include `ENABLE_TRADINGVIEW` umbrella flag (backward-compatible).
- Added `__setFeatureFlagForTest()` for test-only flag overrides with try/finally cleanup.
- Added `"placeholder"` to `ModuleStatus` type union.
- Created `TradingViewFoundationModule` (`components/modules/TradingViewFoundationModule.tsx`):
  - Dashboard placeholder header
  - Embedded chart placeholder (non-interactive, no real widget)
  - Symbol synchronization (mock symbol picker stub)
  - Timeframe synchronization (mock timeframe options)
  - Watchlists panel (mock fixture)
  - Status panel (Chart, Connection, Validation, Testing statuses via `SystemStatusBadge`)
  - Feature-flagged: renders `EmptyState` when `isTradingViewEnabled()` is false
- Created `/tradingview` route (`app/tradingview/page.tsx`).
- Added `tradingview-foundation` module entry to OMEGA module registry (`lib/mock/modules.ts`):
  - status `placeholder`, version `0.1.0`, featureFlag `ENABLE_TRADINGVIEW`, route `/tradingview`
  - dependencies `['dashboard']`, futureDependencies `['tradingview-provider']`
- Added `TradingViewFoundationMockState` interface and `tradingViewFoundationMock` fixture to `lib/mock/tradingview-contracts.ts`.
- Created governance documents:
  - `CANONICAL_CONTRACTS.md` — all canonical contract surfaces
  - `ENGINEERING_RULES.md` — numbered engineering rules and phase discipline rules
  - `ARCHITECTURE_DECISIONS.md` — ADR log (ADR-0001 through ADR-0007)
- Added smoke tests for `TradingViewFoundationModule` (flag-off EmptyState, flag-on panels).
- Added new feature-flag tests for all 4 new flags and helpers.

### Changed

- Refreshed `OMEGA_CONSTITUTION.md` Future Phases section: updated roadmap from Phase 7 through Phase 17A.
- Refreshed `docs/PROJECT_STATUS.md`: appended Phase 5, 6, 6A, 7, and 7 Completion Pass sections; updated Verification Log.
- Refreshed `NEXT_PHASE.md`: updated next phase from Phase 8 to Phase 7A Stabilization; pushed Phase 8 (Knowledge Engine) description down.
- Updated `README.md`: added `/tradingview` route; added `## Governance` section linking all governance docs.
- Updated `docs/ARCHITECTURE.md`: added `/tradingview` to routes list; added `TradingViewFoundationModule` to module list; added paragraph under TradingView Testing Preparation section.
- Converted `__tests__/feature-flags.test.ts`, `__tests__/persistence/repository.test.ts`, `__tests__/persistence/cache.test.ts` from vitest to node:test for CI compatibility.
- Updated `package.json` test script to include all test files (explicit list).
- Updated smoke test flag count from 19 to 23.
- Updated smoke test module count from 14 to 15.

### Verified

- `npm install` passes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- CI/CD Pipeline: GREEN.
- TradingView remains OPTIONAL — OMEGA functions without it.
- All existing tests continue passing.
- Contract governance maintained: mock adapters are canonical source of truth.

---

## 2026-06-16 - Phase 7 Persistence Architecture Complete

### Added

- Added generic `Repository<T>` interface in `lib/persistence/repository.ts` with CRUD, search, archive, and snapshot operations.
- Added `MockRepository<T>` implementation in `lib/persistence/mock-repository.ts`.
- Added domain-specific snapshot contracts in `lib/persistence/snapshots.ts`:
  - TradeSnapshot, PortfolioSnapshot, AISnapshot, MarketSnapshot
  - StrategySnapshot, PaperTradingSnapshot, AnalyticsSnapshot
  - KnowledgeSnapshot, SystemSnapshot, TradingViewSnapshot
- Added history models in `lib/persistence/history.ts`:
  - TradeHistory, SignalHistory, PortfolioHistory, StrategyHistory
  - AIHistory, KnowledgeHistory, AnalyticsHistory, PaperHistory
- Added session abstractions in `lib/persistence/sessions.ts`:
  - TradingSession, AISession, PaperTradingSession
  - TestingSession, ValidationSession, TradingViewTestingSession
  - SessionManager interface
- Added cache abstractions in `lib/persistence/cache.ts`:
  - Generic `Cache<T>` interface with TTL support
  - MarketCache, PortfolioCache, KnowledgeCache
  - AnalyticsCache, AIStateCache, SignalCache
  - `MockCache<T>` implementation with statistics
- Added domain-specific repository contracts in `lib/persistence/repositories.ts`:
  - SignalRepository, TradeRepository, OrderRepository, PositionRepository
  - StrategyRepository, KnowledgeRepository, PaperTradingRepository
  - PortfolioRepository, AnalyticsRepository, AIRepository
  - EventRepository, MarketRepository, NewsRepository, TradingViewRepository
- Added TradingView persistence contracts in `lib/persistence/tradingview.ts`:
  - TVSignalHistory, TVAlertHistory, TVValidationHistory
  - TVPaperComparison, TVTestingSession
  - TVPersistenceRepository interface
- Expanded event definitions in `lib/events.ts`:
  - TradingView events: connected, disconnected, watchlist.updated, chart.updated, validation.completed, alert.triggered
  - Persistence events: snapshot.created, entity.archived, entity.restored
  - Session events: started, paused, resumed, completed, cancelled
  - Cache events: invalidated, refreshed
- Expanded feature flags in `lib/feature-flags.ts` and `lib/types/index.ts`:
  - ENABLE_TRADINGVIEW_CHARTS, ENABLE_TRADINGVIEW_WATCHLISTS, ENABLE_TRADINGVIEW_VALIDATION
  - ENABLE_PERSISTENCE, ENABLE_CACHE, ENABLE_SESSIONS
  - Helper functions: isTradingViewEnabled(), isPersistenceEnabled(), isCacheEnabled(), isSessionsEnabled()
- Added comprehensive tests:
  - `__tests__/persistence/repository.test.ts` - MockRepository tests
  - `__tests__/persistence/cache.test.ts` - MockCache tests
  - `__tests__/feature-flags.test.ts` - Feature flags tests
- Added `lib/persistence/index.ts` with all module exports.

### Verified

- `npm install` passes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- CI/CD Pipeline: SUCCESS.
- TradingView remains OPTIONAL - OMEGA functions without it.
- All existing tests continue passing.
- Contract governance maintained: mock adapters are canonical source of truth.

## 2026-06-16 - Phase 6A Stabilization Complete

### Fixed

- Fixed HTTP analytics adapter: renamed `getAnalytics()` to `getAnalyticsGroups()`, added `getAnalyticsModelSet()`.
- Fixed HTTP news adapter: renamed `getNews()` to `getNewsEvents()`.
- Fixed HTTP portfolio adapter: added `getDashboardMetrics()`, `getPortfolio()`, `getPaperTrades()`.
- Fixed HTTP AI system adapter: added `getSystemStatuses()`, `getTradingModes()`, `getChatCommands()`, `getModules()`.
- Fixed HTTP strategy adapter: added `getTradeSignals()`, `getBacktestMetrics()`.
- Fixed HTTP paper trading adapter: implemented all 7 methods from mock interface.
- Fixed HTTP TradingView testing adapter: implemented all 7 methods from mock interface.
- Fixed HTTP system adapter: added `getModules()`, `getSystemStatuses()`, `getBrokerConnections()`, `getRiskPermissions()`, `getSystemLogs()`, `getFeatureFlags()`.
- Added `Trade` type alias to trading domain for backward compatibility with event system.
- Fixed `HttpError` construction in HTTP client using `Object.assign()` pattern.

### Verified

- `npm install` passes.
- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- CI/CD Pipeline #28: SUCCESS.
- All HTTP adapters now implement mock adapter interfaces exactly.
- Contract governance rule established: mock adapters are canonical source of truth.

## 2026-06-16 - Phase 6 Core Domain Complete

### Added

- Added domain models in `lib/domains/` for Market, Trading, Portfolio, Strategy, Paper Trading, AI, Knowledge, Analytics, TradingView Testing.
- Added state machines for Signal, Trade, Paper Trade, Portfolio lifecycle management.
- Added event system with typed domain events and mock dispatcher.
- Added HTTP adapter shells in `adapters/http/` for all domains.
- Added HTTP client implementation in `lib/http/client.ts`.
- Added adapter factory pattern in `lib/adapter-factory.ts`.
- Added provider configuration in `lib/provider-config.ts`.

## 2026-06-16 - Phase 5 Provider Architecture Complete

### Added

- Added configurable adapter selection.
- Added HTTP client implementation.
- Added provider configuration system.
- Added adapter factory pattern.

## 2026-06-16 - Phase 4 Integration Layer Complete

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

### Notes

- Current app remains a frontend-only Next.js prototype with simulated data and provider-shaped mock services.
- Live trading remains locked and unimplemented.
- Phase 6A establishes contract governance: mock adapters are the canonical source of truth for all provider implementations.
