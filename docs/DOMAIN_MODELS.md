# OMEGA AI Domain Models

## Overview

Omega AI is built on a domain-driven architecture with 8 core domains:

1. **Market Domain** - Market data, assets, exchanges, trading sessions
2. **Trading Domain** - Signals, orders, positions, trades
3. **Strategy Domain** - Trading strategies, indicators, rules
4. **Portfolio Domain** - Holdings, allocations, metrics
5. **Paper Trading Domain** - Paper trades, journal, metrics
6. **AI Domain** - Predictions, recommendations, learning
7. **TradingView Domain** - Testing and validation only
8. **Analytics Domain** - Metrics, statistics, historical data

## Market Domain

### Types
- `Asset` - Individual tradable asset (stock, crypto, etc.)
- `Exchange` - Trading exchange (NYSE, NASDAQ, etc.)
- `TradingSession` - Market session (pre-market, open, close, after-hours)
- `MarketCalendar` - Trading calendar with holidays
- `Sector` - Industry sector
- `Industry` - Industry classification
- `MarketRegime` - Current market conditions (trending, ranging, etc.)
- `LiquidityProfile` - Asset liquidity characteristics
- `VolatilityProfile` - Asset volatility characteristics
- `MarketSnapshot` - Current market state
- `MarketState` - Historical market state

### Enums
- `MarketType` - equity, crypto, forex, commodities
- `ExchangeType` - nyse, nasdaq, binance, etc.
- `TradingSessionStatus` - pre-market, open, close, after-hours
- `MarketRegimeType` - trending-up, trending-down, ranging, volatile
- `LiquidityLevel` - high, medium, low
- `VolatilityLevel` - low, medium, high, extreme

## Trading Domain

### Types
- `Signal` - Trading signal (entry, exit, adjustment)
- `Order` - Trading order (market, limit, stop, etc.)
- `Position` - Open position in an asset
- `Execution` - Order execution record
- `Exit` - Position exit record
- `RiskProfile` - Risk parameters for trading
- `TradeLifecycle` - Complete trade from signal to close
- `TradeDecision` - Decision to trade
- `TradeValidation` - Trade validation results
- `TradeSnapshot` - Current trade state
- `TradeHistory` - Historical trade data

### Enums
- `SignalStatus` - created, validated, queued, executed, open, partial, closed, cancelled, archived
- `OrderStatus` - pending, submitted, accepted, rejected, filled, partial, cancelled, expired
- `PositionStatus` - open, partial, closing, closed, error
- `TradeStatus` - pending, open, managing, partial, closed, cancelled, journaled
- `ExecutionStatus` - pending, submitted, executed, failed, cancelled
- `OrderSide` - buy, sell
- `OrderType` - market, limit, stop, stop-limit, trailing-stop
- `TimeInForce` - day, gtc, ioc, fok

## Strategy Domain

### Types
- `Indicator` - Technical indicator (SMA, RSI, MACD, etc.)
- `Condition` - Indicator condition (gt, lt, eq, etc.)
- `EntryRule` - Rule for entering trades
- `ExitRule` - Rule for exiting trades
- `Filter` - Filter for trade signals
- `ValidationRule` - Rule for validating trades
- `Strategy` - Complete trading strategy
- `StrategyVersion` - Strategy version history
- `StrategyPerformance` - Strategy performance metrics
- `StrategySnapshot` - Current strategy state
- `StrategySelection` - Strategy selection and scoring

### Enums
- `StrategyState` - draft, active, paused, archived, error
- `IndicatorType` - sma, ema, rsi, macd, bollinger, atr, adx, stochastic, custom
- `ConditionOperator` - gt, gte, lt, lte, eq, neq, and, or
- `RuleType` - entry, exit, filter, validation
- `Period` - 1d, 1w, 1m, 3m, 6m, 1y, all

## Portfolio Domain

### Types
- `Holding` - Individual asset holding
- `Cash` - Cash position
- `Margin` - Margin information
- `Exposure` - Asset exposure
- `Allocation` - Asset allocation
- `Correlation` - Asset correlation
- `Drawdown` - Drawdown period
- `PortfolioMetrics` - Portfolio performance metrics
- `Portfolio` - Complete portfolio
- `PortfolioSnapshot` - Current portfolio state

### Enums
- `PortfolioStatus` - healthy, warning, critical, recovery

