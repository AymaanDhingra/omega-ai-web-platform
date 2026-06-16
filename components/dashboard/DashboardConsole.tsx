import type { DashboardSnapshot } from "../../lib/types";
import { AppShell } from "../layout/AppShell";
import { ModulePage } from "../layout/ModulePage";
import { Panel } from "../layout/Panel";
import { SectionHeader } from "../layout/SectionHeader";
import { AdminModule } from "../modules/AdminModule";
import { AIChatModule } from "../modules/AIChatModule";
import { AIBrainModule } from "../modules/AIBrainModule";
import { AnalyticsModule } from "../modules/AnalyticsModule";
import { BacktestingModule } from "../modules/BacktestingModule";
import { DashboardModule } from "../modules/DashboardModule";
import { KnowledgeCenterModule } from "../modules/KnowledgeCenterModule";
import { MarketWatchModule } from "../modules/MarketWatchModule";
import { NewsIntelligenceModule } from "../modules/NewsIntelligenceModule";
import { PaperTradingModule } from "../modules/PaperTradingModule";
import { StrategyLabModule } from "../modules/StrategyLabModule";
import { TradeCenterModule } from "../modules/TradeCenterModule";

export function DashboardConsole({ initialData }: { initialData: DashboardSnapshot }) {
  const dashboardModule = initialData.modules.find((module) => module.id === "dashboard") ?? initialData.modules[0];

  return (
    <AppShell modules={initialData.modules}>
      <ModulePage
        module={dashboardModule}
        title="Autonomous Trading Operating Console"
        description="Mock-only command surface for the OMEGA AI frontend platform."
      >
        <div className="space-y-4">
          <DashboardModule
            metrics={initialData.metrics}
            candles={initialData.candles}
            systemStatuses={initialData.systemStatuses}
            portfolio={initialData.portfolio}
          />
          <section className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <AIBrainModule aiBrain={initialData.aiBrain} tradingModes={initialData.tradingModes} />
          </section>
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <Panel>
              <SectionHeader icon="candles" title="Market Watch" meta="Mock watchlist" />
              <div className="mt-4">
                <MarketWatchModule markets={initialData.marketAssets} />
              </div>
            </Panel>
            <Panel>
              <SectionHeader icon="target" title="Trade Center" meta="Evidence-gated" />
              <div className="mt-4">
                <TradeCenterModule signals={initialData.tradeSignals} />
              </div>
            </Panel>
          </section>
          <section className="grid gap-4 xl:grid-cols-2">
            <Panel>
              <SectionHeader icon="flask" title="Strategy Lab" meta="Mock strategies" />
              <div className="mt-4">
                <StrategyLabModule strategies={initialData.strategies} />
              </div>
            </Panel>
            <Panel>
              <SectionHeader icon="barChart" title="Backtesting" meta="Fixture metrics" />
              <div className="mt-4">
                <BacktestingModule metrics={initialData.backtestMetrics} portfolio={initialData.portfolio} />
              </div>
            </Panel>
          </section>
          <section className="grid gap-4 xl:grid-cols-2">
            <Panel>
              <SectionHeader icon="wallet" title="Paper Trading" meta="Validation ready" />
              <div className="mt-4">
                <PaperTradingModule
                  trades={initialData.paperTrades}
                  curve={initialData.aiBrain.confidenceCurve}
                  validations={initialData.tradingViewTesting.paperTradingValidation}
                />
              </div>
            </Panel>
            <Panel>
              <SectionHeader icon="database" title="Knowledge Center" meta="Mock ingestion" />
              <div className="mt-4">
                <KnowledgeCenterModule documents={initialData.knowledgeDocuments} />
              </div>
            </Panel>
          </section>
          <section className="grid gap-4 xl:grid-cols-2">
            <Panel>
              <SectionHeader icon="radio" title="News Intelligence" meta="Event detection" />
              <div className="mt-4">
                <NewsIntelligenceModule events={initialData.newsEvents} />
              </div>
            </Panel>
            <Panel>
              <SectionHeader icon="message" title="AI Chat" meta="Command center" />
              <div className="mt-4">
                <AIChatModule commands={initialData.chatCommands} />
              </div>
            </Panel>
          </section>
          <Panel>
            <SectionHeader icon="lineChart" title="Analytics" meta="Testing placeholders" />
            <div className="mt-4">
              <AnalyticsModule groups={initialData.analyticsGroups} tradingViewTesting={initialData.tradingViewTesting} />
            </div>
          </Panel>
          <Panel>
            <AdminModule
              brokerConnections={initialData.brokerConnections}
              riskPermissions={initialData.riskPermissions}
              systemLogs={initialData.systemLogs}
            />
          </Panel>
        </div>
      </ModulePage>
    </AppShell>
  );
}
