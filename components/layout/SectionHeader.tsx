import type { OmegaIcon } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";

export function SectionHeader({ icon, title, meta }: { icon: OmegaIcon; title: string; meta?: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-teal">
          <OmegaIconView icon={icon} className="h-4 w-4" />
        </span>
        <h2 className="truncate text-base font-semibold text-ink">{title}</h2>
      </div>
      {meta ? <span className="shrink-0 text-xs font-medium text-zinc-500">{meta}</span> : null}
    </div>
  );
}
