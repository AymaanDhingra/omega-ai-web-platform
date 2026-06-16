import { OmegaIconView } from "../../lib/utils/icons";

export function SharedHeader() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-mint">
          <span className="h-2 w-2 rounded-full bg-mint" />
          AI Online
        </span>
        <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-2.5 py-1 text-xs font-semibold text-zinc-600">
          <OmegaIconView icon="cloud" className="h-3.5 w-3.5" />
          Data: Mock
        </span>
        <span className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-semibold text-ember">
          <OmegaIconView icon="lock" className="h-3.5 w-3.5" />
          Live Trading Locked
        </span>
      </div>
    </header>
  );
}
