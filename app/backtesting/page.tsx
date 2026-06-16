import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { BacktestingModule } from "../../components/modules/BacktestingModule";

export default async function BacktestingPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("backtesting");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <BacktestingModule metrics={dashboard.backtestMetrics} portfolio={dashboard.portfolio} />
      </ModulePage>
    </AppShell>
  );
}
