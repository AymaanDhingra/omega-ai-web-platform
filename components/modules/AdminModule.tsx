import { CheckCircle2, LockKeyhole } from "lucide-react";
import type { BrokerConnection, RiskPermission, SystemLog } from "../../lib/types";
import { SectionHeader } from "../layout/SectionHeader";

export function AdminModule({
  brokerConnections,
  riskPermissions,
  systemLogs
}: {
  brokerConnections: BrokerConnection[];
  riskPermissions: RiskPermission[];
  systemLogs: SystemLog[];
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <section className="rounded-lg border border-line bg-panel p-4">
        <SectionHeader icon="plug" title="Broker Connections" meta="Permission-gated" />
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {brokerConnections.map((broker) => (
            <div key={broker.id} className="flex items-center justify-between gap-2 border-t border-line pt-2 first:border-t-0">
              <span className="truncate">{broker.name}</span>
              <LockKeyhole className="h-4 w-4 shrink-0 text-zinc-400" />
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-line bg-panel p-4">
        <SectionHeader icon="shield" title="Risk Permissions" meta="Capital guardrails" />
        <div className="mt-4 space-y-3 text-sm">
          {riskPermissions.map((permission) => (
            <div key={permission.id} className="flex items-center justify-between gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0">
              <span className="text-zinc-600">{permission.label}</span>
              <span className="font-semibold">{permission.value}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-lg border border-line bg-panel p-4">
        <SectionHeader icon="bell" title="System Logs" meta="Latest" />
        <div className="mt-4 space-y-3 text-sm">
          {systemLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 border-t border-line pt-3 first:border-t-0 first:pt-0">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
              <span className="leading-5 text-zinc-600">{log.message}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
