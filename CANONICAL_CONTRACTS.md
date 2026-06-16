# OMEGA AI — Canonical Contracts

> **Source of Truth**: Mock adapters in `adapters/` and mock services in `services/` are the canonical source of truth for all provider contracts. HTTP adapters must implement the same interface as their mock counterpart. See [ENGINEERING_RULES.md](ENGINEERING_RULES.md) and [OMEGA_CONSTITUTION.md](OMEGA_CONSTITUTION.md).

Last updated: 2026-06-16

---

## 1. Adapter Interfaces (`adapters/`)

All adapters expose a typed interface. The mock adapter is canonical; HTTP adapters must implement the same interface exactly (Phase 6A alignment rule).

| Adapter Interface | Mock Implementation | HTTP Shell |
|---|---|---|
| `MarketAdapter` | `adapters/market-adapter.ts` | `adapters/http/http-market-adapter.ts` |
| `PortfolioAdapter` | `adapters/portfolio-adapter.ts` | `adapters/http/http-portfolio-adapter.ts` |
| `AISystemAdapter` | `adapters/ai-system-adapter.ts` | `adapters/http/http-ai-system-adapter.ts` |
| `KnowledgeAdapter` | `adapters/knowledge-adapter.ts` | `adapters/http/http-knowledge-adapter.ts` |
| `StrategyAdapter` | `adapters/strategy-adapter.ts` | `adapters/http/http-strategy-adapter.ts` |
| `AnalyticsAdapter` | `adapters/analytics-adapter.ts` | `adapters/http/http-analytics-adapter.ts` |
| `PaperTradingAdapter` | `adapters/paper-trading-adapter.ts` | `adapters/http/http-paper-trading-adapter.ts` |
| `TradingViewTestingAdapter` | `adapters/tradingview-testing-adapter.ts` | `adapters/http/http-tradingview-testing-adapter.ts` |
| `NewsAdapter` | `adapters/news-adapter.ts` | `adapters/http/http-news-adapter.ts` |
| `SystemAdapter` | `adapters/system-adapter.ts` | `adapters/http/http-system-adapter.ts` |

**HTTP Adapter Alignment Rule (Phase 6A):** Every HTTP adapter shell must implement the same interface as its mock counterpart. No method may be added to the HTTP adapter that does not exist on the mock adapter. No method on the mock adapter may be removed from the HTTP adapter.

---

## 2. Contract Models (`lib/contracts/`)

Backend-facing contract definitions. These are the wire-format contracts for future API integration.

| File | Contents |
|---|---|
| `lib/contracts/backend.ts` | `RequestMeta`, `ResponseMeta`, `ApiError`, `PaginatedResponse`, `FilterParam`, `SortParam`, `CURRENT_API_VERSION` |
| `lib/contracts/paper-trading.ts` | `PaperAccount`, `PaperOrder`, `PaperPosition`, `PaperPortfolio`, `TradeJournalEntry`, `PerformanceMetrics`, `PaperTradingState` |
| `lib/contracts/tradingview-testing.ts` | `ChartStatus`, `SignalValidation`, `PaperComparison`, `AlertStatus`, `HistoricalValidation`, `TradingViewTestingContracts` |
| `lib/contracts/analytics.ts` | `StrategyPerformance`, `AIAccuracy`, `MarketPerformance`, `PaperTradingPerformance`, `PortfolioMetrics`, `HistoricalMetrics`, `AnalyticsModelSet` |

---

## 3. Persistence Interfaces (`lib/persistence/`)

Phase 7 persistence contracts. All are mock-only — no real database is connected.

### Core Generic Interfaces

| Interface | File | Description |
|---|---|---|
| `Repository<T>` | `lib/persistence/repository.ts` | Generic CRUD + search + archive + snapshot |
| `HistoryRepository<T>` | `lib/persistence/repository.ts` | Audit trail for entity changes |
| `Snapshot<T>` | `lib/persistence/repository.ts` | Point-in-time entity copy |
| `HistoryEntry<T>` | `lib/persistence/repository.ts` | Single audit record |
| `Cache<T>` | `lib/persistence/cache.ts` | Generic TTL cache interface |
| `CacheEntry<T>` | `lib/persistence/cache.ts` | Cache entry with metadata |
| `Session` | `lib/persistence/sessions.ts` | Base session interface |
| `SessionManager<T>` | `lib/persistence/sessions.ts` | Session lifecycle manager |

### Mock Implementations

| Class | File | Description |
|---|---|---|
| `MockRepository<T>` | `lib/persistence/mock-repository.ts` | In-memory Repository<T> implementation |
| `MockCache<T>` | `lib/persistence/cache.ts` | In-memory Cache<T> implementation with statistics |

### Domain-Specific Snapshot Contracts (`lib/persistence/snapshots.ts`)

