import { brokerConnections, riskPermissions, systemLogs } from "../lib/mock/admin";
import type { DashboardSnapshot } from "../lib/types";
import { mockAISystemService } from "./ai-system-service";
import { mockAnalyticsService } from "./analytics-service";
import { mockKnowledgeService } from "./knowledge-service";
import { mockMarketService } from "./market-service";
import { mockNewsService } from "./news-service";
import { mockPortfolioService } from "./portfolio-service";
import { mockStrategyService } from "./strategy-service";

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const [
    modules,
    metrics,
    marketAssets,
    tradeSignals,
    portfolio,
    strategies,
    backtestMetrics,
    paperTrades,
    aiBrain,
    knowledgeDocuments,
    newsEvents,
    systemStatuses,
    tradingModes,
    chatCommands,
    candles,
    analyticsGroups,
    tradingViewTesting
  ] = await Promise.all([
    mockAISystemService.getModules(),
    mockPortfolioService.getDashboardMetrics(),
    mockMarketService.getWatchlist(),
    mockStrategyService.getTradeSignals(),
    mockPortfolioService.getPortfolio(),
    mockStrategyService.getStrategies(),
    mockStrategyService.getBacktestMetrics(),
    mockPortfolioService.getPaperTrades(),
    mockAISystemService.getAIBrain(),
    mockKnowledgeService.getDocuments(),
    mockNewsService.getNewsEvents(),
    mockAISystemService.getSystemStatuses(),
    mockAISystemService.getTradingModes(),
    mockAISystemService.getChatCommands(),
    mockMarketService.getCandles(),
    mockAnalyticsService.getAnalyticsGroups(),
    mockAnalyticsService.getTradingViewTestingSummary()
  ]);

  return {
    modules,
    metrics,
    marketAssets,
    tradeSignals,
    portfolio,
    strategies,
    backtestMetrics,
    paperTrades,
    aiBrain,
    knowledgeDocuments,
    newsEvents,
    systemStatuses,
    tradingModes,
    brokerConnections,
    riskPermissions,
    systemLogs,
    chatCommands,
    candles,
    analyticsGroups,
    tradingViewTesting
  };
}
