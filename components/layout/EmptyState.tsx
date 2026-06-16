import type { OmegaIcon } from "../../lib/types";
import { OmegaIconView } from "../../lib/utils/icons";

export function EmptyState({ title, message, icon = "database" }: { title: string; message: string; icon?: OmegaIcon }) {
  return (
    <div className="rounded-lg border border-line bg-panel p-6 text-center shadow-panel">
      <span className="mx-auto grid h-10 w-10 place-items-center rounded-lg bg-field text-teal">
        <OmegaIconView icon={icon} className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-600">{message}</p>
    </div>
  );
}