| Type | Description |
|---|---|
| `TradeSnapshot` | Trade state at a point in time |
| `PortfolioSnapshot` | Portfolio state at a point in time |
| `AISnapshot` | AI brain state at a point in time |
| `MarketSnapshot` | Market state at a point in time |
| `StrategySnapshot` | Strategy state at a point in time |
| `PaperTradingSnapshot` | Paper trading state at a point in time |
| `AnalyticsSnapshot` | Analytics state at a point in time |
| `KnowledgeSnapshot` | Knowledge base state at a point in time |
| `SystemSnapshot` | System state at a point in time |
| `TradingViewSnapshot` | TradingView testing state (optional) |

### Domain-Specific History Models (`lib/persistence/history.ts`)

| Type | Description |
|---|---|
| `TradeHistory` / `TradeHistoryEntry` | Trade lifecycle audit trail |
| `SignalHistory` / `SignalHistoryEntry` | Signal generation audit trail |
| `PortfolioHistory` / `PortfolioHistoryEntry` | Portfolio change audit trail |
| `StrategyHistory` / `StrategyHistoryEntry` | Strategy update audit trail |
| `AIHistory` / `AIHistoryEntry` | AI decision audit trail |
| `KnowledgeHistory` / `KnowledgeHistoryEntry` | Knowledge ingestion audit trail |
| `AnalyticsHistory` / `AnalyticsHistoryEntry` | Analytics update audit trail |
| `PaperHistory` / `PaperHistoryEntry` | Paper trading audit trail |

### Session Abstractions (`lib/persistence/sessions.ts`)

| Type | Description |
|---|---|
| `TradingSession` | Trading day/period session |
| `AISession` | AI analysis/decision session |
| `PaperTradingSession` | Paper trading practice session |
| `TestingSession` | Testing/validation session |
| `ValidationSession` | Signal/strategy validation session |
| `TradingViewTestingSession` | TradingView comparison session (optional) |
| `TradingViewSession` | Phase 7 spec alias → `TradingViewTestingSession` |
| `OmegaSession` | Union of all session types |

### Cache Abstractions (`lib/persistence/cache.ts`)

| Type | Description |
|---|---|
| `MarketCache` | Market data cache |
| `PortfolioCache` | Portfolio state cache |
| `KnowledgeCache` | Knowledge document cache |
| `AnalyticsCache` | Analytics data cache |
| `AIStateCache` | AI brain state cache |
| `SignalCache` | Trade signal cache |

### Domain-Specific Repository Contracts (`lib/persistence/repositories.ts`)

| Interface | Description |
|---|---|
| `SignalRepository` | Trade signal CRUD + domain queries |
| `TradeRepository` | Trade lifecycle management |
| `OrderRepository` | Order lifecycle management |
| `PositionRepository` | Open position management |
| `StrategyRepository` | Strategy management |
| `KnowledgeRepository` | Knowledge document management |
| `PaperTradingRepository` | Paper trading state management |
| `PortfolioRepository` | Portfolio state management |
| `AnalyticsRepository` | Analytics data management |
| `AIRepository` | AI brain state management |
| `EventRepository` | Event history management |
| `MarketRepository` | Market data management |
| `NewsRepository` | News event management |
| `TradingViewRepository` | TradingView testing data (optional) |

### TradingView Persistence Contracts (`lib/persistence/tradingview.ts`)

| Interface/Type | Description |
|---|---|
| `TVSignalHistory` / `TVSignalHistoryEntry` | TradingView signal comparison history |
| `TVAlertHistory` / `TVAlertHistoryEntry` | TradingView alert history |
| `TVValidationHistory` / `TVValidationHistoryEntry` | TradingView validation history |
| `TVPaperComparison` / `TVPaperComparisonEntry` | Paper trading vs TradingView comparison |
| `TVTestingSession` | TradingView testing session |
| `TVPersistenceRepository` | TradingView persistence repository interface |

---

## 4. Domain Models (`lib/domains/`)

Typed domain models for all major OMEGA domains. These are the authoritative type definitions.

| Domain | File | Key Types |
|---|---|---|
| Market | `lib/domains/market.ts` | Market domain models and state machines |
| Trading | `lib/domains/trading.ts` | Signal, Trade, Order domain models |
| Portfolio | `lib/domains/portfolio.ts` | Portfolio, Position domain models |
| Strategy | `lib/domains/strategy.ts` | Strategy domain models |
| Paper Trading | `lib/domains/paper-trading.ts` | Paper trading domain models |
| AI | `lib/domains/ai.ts` | AI brain domain models |
| Knowledge | `lib/domains/knowledge.ts` | Knowledge document domain models |
| Analytics | `lib/domains/analytics.ts` | Analytics domain models |
| TradingView Testing | `lib/domains/tradingview-testing.ts` | TradingView testing domain models |

---

## 5. Shared Types (`lib/types/index.ts`)

Core shared TypeScript interfaces used across all layers.

Key types: `MarketAsset`, `TradeSignal`, `Portfolio`, `Position`, `Strategy`, `NewsEvent`, `AIBrain`, `KnowledgeDocument`, `DashboardMetric`, `ModuleDefinition`, `SystemStatus`, `AnalyticsGroup`, `TradingViewTestingSummary`, `FeatureFlagName`, `OmegaIcon`, `ModuleStatus`, `SystemHealthState`, `MetricTone`.

