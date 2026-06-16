import Image from "next/image";
import type { AIBrain } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";
import { percentColor } from "../../lib/utils/styles";
import { SectionHeader } from "../layout/SectionHeader";

export function AIStatusCard({ aiBrain, mode }: { aiBrain: AIBrain; mode: string }) {
  return (
    <div className="overflow-hidden">
      <SectionHeader icon="brain" title="AI Brain" meta={mode} />
      <div className="relative mt-4 h-[194px] overflow-hidden rounded-lg border border-line bg-ink">
        <Image src="/assets/omega-brain.png" alt="" fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{aiBrain.name}</p>
            <p className="truncate text-xs text-white/75">Trend, momentum, liquidity, regime</p>
          </div>
          <span className="shrink-0 rounded-md bg-white/15 px-2 py-1 text-xs font-semibold backdrop-blur">{aiBrain.confidence}%</span>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {aiBrain.states.map((state) => {
          return (
            <div key={state.id} className="grid grid-cols-[28px_1fr_52px] items-center gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-field text-teal">
                <OmegaIconView icon={state.icon} className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-sm font-medium">{state.label}</span>
                  <span className="shrink-0 text-xs text-zinc-500">{state.status}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-field">
                  <div className={`h-full rounded-full ${percentColor(state.value)}`} style={{ width: `${Math.max(state.value, 5)}%` }} />
                </div>
              </div>
              <span className="text-right text-sm font-semibold">{state.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
