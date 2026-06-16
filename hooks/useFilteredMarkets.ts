"use client";

import { useMemo } from "react";
import type { MarketAsset, MarketGroup } from "../lib/types";

export function useFilteredMarkets(markets: MarketAsset[], group: MarketGroup) {
  return useMemo(() => {
    return group === "All" ? markets : markets.filter((market) => market.group === group);
  }, [group, markets]);
}
