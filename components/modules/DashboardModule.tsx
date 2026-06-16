import type { DashboardMetric, Portfolio, SystemStatus } from "../../lib/types";
import { CandlestickPanel } from "../dashboard/CandlestickPanel";
import { MetricCard } from "../dashboard/MetricCard";
import { SystemHealth } from "../dashboard/SystemHealth";
import { Panel } from "../layout/Panel";
import { SectionHeader } from "../layout/SectionHeader";
import { PortfolioCard } from "../portfolio/PortfolioCard";

export function DashboardModule({
  metrics,
  candles,
  systemStatuses,
  portfolio
}: {
  metrics: DashboardMetric[];
  candles: [number, number, number, number][];
  systemStatuses: SystemStatus[];
  portfolio: Portfolio;
}) {
  return (
    <div className="space-y-4">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Panel>
          <SectionHeader icon="candles" title="Market Regime" meta="Mock context" />
          <div className="mt-4 h-[194px] rounded-lg border border-line bg-white p-2">
            <CandlestickPanel candles={candles} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="border-t border-line pt-3">
              <p className="text-xs text-zinc-500">Regime</p>
              <p className="mt-1 font-semibold">Risk-on expansion</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="text-xs text-zinc-500">Volatility</p>
              <p className="mt-1 font-semibold">Moderate, rising</p>
            </div>
            <div className="border-t border-line pt-3">
              <p className="text-xs text-zinc-500">Strategy Bias</p>
              <p className="mt-1 font-semibold">Breakout + trend</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <SystemHealth statuses={systemStatuses} />
        </Panel>
      </section>
      <section>
        <Panel id="portfolio">
          <PortfolioCard portfolio={portfolio} />
        </Panel>
      </section>
    </div>
  );
}
