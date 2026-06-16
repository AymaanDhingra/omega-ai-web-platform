import type { Portfolio } from "../../lib/types";
import { PortfolioCard } from "../portfolio/PortfolioCard";

export function PortfolioModule({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-lg border border-line bg-panel p-4">
        <PortfolioCard portfolio={portfolio} />
      </div>
      <div className="rounded-lg border border-line bg-panel p-4">
        <p className="text-sm font-semibold">Open Positions</p>
        <div className="mt-4 space-y-3">
          {portfolio.positions.map((position) => (
            <div key={position.id} className="grid gap-3 rounded-lg border border-line bg-white p-3 text-sm md:grid-cols-[1fr_1fr_1fr_auto]">
              <div>
                <p className="font-semibold">{position.symbol}</p>
                <p className="text-xs text-zinc-500">{position.market}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Side / Qty</p>
                <p className="font-semibold">{position.side} {position.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Exposure</p>
                <p className="font-semibold">{position.exposure}</p>
              </div>
              <p className={position.pnl.startsWith("+") ? "font-semibold text-mint" : "font-semibold text-ember"}>{position.pnl}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
