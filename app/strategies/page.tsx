import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { StrategyLabModule } from "../../components/modules/StrategyLabModule";

export default async function StrategiesPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("strategy-lab");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <StrategyLabModule strategies={dashboard.strategies} />
      </ModulePage>
    </AppShell>
  );
}
