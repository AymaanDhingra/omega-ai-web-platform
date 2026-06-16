"use client";

import { useState } from "react";
import type { AIBrain, TradingMode } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";
import { AIStatusCard } from "../ai/AIStatusCard";
import { Panel } from "../layout/Panel";

export function AIBrainModule({ aiBrain, tradingModes }: { aiBrain: AIBrain; tradingModes: TradingMode[] }) {
  const [mode, setMode] = useState("Analysis");

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
      <Panel id="brain">
        <AIStatusCard aiBrain={aiBrain} mode={mode} />
      </Panel>
      <Panel>
        <div className="flex max-w-full flex-wrap gap-2">
          {tradingModes.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={!item.available}
              onClick={() => item.available && setMode(item.label)}
              className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition ${
                mode === item.label ? "bg-ink text-white" : "border border-line bg-white text-zinc-600 hover:bg-field"
              } ${!item.available ? "cursor-not-allowed opacity-45" : ""}`}
              title={item.available ? item.label : `${item.label} locked`}
            >
              <OmegaIconView icon={item.icon} className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {aiBrain.capabilities.map((capability) => (
            <article key={capability} className="rounded-lg border border-line bg-white p-3 text-sm font-semibold">
              {capability}
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
