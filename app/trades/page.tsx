import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { TradeCenterModule } from "../../components/modules/TradeCenterModule";

export default async function TradesPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("trade-center");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <TradeCenterModule signals={dashboard.tradeSignals} />
      </ModulePage>
    </AppShell>
  );
}
