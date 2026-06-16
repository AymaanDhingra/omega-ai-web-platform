import type { TradingViewTestingSummary } from "../../lib/types";
import { SystemStatusBadge } from "../layout/StatusBadge";

export function TradingViewTestingModule({ summary }: { summary: TradingViewTestingSummary }) {
  return (
    <div className="space-y-4">
      <article className="rounded-lg border border-line bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">TradingView Testing Status</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{summary.status.description}</p>
          </div>
          <SystemStatusBadge state={summary.status.state} />
        </div>
      </article>
      <div className="grid gap-3 md:grid-cols-3">
        {summary.testingStatuses.map((status) => (
          <article key={status.id} className="rounded-lg border border-line bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{status.label}</p>
              <SystemStatusBadge state={status.state} />
            </div>
            <p className="mt-2 text-xs text-zinc-500">{status.lastRun}</p>
          </article>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {summary.signalComparisons.map((comparison) => (
          <article key={comparison.id} className="rounded-lg border border-line bg-white p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{comparison.symbol}</p>
              <span className="rounded-md bg-field px-2 py-1 text-xs font-semibold">{comparison.alignment}</span>
            </div>
            <p className="mt-2 text-zinc-600">OMEGA {comparison.omegaSignal} / Testing {comparison.testingSignal}</p>
            <p className="mt-1 text-xs text-zinc-500">{comparison.notes}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
