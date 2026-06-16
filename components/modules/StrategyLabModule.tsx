import type { Strategy } from "../../lib/types";

export function StrategyLabModule({ strategies }: { strategies: Strategy[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {strategies.map((strategy) => (
        <article key={strategy.id} className="rounded-lg border border-line bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="min-w-0 truncate text-sm font-semibold">{strategy.name}</p>
            <span className="shrink-0 rounded-md bg-field px-2 py-1 text-xs font-semibold">{strategy.status}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-zinc-500">Regime</p>
              <p className="font-semibold">{strategy.regime}</p>
            </div>
            <div>
              <p className="text-zinc-500">Expectancy</p>
              <p className="font-semibold text-mint">{strategy.expectancy}</p>
            </div>
            <div>
              <p className="text-zinc-500">DD</p>
              <p className="font-semibold">{strategy.drawdown}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
