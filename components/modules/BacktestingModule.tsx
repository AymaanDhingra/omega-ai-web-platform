import type { BacktestMetric, Portfolio } from "../../lib/types";
import { Sparkline } from "../dashboard/Sparkline";

export function BacktestingModule({ metrics, portfolio }: { metrics: BacktestMetric[]; portfolio: Portfolio }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div className="h-[240px] rounded-lg border border-line bg-white p-3">
        <Sparkline data={portfolio.equityCurve} stroke="#2f9e72" fill />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        {metrics.map((metric) => (
          <div key={metric.id} className="rounded-lg border border-line bg-white p-3">
            <p className="text-xs text-zinc-500">{metric.label}</p>
            <p className="mt-1 font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
