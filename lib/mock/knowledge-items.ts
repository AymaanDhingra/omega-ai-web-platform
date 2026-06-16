import type { KnowledgeItem, KnowledgeTag } from "../types";

/**
 * Mock Knowledge Items
 * Seed data for knowledge layer
 */

const mockTags: Record<string, KnowledgeTag> = {
  nifty: {
    id: "tag-nifty",
    name: "NIFTY",
    category: "market-notes",
    weight: 0.9,
    createdAt: new Date().toISOString()
  },
  wyckoff: {
    id: "tag-wyckoff",
    name: "Wyckoff",
    category: "strategy",
    weight: 0.85,
    createdAt: new Date().toISOString()
  },
  gapTrading: {
    id: "tag-gap-trading",
    name: "Gap Trading",
    category: "strategy",
    weight: 0.8,
    createdAt: new Date().toISOString()
  },
  riskManagement: {
    id: "tag-risk",
    name: "Risk Management",
    category: "risk-rules",
    weight: 0.95,
    createdAt: new Date().toISOString()
  },
  marketRegime: {
    id: "tag-regime",
    name: "Market Regime",
    category: "market-regime",
    weight: 0.9,
    createdAt: new Date().toISOString()
  }
};

export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "ki-nifty-gap-rules",
    title: "NIFTY Gap Trading Rules",
    description: "Documented rules for trading NIFTY gaps based on historical analysis",
    content: `NIFTY Gap Trading Rules:

1. Gap Definition:
   - Opening gap > 50 points considered significant
   - Gap direction indicates market sentiment
   - Gap fill probability: 70% within 5 trading days

2. Entry Rules:
   - Enter on gap fill confirmation
   - Wait for 30-minute consolidation
   - Volume confirmation required

3. Exit Rules:
   - Take profit at previous resistance
   - Stop loss at gap extreme
   - Trail stop after 1:1 risk-reward

4. Risk Management:
   - Risk 1% per trade
   - Max 3 concurrent positions
   - Daily loss limit: 2%`,
    category: "strategy",
    source: "market-notes",
    sourceId: "nifty-gap-rules",
    tags: [mockTags.nifty, mockTags.gapTrading],
    references: [],
    state: {
      id: "state-nifty-gap",
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: 0.85,
      lastValidated: new Date().toISOString(),
      validationSource: "market-observation"
    },
    metadata: {
      market: "Indian Equities",
      symbol: "NIFTY50",
      timeframe: "Daily",
      regime: "Trending",
      confidence: 0.85,
      author: "System",
      validationCount: 45,
      successRate: 0.72
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "ki-wyckoff-analysis",
    title: "Wyckoff Method Analysis Framework",
    description: "Framework for applying Wyckoff method to market analysis",
    content: `Wyckoff Method Framework:

1. Market Phases:
   - Accumulation: Smart money buying
   - Markup: Price rises with volume
   - Distribution: Smart money selling
   - Markdown: Price falls with volume

2. Key Concepts:
   - Effort vs Result: Volume vs price movement
   - Spring: False breakdown before reversal
   - Climax: Exhaustion before reversal
   - Schematic: Price structure analysis

3. Trading Application:
   - Identify phase using volume analysis
   - Wait for confirmation signals
   - Enter on phase transition
   - Exit on phase completion

4. Risk Management:
   - Stop loss at phase extreme
   - Scale into positions
   - Trail stops in trending phases`,
    category: "strategy",
    source: "research-notes",
    sourceId: "wyckoff-framework",
    tags: [mockTags.wyckoff, mockTags.riskManagement],
    references: [],
    state: {
      id: "state-wyckoff",
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: 0.9,
      lastValidated: new Date().toISOString(),
      validationSource: "market-observation"
    },
    metadata: {
      market: "All Markets",
      timeframe: "Multi-timeframe",
      regime: "All",
      confidence: 0.9,
      author: "System",
      applicability: "Universal"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "ki-risk-rules",
    title: "Core Risk Management Rules",
    description: "Fundamental risk management constraints for all trading",
    content: `Core Risk Management Rules:

1. Position Sizing:
   - Risk 1% per trade maximum
   - Max 3% portfolio risk per day
   - Max 5% portfolio risk per week

2. Portfolio Constraints:
   - Max 5 concurrent positions
   - Max 2 positions in same sector
   - Max 30% in single market

3. Drawdown Limits:
   - Daily loss limit: 2%
   - Weekly loss limit: 4%
   - Monthly loss limit: 6%

4. Leverage Rules:
   - No leverage in paper trading
   - Max 1:2 leverage in live trading
   - Margin call buffer: 30%

5. Emergency Rules:
   - Flatten all positions on 3% daily loss
   - Halt new entries on 2% daily loss
   - Review system on weekly loss limit breach`,
    category: "risk-rules",
    source: "risk-rules",
    sourceId: "core-risk-rules",
    tags: [mockTags.riskManagement],
    references: [],
    state: {
      id: "state-risk-rules",
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: 1.0,
      lastValidated: new Date().toISOString(),
      validationSource: "compliance-check"
    },
    metadata: {
      market: "All Markets",
      regime: "All",
      confidence: 1.0,
      author: "System",
      mandatory: true,
      lastReview: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "ki-market-regime-trending",
    title: "Trending Market Regime Characteristics",
    description: "Characteristics and trading approach for trending markets",
    content: `Trending Market Regime:

1. Identification:
   - Higher highs and higher lows (uptrend)
   - Lower highs and lower lows (downtrend)
   - Volume increases in trend direction
   - Moving averages aligned

2. Characteristics:
   - Strong directional bias
   - Pullbacks are buying/selling opportunities
   - Breakouts likely to continue
   - Reversals are rare and violent

3. Trading Strategy:
   - Trade in trend direction only
   - Enter on pullbacks to support/resistance
   - Trail stops to protect profits
   - Exit on trend break

4. Risk Management:
   - Wider stops in trending markets
   - Scale into positions
   - Reduce size on trend weakness
   - Exit on reversal confirmation`,
    category: "market-regime",
    source: "market-notes",
    sourceId: "regime-trending",
    tags: [mockTags.marketRegime],
    references: [],
    state: {
      id: "state-regime-trending",
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: 0.95,
      lastValidated: new Date().toISOString(),
      validationSource: "market-observation"
    },
    metadata: {
      market: "All Markets",
      regime: "Trending",
      confidence: 0.95,
      author: "System",
      applicability: "All timeframes"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "ki-ai-learning-pattern",
    title: "AI Learning: NIFTY Morning Gap Pattern",
    description: "Pattern discovered by AI analysis of NIFTY morning gaps",
    content: `AI Learning: NIFTY Morning Gap Pattern

Pattern Discovery:
- Analyzed 500+ NIFTY opening gaps over 2 years
- Identified consistent pattern in morning gaps
- Pattern shows 73% success rate

Pattern Characteristics:
- Gap size: 30-80 points
- Gap direction: Opposite to previous day close
- Volume: Above 20-day average
- Time to fill: 60-120 minutes

Trading Application:
- Enter on gap fill confirmation
- Target: Previous day close
- Stop loss: Gap extreme
- Risk-reward: 1:1.5 minimum

Confidence: 0.78
Sample Size: 500+ trades
Last Updated: Today`,
    category: "ai-learnings",
    source: "ai-learnings",
    sourceId: "ai-pattern-001",
    tags: [mockTags.nifty, mockTags.gapTrading],
    references: [],
    state: {
      id: "state-ai-learning",
      status: "active",
      validFrom: new Date().toISOString(),
      confidence: 0.78,
      lastValidated: new Date().toISOString(),
      validationSource: "ai-confidence"
    },
    metadata: {
      market: "Indian Equities",
      symbol: "NIFTY50",
      timeframe: "Intraday",
      regime: "All",
      confidence: 0.78,
      author: "AI System",
      sampleSize: 500,
      successRate: 0.73,
      generatedAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function getKnowledgeItem(id: string): KnowledgeItem | undefined {
  return mockKnowledgeItems.find(item => item.id === id);
}

export function getKnowledgeItemsByCategory(category: string): KnowledgeItem[] {
  return mockKnowledgeItems.filter(item => item.category === category);
}

export function getKnowledgeItemsByTag(tagName: string): KnowledgeItem[] {
  return mockKnowledgeItems.filter(item =>
    item.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase())
  );
}

export function getKnowledgeItemsBySource(source: string): KnowledgeItem[] {
  return mockKnowledgeItems.filter(item => item.source === source);
}
