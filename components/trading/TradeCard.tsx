import { AlertTriangle } from "lucide-react";
import type { TradeSignal } from "../../lib/types";

export function TradeCard({ signal }: { signal: TradeSignal }) {
  return (
    <article className="border-t border-line pt-4 first:border-t-0 first:pt-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {signal.symbol} <span className={signal.direction === "Long" ? "text-mint" : "text-ember"}>{signal.direction}</span>
          </p>
          <p className="truncate text-xs text-zinc-500">{signal.market}</p>
        </div>
        <span className="rounded-md bg-field px-2 py-1 text-xs font-semibold">{signal.expectedValue}</span>
      </div>
      <div className="mt-3 grid gap-2 text-xs sm:grid-cols-3">
        <div>
          <p className="text-zinc-500">Entry</p>
          <p className="font-semibold">{signal.entry}</p>
        </div>
        <div>
          <p className="text-zinc-500">Stop</p>
          <p className="font-semibold">{signal.stop}</p>
        </div>
        <div>
          <p className="text-zinc-500">Targets</p>
          <p className="font-semibold">{signal.targets}</p>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-zinc-600">{signal.reasoning}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-amber">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0">{signal.risk}</span>
      </div>
    </article>
  );
}
