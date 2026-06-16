/**
 * TradingView Foundation Page
 *
 * Route: /tradingview
 * Phase 7 Completion Pass — renders TradingViewFoundationModule inside ModulePage.
 *
 * OMEGA Constitution: TradingView remains OPTIONAL.
 * This page renders an EmptyState when the feature flag is disabled.
 */
import { getModuleById } from "../../lib/modules";
import { systemApi } from "../../api/system";
import { AppShell } from "../../components/layout/AppShell";
import { ModulePage } from "../../components/layout/ModulePage";
import { TradingViewFoundationModule } from "../../components/modules/TradingViewFoundationModule";
import { tradingViewFoundationMock } from "../../lib/mock/tradingview-contracts";

export default async function TradingViewPage() {
  const dashboard = await systemApi.getDashboardSnapshot();
  const moduleDefinition = getModuleById("tradingview-foundation");

  return (
    <AppShell modules={dashboard.modules}>
      <ModulePage module={moduleDefinition}>
        <TradingViewFoundationModule state={tradingViewFoundationMock} />
      </ModulePage>
    </AppShell>
  );
}
