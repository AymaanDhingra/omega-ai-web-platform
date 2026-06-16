# OMEGA AI — Architecture Decision Records

> ADR log for the OMEGA AI Web Platform. Each decision is recorded with its context, rationale, and consequences. See [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) for the contract surface and [ENGINEERING_RULES.md](ENGINEERING_RULES.md) for the rules that flow from these decisions.

Last updated: 2026-06-16

---

## ADR-0001 — Mock-First Development

**Date:** 2026-06-16  
**Status:** Accepted

### Context

OMEGA AI is a complex multi-domain platform. Real integrations (brokers, exchanges, AI providers, market data, databases) require credentials, infrastructure, and significant implementation effort. Building against real systems from the start would block frontend development and make testing fragile.

### Decision

All implementations start as mock. Mock implementations use realistic, typed data. The mock is the first-class citizen — not a temporary placeholder. Real integrations are added later, behind the same interface, without changing the contract.

### Consequences

- Frontend development proceeds independently of backend readiness.
- Tests are fast, deterministic, and require no external services.
- The mock is the canonical reference for what the real implementation must do.
- Real integrations are always additive — they never break existing callers.

---

## ADR-0002 — Adapter Pattern with Mock Canonical

**Date:** 2026-06-16  
**Status:** Accepted

### Context

The platform needs to support multiple data sources (mock, HTTP, future broker/exchange APIs) without coupling the UI or business logic to any specific source.

### Decision

All data access goes through typed adapter interfaces. The mock adapter is the canonical implementation. HTTP adapters are shells that implement the same interface. The adapter is selected by configuration (feature flags, provider config), not by the caller.

The data path is: `Page → api/*.ts → adapters/* → services/* → lib/mock/*`.

### Consequences

- Swapping from mock to real data requires only changing the adapter — no UI changes.
- HTTP adapters must implement the exact same interface as their mock counterpart (Phase 6A alignment rule).
- No method may be added to an HTTP adapter that does not exist on the mock adapter.
- See [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) for the full adapter surface.

---

## ADR-0003 — Feature-Flagged Modules

**Date:** 2026-06-16  
**Status:** Accepted

### Context

Different modules have different readiness levels. Some are active, some are mock, some are planned. The UI must not break when a module is disabled or not yet implemented.

### Decision

Every module is gated by a feature flag in `lib/feature-flags.ts`. `ModulePage` checks the flag before rendering module content. If the flag is disabled, an `EmptyState` is rendered — never an error, never a crash.

Feature flags are typed as `FeatureFlagName` in `lib/types/index.ts`. The `FEATURE_FLAGS` record is the single source of truth for default values.

### Consequences

- Modules can be enabled/disabled without code changes.
- New modules start disabled by default and are enabled when ready.
- TradingView flags default to `false` — OMEGA functions without TradingView.
- Tests can toggle flags using `__setFeatureFlagForTest()` with try/finally cleanup.

---

## ADR-0004 — Frontend API Contracts as Replaceable Boundary (Phase 4)

**Date:** 2026-06-16  
**Status:** Accepted

### Context

The frontend needs a stable API surface that can be backed by mock data today and real backend APIs tomorrow, without changing the UI code.

### Decision

Frontend API contracts live in `api/*.ts`. These are not backend routes — they are typed function collections that currently delegate to adapters. When a real backend exists, the adapter is swapped; the `api/*.ts` contract remains unchanged.

### Consequences

- UI components never call services or mock data directly.
- The `api/*.ts` layer is the only boundary the UI crosses.
- Backend integration requires only adapter changes, not UI changes.
- See `api/` for all current contract files.

---

## ADR-0005 — HTTP Adapter Shells Aligned to Mock Interfaces (Phase 6A)

**Date:** 2026-06-16  
**Status:** Accepted

### Context

Phase 6 added HTTP adapter shells, but they were not aligned to the mock adapter interfaces. This created a risk that future HTTP implementations would diverge from the canonical contract.

### Decision

All HTTP adapter shells must implement the exact same interface as their mock counterpart. This was enforced in Phase 6A Stabilization. The rule is: if a method exists on the mock adapter, it must exist on the HTTP adapter with the same signature. If a method is added to the mock adapter, it must be added to the HTTP adapter.

