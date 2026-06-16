import type { PaperTrade, PaperTradingValidation } from "../../lib/types";
import { Sparkline } from "../dashboard/Sparkline";

export function PaperTradingModule({
  trades,
  curve,
  validations
}: {
  trades: PaperTrade[];
  curve: number[];
  validations: PaperTradingValidation[];
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-line bg-panel p-4">
        <div className="h-[160px] rounded-lg border border-line bg-white p-3">
          <Sparkline data={curve} stroke="#0f766e" fill />
        </div>
        <div className="mt-4 space-y-3">
          {trades.map((trade) => (
            <div key={trade.id} className="grid grid-cols-[1fr_auto] gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0 text-sm">
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {trade.symbol} <span className="text-xs text-zinc-500">{trade.side}</span>
                </p>
                <p className="text-xs text-zinc-500">MAE {trade.mae} / MFE {trade.mfe}</p>
              </div>
              <span className={trade.pnl.startsWith("+") ? "font-semibold text-mint" : "font-semibold text-ember"}>{trade.pnl}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-3">
        {validations.map((validation) => (
          <article key={validation.id} className="rounded-lg border border-line bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{validation.label}</p>
              <span className="rounded-md bg-field px-2 py-1 text-xs font-semibold">{validation.result}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{validation.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
