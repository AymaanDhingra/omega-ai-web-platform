import type { SystemStatus } from "../../lib/types";
import { systemStatusClasses } from "../../lib/utils/styles";
import { SectionHeader } from "../layout/SectionHeader";

export function SystemHealth({ statuses }: { statuses: SystemStatus[] }) {
  return (
    <div>
      <SectionHeader icon="shield" title="System Health" meta="Mock readiness" />
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {statuses.map((status) => (
          <article key={status.id} className="rounded-lg border border-line bg-white p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{status.name}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{status.description}</p>
              </div>
              <span className={`shrink-0 rounded-md border px-2 py-1 text-xs font-semibold ${systemStatusClasses(status.state)}`}>{status.state}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
