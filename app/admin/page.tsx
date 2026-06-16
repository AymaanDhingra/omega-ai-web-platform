import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { AdminModule } from "../../components/modules/AdminModule";

export default async function AdminPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("admin");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <AdminModule
          brokerConnections={dashboard.brokerConnections}
          riskPermissions={dashboard.riskPermissions}
          systemLogs={dashboard.systemLogs}
        />
      </ModulePage>
    </AppShell>
  );
}
