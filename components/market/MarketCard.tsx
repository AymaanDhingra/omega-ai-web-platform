import type { MarketAsset } from "../../lib/types";
import { percentColor, signalClasses } from "../../lib/utils/styles";

export function MarketCard({ market }: { market: MarketAsset }) {
  return (
    <article className="min-w-0 rounded-lg border border-line bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${market.change >= 0 ? "bg-mint" : "bg-ember"}`} />
            <p className="truncate text-sm font-semibold">{market.symbol}</p>
          </div>
          <p className="mt-1 text-xs text-zinc-500">{market.group}</p>
        </div>
        <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-semibold ${signalClasses(market.signal)}`}>{market.signal}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-zinc-500">Price</p>
          <p className="font-semibold">{market.price}</p>
        </div>
        <div>
          <p className="text-zinc-500">Volume</p>
          <p className="font-semibold">{market.volume}</p>
        </div>
        <div>
          <p className="text-zinc-500">Support</p>
          <p className="font-semibold">{market.support}</p>
        </div>
        <div>
          <p className="text-zinc-500">Resistance</p>
          <p className="font-semibold">{market.resistance}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-zinc-500">{market.trend}</span>
          <span className="font-semibold">{market.confidence}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-field">
          <div className={`h-full rounded-full ${percentColor(market.confidence)}`} style={{ width: `${market.confidence}%` }} />
        </div>
      </div>
    </article>
  );
}
