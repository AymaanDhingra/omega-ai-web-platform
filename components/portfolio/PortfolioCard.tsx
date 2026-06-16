import type { Portfolio } from "../../lib/types";
import { Sparkline } from "../dashboard/Sparkline";
import { SectionHeader } from "../layout/SectionHeader";

export function PortfolioCard({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div id="portfolio">
      <SectionHeader icon="layers" title="Portfolio" meta={portfolio.currency} />
      <div className="mt-4 h-[134px] rounded-lg border border-line bg-white p-3">
        <Sparkline data={portfolio.equityCurve} stroke="#2f9e72" fill />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        {portfolio.allocation.map((item) => (
          <div key={item.label} className="border-t border-line pt-2 first:border-t-0 [&:nth-child(2)]:border-t-0 [&:nth-child(2)]:pt-0">
            <p className="truncate text-xs text-zinc-500">{item.label}</p>
            <p className="mt-1 font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
