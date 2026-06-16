import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { PaperTradingModule } from "../../components/modules/PaperTradingModule";

export default async function PaperPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("paper-trading");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <PaperTradingModule
          trades={dashboard.paperTrades}
          curve={dashboard.aiBrain.confidenceCurve}
          validations={dashboard.tradingViewTesting.paperTradingValidation}
        />
      </ModulePage>
    </AppShell>
  );
}
