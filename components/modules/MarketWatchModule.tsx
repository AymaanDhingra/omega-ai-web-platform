"use client";

import { useState } from "react";
import { useFilteredMarkets } from "../../hooks/useFilteredMarkets";
import { marketGroups } from "../../lib/mock/market";
import type { MarketAsset, MarketGroup } from "../../lib/types";
import { MarketCard } from "../market/MarketCard";

export function MarketWatchModule({ markets }: { markets: MarketAsset[] }) {
  const [marketGroup, setMarketGroup] = useState<MarketGroup>("All");
  const visibleMarkets = useFilteredMarkets(markets, marketGroup);

  return (
    <div>
      <div className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-line bg-white p-1">
        {marketGroups.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => setMarketGroup(group)}
            className={`h-8 shrink-0 rounded-md px-3 text-xs font-semibold ${marketGroup === group ? "bg-ink text-white" : "text-zinc-600 hover:bg-field"}`}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {visibleMarkets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}