---

## 6. Event System (`lib/events.ts`)

All significant events are typed and published through `OmegaEventBus`. See `lib/events.ts` for the full `OmegaEventType` union and event payload types.

### Event Categories

| Category | Events |
|---|---|
| Market | `market.update` |
| Trading | `signal.created`, `paper.trade.opened`, `paper.trade.closed` |
| Portfolio | `portfolio.updated` |
| News | `news.received` |
| Strategy | `strategy.updated` |
| AI | `ai.state.changed` |
| TradingView (optional) | `tradingview.connected`, `tradingview.disconnected`, `tradingview.watchlist.updated`, `tradingview.chart.updated`, `tradingview.validation.completed`, `tradingview.alert.triggered` |
| Persistence | `persistence.snapshot.created`, `persistence.entity.archived`, `persistence.entity.restored` |
| Session | `session.started`, `session.paused`, `session.resumed`, `session.completed`, `session.cancelled` |
| Cache | `cache.invalidated`, `cache.refreshed` |

---

## 7. Feature Flag Surface (`lib/feature-flags.ts`)

All feature flags are defined in `lib/feature-flags.ts` and typed in `lib/types/index.ts` as `FeatureFlagName`.

| Flag | Default | Gates |
|---|---|---|
| `ENABLE_MARKETS` | `true` | Market Watch module |
| `ENABLE_AI` | `true` | AI Brain module |
| `ENABLE_KNOWLEDGE` | `true` | Knowledge Center module |
| `ENABLE_STRATEGIES` | `true` | Strategy Lab module |
| `ENABLE_BACKTEST` | `true` | Backtesting module |
| `ENABLE_PAPER` | `true` | Paper Trading module |
| `ENABLE_PORTFOLIO` | `true` | Portfolio module |
| `ENABLE_TRADES` | `true` | Trade Center module |
| `ENABLE_ANALYTICS` | `true` | Analytics module |
| `ENABLE_CHAT` | `true` | AI Chat module |
| `ENABLE_NEWS` | `true` | News Intelligence module |
| `ENABLE_ADMIN` | `true` | Admin module |
| `ENABLE_SETTINGS` | `true` | Settings module |
| `ENABLE_TRADINGVIEW` | `false` | TradingView Foundation module (umbrella) |
| `ENABLE_TRADINGVIEW_CHARTS` | `false` | TradingView chart integration (granular) |
| `ENABLE_TRADINGVIEW_WATCHLISTS` | `false` | TradingView watchlist sync (granular) |
| `ENABLE_TRADINGVIEW_VALIDATION` | `false` | TradingView signal validation (granular) |
| `ENABLE_PERSISTENCE` | `true` | Persistence layer |
| `ENABLE_CACHE` | `true` | Caching layer |
| `ENABLE_SESSIONS` | `true` | Session management |
| `ENABLE_REPOSITORIES` | `true` | Domain-specific Repository<T> contracts |
| `ENABLE_HISTORY` | `true` | Domain-specific history/audit-trail models |
| `ENABLE_SNAPSHOTS` | `true` | Domain-specific snapshot contracts |

Helper functions: `isFeatureEnabled()`, `isTradingViewEnabled()`, `isPersistenceEnabled()`, `isCacheEnabled()`, `isSessionsEnabled()`, `isRepositoriesEnabled()`, `isHistoryEnabled()`, `isSnapshotsEnabled()`.

---

## 8. Frontend API Contracts (`api/`)

Frontend API contract files. These are replaceable boundaries — not backend routes.

| File | Description |
|---|---|
| `api/market.ts` | Market data contract |
| `api/portfolio.ts` | Portfolio contract |
| `api/news.ts` | News contract |
| `api/knowledge.ts` | Knowledge contract |
| `api/strategy.ts` | Strategy contract |
| `api/paperTrading.ts` | Paper trading contract |
| `api/analytics.ts` | Analytics contract |
| `api/ai.ts` | AI contract |
| `api/system.ts` | System/dashboard contract |
| `api/tradingViewTesting.ts` | TradingView testing contract |

---

## 9. Module Registry (`lib/mock/modules.ts`)

The OMEGA module registry is the authoritative list of all platform modules. Each module declares its `id`, `featureFlag`, `pageRoute`, `status`, `version`, `dependencies`, and `futureDependencies`.

See `lib/mock/modules.ts` for the full registry. See `lib/modules.ts` for `getModuleById()`.

---

## References

- [OMEGA_CONSTITUTION.md](OMEGA_CONSTITUTION.md) — Mission, philosophy, constraints
- [ENGINEERING_RULES.md](ENGINEERING_RULES.md) — Numbered engineering rules
- [ARCHITECTURE_DECISIONS.md](ARCHITECTURE_DECISIONS.md) — ADR log
- [NEXT_PHASE.md](NEXT_PHASE.md) — Current phase status and next phase planning
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Architecture diagrams and layer descriptions
