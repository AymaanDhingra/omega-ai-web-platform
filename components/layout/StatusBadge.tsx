import type { MetricTone, ModuleStatus, SystemHealthState } from "../../lib/types";
import { systemStatusClasses, toneClasses } from "../../lib/utils/styles";

export function StatusBadge({ label, tone = "flat" }: { label: string; tone?: MetricTone }) {
  return <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${toneClasses(tone)}`}>{label}</span>;
}

export function SystemStatusBadge({ state }: { state: SystemHealthState }) {
  return <span className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${systemStatusClasses(state)}`}>{state}</span>;
}

export function ModuleStatusBadge({ status }: { status: ModuleStatus }) {
  const tone: MetricTone =
    status === "active" ? "up" :
    status === "mock" ? "flat" :
    status === "locked" ? "down" :
    status === "placeholder" ? "warn" :
    "warn";
  return <StatusBadge label={status} tone={tone} />;
}
