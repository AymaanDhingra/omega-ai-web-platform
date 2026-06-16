import type { TradeSignal } from "../../lib/types";
import { TradeCard } from "../trading/TradeCard";

export function TradeCenterModule({ signals }: { signals: TradeSignal[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {signals.map((signal) => (
        <div key={signal.id} className="rounded-lg border border-line bg-panel p-4">
          <TradeCard signal={signal} />
        </div>
      ))}
    </div>
  );
}
