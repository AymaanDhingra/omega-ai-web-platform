/**
 * Knowledge Integration with SignalFlow
 * 
 * Connects the Knowledge Intelligence Layer to the existing SignalFlow
 * orchestration system.
 * 
 * OMEGA Constitution:
 * - Knowledge participates in existing SignalFlow
 * - Do NOT create a parallel pipeline
 * - Maintain architecture consistency
 */

import type { KnowledgeItem, KnowledgeIntegration } from "./types";
import type { TradeSignal } from "./types";

/**
 * Enhance a trade signal with knowledge context
 * 
 * Flow:
 * Signal → Knowledge Search → AI Analysis → Enhanced Signal → SignalFlow
 */
export async function enhanceSignalWithKnowledge(
  signal: TradeSignal,
  knowledgeItems: KnowledgeItem[]
): Promise<KnowledgeIntegration> {
  // Find relevant knowledge for this signal
  const relevantKnowledge = knowledgeItems.filter(item => {
    // Match by symbol
    if (item.metadata.symbol && item.metadata.symbol !== signal.symbol) return false;

    // Match by market
    if (item.metadata.market && !signal.market.includes(item.metadata.market)) return false;

    // Match by category (strategy, risk-rules, market-regime, etc.)
    const relevantCategories = [
      "strategy",
      "risk-rules",
      "market-regime",
      "signal-analysis",
      "ai-learnings"
    ];
    return relevantCategories.includes(item.category);
  });

  // Calculate relevance score
  const relevanceScore = Math.min(
    1,
    relevantKnowledge.reduce((sum, item) => sum + item.state.confidence, 0) /
      Math.max(1, relevantKnowledge.length)
  );

  return {
    id: `ki-${signal.id}-${Date.now()}`,
    signalId: signal.id,
    knowledgeItems: relevantKnowledge,
    relevanceScore,
    reasoning: `Enhanced signal with ${relevantKnowledge.length} knowledge items. Average confidence: ${(relevanceScore * 100).toFixed(1)}%`,
    appliedAt: new Date().toISOString()
  };
}

/**
 * Validate a signal against knowledge constraints
 * 
 * Checks if signal violates any risk rules or contradicts market regime knowledge
 */
export function validateSignalAgainstKnowledge(
  signal: TradeSignal,
  knowledgeItems: KnowledgeItem[]
): { valid: boolean; violations: string[]; warnings: string[] } {
  const violations: string[] = [];
  const warnings: string[] = [];

  // Check risk rules
  const riskRules = knowledgeItems.filter(item => item.category === "risk-rules");
  for (const rule of riskRules) {
    // Parse risk constraints from rule content
    if (rule.content.includes("Risk 1%") && signal.risk && parseFloat(signal.risk) > 1) {
      violations.push(`Signal risk ${signal.risk}% exceeds 1% rule`);
    }
  }

  // Check market regime compatibility
  const regimeKnowledge = knowledgeItems.filter(item => item.category === "market-regime");
  for (const regime of regimeKnowledge) {
    if (regime.metadata.regime && regime.metadata.regime !== signal.market) {
      // Check if signal aligns with regime
      if (regime.content.includes("uptrend") && signal.direction === "Short") {
        warnings.push(`Signal direction contradicts trending market regime`);
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    warnings
  };
}

/**
 * Extract learning from executed trade using knowledge
 * 
 * Creates new knowledge from trade results
 */
export function extractLearningFromTrade(
  tradeId: string,
  result: {
    symbol: string;
    pnl: number;
    mae: number;
    mfe: number;
    duration: number;
    relatedKnowledge: KnowledgeItem[];
  }
): Partial<KnowledgeItem> {
  const isWinningTrade = result.pnl > 0;
  const mae = Math.abs(result.mae);
  const mfe = Math.abs(result.mfe);
  const riskRewardRatio = mfe > 0 ? mae / mfe : 0;

  return {
    title: `Trade Learning: ${result.symbol} - ${isWinningTrade ? "Win" : "Loss"}`,
    description: `Learning extracted from trade ${tradeId}`,
    content: `Trade Result Analysis:

Symbol: ${result.symbol}
P&L: ${result.pnl > 0 ? "+" : ""}${result.pnl}
MAE: ${mae.toFixed(2)}
MFE: ${mfe.toFixed(2)}
Risk/Reward: ${riskRewardRatio.toFixed(2)}
Duration: ${result.duration} minutes

Related Knowledge:
${result.relatedKnowledge.map(k => `- ${k.title}`).join("\n")}`,
    category: "ai-learnings",
    source: "paper-trading-results",
    sourceId: tradeId,
    tags: [],
    references: result.relatedKnowledge.map(k => ({
      id: `ref-${k.id}`,
      type: "internal",
      targetId: k.id,
      targetType: "KnowledgeItem",
      relationship: "supports",
      confidence: 0.8,
      createdAt: new Date().toISOString()
    })),
    state: {
      id: `state-${tradeId}`,
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: isWinningTrade ? 0.8 : 0.6,
      lastValidated: new Date().toISOString(),
      validationSource: "execution-record"
    },
    metadata: {
      symbol: result.symbol,
      tradeId,
      pnl: result.pnl,
      mae,
      mfe,
      riskRewardRatio,
      isWinningTrade,
      generatedAt: new Date().toISOString()
    }
  };
}
