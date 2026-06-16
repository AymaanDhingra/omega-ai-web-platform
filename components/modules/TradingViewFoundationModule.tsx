/**
 * TradingView Foundation Module
 *
 * Phase 7 Completion Pass — mock-only placeholder for the TradingView
 * Foundation layer. Distinct from TradingViewTestingModule (Phase 3).
 *
 * CRITICAL CONSTRAINTS:
 * - No real TradingView widget, script tag, or iframe to tradingview.com.
 * - No network calls, no credentials, no real data.
 * - Feature-flagged: renders EmptyState when isTradingViewEnabled() is false.
 * - Pure render of mock data only.
 *
 * OMEGA Constitution: TradingView remains OPTIONAL.
 */
import { isTradingViewEnabled } from "../../lib/feature-flags";
import type { TradingViewFoundationMockState } from "../../lib/mock/tradingview-contracts";
import { EmptyState } from "../layout/EmptyState";
import { SystemStatusBadge } from "../layout/StatusBadge";

// ---------------------------------------------------------------------------
// Sub-section: Chart Placeholder
// ---------------------------------------------------------------------------
function ChartPlaceholder({ symbol, timeframe }: { symbol: string; timeframe: string }) {
  return (
    <div className="rounded-lg border border-line bg-field p-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Chart Placeholder — Non-Interactive
      </p>
      <div className="mt-4 flex h-40 items-center justify-center rounded-md border border-dashed border-zinc-300 bg-white">
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-700">{symbol}</p>
          <p className="mt-1 text-xs text-zinc-500">{timeframe} · Mock chart area</p>
          <p className="mt-2 text-xs text-zinc-400">
            No real TradingView widget — placeholder only
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-section: Symbol Synchronization
// ---------------------------------------------------------------------------
function SymbolSync({
  currentSymbol,
  availableSymbols
}: {
  currentSymbol: string;
  availableSymbols: string[];
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold">Symbol Synchronization</p>
      <p className="mt-1 text-xs text-zinc-500">
        Mock current symbol — symbol picker stub (no real sync)
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {availableSymbols.map((sym) => (
          <span
            key={sym}
            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
              sym === currentSymbol
                ? "bg-teal text-white"
                : "bg-field text-zinc-600"
            }`}
          >
            {sym}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        Active: <span className="font-semibold">{currentSymbol}</span> · Mock contract only
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-section: Timeframe Synchronization
// ---------------------------------------------------------------------------
function TimeframeSync({
  currentTimeframe,
  availableTimeframes
}: {
  currentTimeframe: string;
  availableTimeframes: string[];
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold">Timeframe Synchronization</p>
      <p className="mt-1 text-xs text-zinc-500">Mock current timeframe (no real sync)</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {availableTimeframes.map((tf) => (
          <span
            key={tf}
            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
              tf === currentTimeframe
                ? "bg-teal text-white"
                : "bg-field text-zinc-600"
            }`}
          >
            {tf}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        Active: <span className="font-semibold">{currentTimeframe}</span> · Mock contract only
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-section: Watchlists Panel
// ---------------------------------------------------------------------------
function WatchlistsPanel({ symbols }: { symbols: string[] }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold">Watchlists Panel</p>
      <p className="mt-1 text-xs text-zinc-500">
        Mock watchlist fixture — no real TradingView watchlist sync
      </p>
      <ul className="mt-3 space-y-1">
        {symbols.map((sym) => (
          <li
            key={sym}
            className="flex items-center justify-between rounded-md bg-field px-3 py-1.5 text-xs"
          >
            <span className="font-semibold">{sym}</span>
            <span className="text-zinc-400">Mock</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-section: Status Panel
// ---------------------------------------------------------------------------
function StatusPanel({
  chartStatus,
  connectionStatus,
  validationStatus,
  testingStatus
}: Pick<
  TradingViewFoundationMockState,
  "chartStatus" | "connectionStatus" | "validationStatus" | "testingStatus"
>) {
  const statuses = [
    { label: "Chart Status", state: chartStatus },
    { label: "Connection Status", state: connectionStatus },
    { label: "Validation Status", state: validationStatus },
    { label: "Testing Status", state: testingStatus }
  ] as const;

  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <p className="text-sm font-semibold">Status Overview</p>
      <p className="mt-1 text-xs text-zinc-500">
        All statuses are mock — no real TradingView connection
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {statuses.map(({ label, state }) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md bg-field px-3 py-2"
          >
            <span className="text-xs font-semibold">{label}</span>
            <SystemStatusBadge state={state} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function TradingViewFoundationModule({
  state
}: {
  state: TradingViewFoundationMockState;
}) {
  // Feature-flag gate: if TradingView is disabled, render EmptyState.
  // NEVER throw, NEVER break the page.
  if (!isTradingViewEnabled()) {
    return (
      <EmptyState
        title="TradingView Foundation — Optional Feature"
        message="TradingView integration is optional and currently disabled. OMEGA functions fully without it. Enable ENABLE_TRADINGVIEW in feature flags to activate this module."
        icon="plug"
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Dashboard placeholder header */}
      <div className="rounded-lg border border-line bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">TradingView Foundation</p>
            <p className="mt-1 text-sm leading-6 text-zinc-600">
              Phase 7 foundation layer — mock-only placeholders for future TradingView
              integration. No real widget, no real connection, no credentials.
            </p>
          </div>
          <SystemStatusBadge state="Mock" />
        </div>
      </div>

      {/* Embedded chart placeholder */}
      <ChartPlaceholder
        symbol={state.currentSymbol}
        timeframe={state.currentTimeframe}
      />

      {/* Symbol + Timeframe synchronization */}
      <div className="grid gap-4 md:grid-cols-2">
        <SymbolSync
          currentSymbol={state.currentSymbol}
          availableSymbols={state.availableSymbols}
        />
        <TimeframeSync
          currentTimeframe={state.currentTimeframe}
          availableTimeframes={state.availableTimeframes}
        />
      </div>

      {/* Watchlists panel */}
      <WatchlistsPanel symbols={state.watchlistSymbols} />

      {/* Status panel */}
      <StatusPanel
        chartStatus={state.chartStatus}
        connectionStatus={state.connectionStatus}
        validationStatus={state.validationStatus}
        testingStatus={state.testingStatus}
      />
    </div>
  );
}