## Paper Trading Domain

### Types
- `PaperAccount` - Paper trading account
- `PaperOrder` - Paper order
- `PaperPosition` - Paper position
- `PaperTrade` - Paper trade
- `PaperPortfolio` - Paper portfolio
- `PaperJournal` - Paper trading journal
- `PaperMetrics` - Paper trading metrics
- `PaperStatistics` - Paper trading statistics
- `PaperSnapshot` - Current paper trading state

### Enums
- `PaperTradingStatus` - generated, executed, managing, closed, analytics-updated

## AI Domain

### Types
- `Prediction` - Market prediction
- `Confidence` - Confidence score
- `MarketAnalysis` - Market analysis
- `StrategySelection` - Strategy selection
- `KnowledgeItem` - Knowledge item
- `LearningEvent` - Learning event
- `Inference` - AI inference
- `AIRecommendation` - AI recommendation
- `AIState` - Current AI state
- `AIHistory` - AI history

### Enums
- `ConfidenceLevel` - very-low, low, medium, high, very-high
- `AISystemStatus` - initializing, ready, analyzing, deciding, executing, error, offline
- `LearningEventType` - trade-result, strategy-performance, market-event, user-feedback

## TradingView Domain

### Types
- `TVSignal` - TradingView signal
- `TVAlert` - TradingView alert
- `TVValidation` - TradingView validation
- `TVComparison` - TradingView comparison
- `TVPaperTrade` - TradingView paper trade
- `TVAccuracy` - TradingView accuracy
- `TVStatistics` - TradingView statistics
- `TVSession` - TradingView session

### Enums
- `TVAlertStatus` - received, validated, compared, archived
- `TVSignalStatus` - generated, validated, matched, unmatched, archived

## Analytics Domain

### Types
- `StrategyMetrics` - Strategy metrics
- `PortfolioMetrics` - Portfolio metrics
- `TradeMetrics` - Trade metrics
- `MarketMetrics` - Market metrics
- `PaperTradingMetrics` - Paper trading metrics
- `PredictionMetrics` - Prediction metrics
- `AIAccuracyMetrics` - AI accuracy metrics
- `HistoricalMetrics` - Historical metrics

### Enums
- `Period` - 1d, 1w, 1m, 3m, 6m, 1y, all
- `Trend` - up, down, sideways
- `Sentiment` - bullish, neutral, bearish

## Shared Domain

### State Machines
- `SignalStateMachine` - Signal state transitions
- `TradeStateMachine` - Trade state transitions
- `OrderStateMachine` - Order state transitions
- `PositionStateMachine` - Position state transitions
- `PortfolioStateMachine` - Portfolio state transitions
- `StrategyStateMachine` - Strategy state transitions
- `PaperTradeStateMachine` - Paper trade state transitions

### Events
- `MarketUpdateEvent` - Market data updated
- `SignalCreatedEvent` - Signal created
- `SignalValidatedEvent` - Signal validated
- `SignalExecutedEvent` - Signal executed
- `TradeOpenedEvent` - Trade opened
- `TradeManagingEvent` - Trade being managed
- `TradeClosedEvent` - Trade closed
- `TradeErrorEvent` - Trade error
- `OrderSubmittedEvent` - Order submitted
- `OrderFilledEvent` - Order filled
- `OrderCancelledEvent` - Order cancelled
- `PositionOpenedEvent` - Position opened
- `PositionClosedEvent` - Position closed
- `PortfolioUpdatedEvent` - Portfolio updated
- `PortfolioRebalancedEvent` - Portfolio rebalanced
- `StrategyActivatedEvent` - Strategy activated
- `StrategyPausedEvent` - Strategy paused
- `AIAnalysisCompletedEvent` - AI analysis completed
- `AIRecommendationGeneratedEvent` - AI recommendation generated
- `PaperTradeExecutedEvent` - Paper trade executed
- `PaperTradeAnalyzedEvent` - Paper trade analyzed

## File Organization

```
lib/domains/
├── market/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── trading/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── strategy/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── portfolio/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── paper-trading/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── ai/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── tradingview/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
├── analytics/
│   ├── types.ts
│   ├── enums.ts
│   └── index.ts
└── shared/
    ├── state-machines.ts
    ├── events.ts
    ├── enums.ts
    └── index.ts
```
