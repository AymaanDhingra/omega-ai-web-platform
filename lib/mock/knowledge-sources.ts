import type { KnowledgeSource } from "../types";

/**
 * Mock Knowledge Sources
 * Describes available knowledge sources for the system
 */
export const knowledgeSources: KnowledgeSource[] = [
  {
    id: "strategies",
    type: "strategy",
    name: "Trading Strategies",
    description: "Documented trading strategies and their performance characteristics",
    enabled: true,
    priority: 10,
    metadata: {
      category: "strategy",
      updateFrequency: "manual",
      validationMethod: "backtesting"
    }
  },
  {
    id: "trade-journals",
    type: "trade-journal",
    name: "Trade Journals",
    description: "Detailed records of executed trades with analysis and learnings",
    enabled: true,
    priority: 9,
    metadata: {
      category: "trade-journal",
      updateFrequency: "real-time",
      validationMethod: "execution-record"
    }
  },
  {
    id: "market-notes",
    type: "market-notes",
    name: "Market Notes",
    description: "Observations and analysis of market conditions and regime changes",
    enabled: true,
    priority: 8,
    metadata: {
      category: "market-notes",
      updateFrequency: "daily",
      validationMethod: "market-observation"
    }
  },
  {
    id: "research-notes",
    type: "research-notes",
    name: "Research Notes",
    description: "Technical and fundamental research findings",
    enabled: true,
    priority: 7,
    metadata: {
      category: "research-notes",
      updateFrequency: "manual",
      validationMethod: "peer-review"
    }
  },
  {
    id: "economic-events",
    type: "economic-events",
    name: "Economic Events",
    description: "Economic calendar events and their market impact",
    enabled: true,
    priority: 8,
    metadata: {
      category: "economic-events",
      updateFrequency: "real-time",
      validationMethod: "market-impact"
    }
  },
  {
    id: "ai-learnings",
    type: "ai-learnings",
    name: "AI Learnings",
    description: "Insights and patterns discovered by AI analysis",
    enabled: true,
    priority: 9,
    metadata: {
      category: "ai-learnings",
      updateFrequency: "real-time",
      validationMethod: "ai-confidence"
    }
  },
  {
    id: "paper-trading-results",
    type: "paper-trading-results",
    name: "Paper Trading Results",
    description: "Results and analysis from paper trading simulations",
    enabled: true,
    priority: 8,
    metadata: {
      category: "paper-trading-results",
      updateFrequency: "real-time",
      validationMethod: "simulation-record"
    }
  },
  {
    id: "tradingview-observations",
    type: "tradingview-observations",
    name: "TradingView Observations",
    description: "Chart observations and technical analysis from TradingView",
    enabled: false,
    priority: 5,
    metadata: {
      category: "tradingview-observations",
      updateFrequency: "manual",
      validationMethod: "chart-analysis",
      note: "Optional - OMEGA functions without TradingView"
    }
  },
  {
    id: "portfolio-notes",
    type: "portfolio-notes",
    name: "Portfolio Notes",
    description: "Notes and analysis related to portfolio management",
    enabled: true,
    priority: 7,
    metadata: {
      category: "portfolio-notes",
      updateFrequency: "manual",
      validationMethod: "portfolio-review"
    }
  },
  {
    id: "risk-rules",
    type: "risk-rules",
    name: "Risk Rules",
    description: "Risk management rules and constraints",
    enabled: true,
    priority: 10,
    metadata: {
      category: "risk-rules",
      updateFrequency: "manual",
      validationMethod: "compliance-check"
    }
  },
  {
    id: "market-regime",
    type: "market-regime",
    name: "Market Regime Analysis",
    description: "Analysis of current and historical market regimes",
    enabled: true,
    priority: 9,
    metadata: {
      category: "market-regime",
      updateFrequency: "daily",
      validationMethod: "regime-detection"
    }
  },
  {
    id: "signal-analysis",
    type: "signal-analysis",
    name: "Signal Analysis",
    description: "Analysis and validation of trading signals",
    enabled: true,
    priority: 9,
    metadata: {
      category: "signal-analysis",
      updateFrequency: "real-time",
      validationMethod: "signal-validation"
    }
  }
];

export function getKnowledgeSource(id: string): KnowledgeSource | undefined {
  return knowledgeSources.find(source => source.id === id);
}

export function getEnabledKnowledgeSources(): KnowledgeSource[] {
  return knowledgeSources.filter(source => source.enabled);
}

export function getKnowledgeSourcesByType(type: string): KnowledgeSource[] {
  return knowledgeSources.filter(source => source.type === type);
}
