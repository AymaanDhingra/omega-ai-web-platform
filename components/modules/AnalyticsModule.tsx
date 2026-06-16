import type { AnalyticsGroup, TradingViewTestingSummary } from "../../lib/types";
import { TradingViewTestingModule } from "./TradingViewTestingModule";

export function AnalyticsModule({ groups, tradingViewTesting }: { groups: AnalyticsGroup[]; tradingViewTesting: TradingViewTestingSummary }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-2">
        {groups.map((group) => (
          <article key={group.id} className="rounded-lg border border-line bg-panel p-4">
            <p className="font-semibold">{group.title}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">{group.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.metrics.map((metric) => (
                <div key={metric.id} className="rounded-lg border border-line bg-white p-3">
                  <p className="text-xs text-zinc-500">{metric.label}</p>
                  <p className="mt-1 text-lg font-semibold">{metric.value}</p>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{metric.description}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <TradingViewTestingModule summary={tradingViewTesting} />
    </div>
  );
}