### Consequences

- HTTP adapters are always drop-in replacements for mock adapters.
- No method drift between mock and HTTP implementations.
- The mock adapter is the source of truth for the contract.
- See [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) for the full adapter surface.

---

## ADR-0006 — Persistence as Contracts-Only with Repository<T>/Cache<T>/Snapshot/Session (Phase 7)

**Date:** 2026-06-16  
**Status:** Accepted

### Context

OMEGA needs a persistence layer for future backend integration. However, no real database is connected yet. The persistence contracts must be defined before the implementation so that future database adapters can be added without changing the domain code.

### Decision

Phase 7 introduces a contracts-only persistence layer in `lib/persistence/`. The generic `Repository<T>` interface defines CRUD, search, archive, and snapshot operations. `MockRepository<T>` provides an in-memory implementation. Domain-specific repository contracts extend `Repository<T>`. `Cache<T>`, `Session`, and `Snapshot<T>` follow the same pattern.

No real database, no real persistence, no real network calls. All implementations are mock-only.

### Consequences

- Future database adapters implement `Repository<T>` — no domain code changes required.
- The persistence layer is feature-flagged (`ENABLE_PERSISTENCE`, `ENABLE_CACHE`, `ENABLE_SESSIONS`, `ENABLE_REPOSITORIES`, `ENABLE_HISTORY`, `ENABLE_SNAPSHOTS`).
- `MockRepository<T>` is the canonical reference for what a real repository must do.
- See `lib/persistence/` for all contracts and `lib/persistence/index.ts` for exports.

---

## ADR-0007 — TradingView is Optional and Feature-Flagged; OMEGA Must Function Without It

**Date:** 2026-06-16  
**Status:** Accepted

### Context

TradingView is a third-party charting platform. OMEGA may use it for signal validation and chart visualization in the future, but it must never be a hard dependency. Users who do not have TradingView access must be able to use OMEGA fully.

### Decision

All TradingView integration is behind feature flags (`ENABLE_TRADINGVIEW`, `ENABLE_TRADINGVIEW_CHARTS`, `ENABLE_TRADINGVIEW_WATCHLISTS`, `ENABLE_TRADINGVIEW_VALIDATION`). All TradingView flags default to `false`. `isTradingViewEnabled()` returns `true` only when at least one TradingView flag is enabled.

No real TradingView widget, script tag, iframe to tradingview.com, or credential field is ever added to the codebase. TradingView components render an `EmptyState` when disabled — never an error, never a crash.

Phase 7 adds a TradingView Foundation module (`TradingViewFoundationModule`) as a mock-only placeholder, distinct from the existing `TradingViewTestingModule` (Phase 3). Both are feature-flagged and render gracefully when disabled.

### Consequences

- OMEGA functions completely without TradingView.
- TradingView integration is always additive — it never breaks existing functionality.
- The `ENABLE_TRADINGVIEW` umbrella flag gates the Foundation module; granular flags remain for backward compatibility.
- Real TradingView integration is deferred to Phase 9A (TradingView Validation).
- See [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) for TradingView contract surfaces.

---

## Adding New ADRs

When a significant architectural decision is made, add a new ADR following this template:

```markdown
## ADR-XXXX — Title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-YYYY

### Context

Why is this decision needed?

### Decision

What was decided?

### Consequences

What are the trade-offs and implications?
```

Status values:
- **Proposed** — Under discussion
- **Accepted** — Decision made and implemented
- **Deprecated** — No longer relevant
- **Superseded by ADR-XXXX** — Replaced by a newer decision

---

## References

- [OMEGA_CONSTITUTION.md](OMEGA_CONSTITUTION.md) — Mission and philosophy
- [CANONICAL_CONTRACTS.md](CANONICAL_CONTRACTS.md) — All canonical contract surfaces
- [ENGINEERING_RULES.md](ENGINEERING_RULES.md) — Numbered engineering rules
- [NEXT_PHASE.md](NEXT_PHASE.md) — Current phase status
