import type { PaperTradingState } from "../contracts/paper-trading";

export const paperTradingState: PaperTradingState = {
  accounts: [
    {
      id: "paper-primary",
      name: "OMEGA Paper Account",
      currency: "INR",
      startingCash: "INR 10,00,000",
      cash: "INR 7,40,000",
      equity: "INR 10,43,400",
      status: "Mock"
    }
  ],
  orders: [
    {
      id: "paper-order-infy",
      accountId: "paper-primary",
      symbol: "INFY",
      side: "Long",
      type: "Limit",
      quantity: "120",
      requestedPrice: "1,452.00",
      status: "Filled",
      createdAt: "mock-clock"
    },
    {
      id: "paper-order-tcs",
      accountId: "paper-primary",
      symbol: "TCS",
      side: "Short",
      type: "Market",
      quantity: "50",
      requestedPrice: "3,856.40",
      status: "Filled",
      createdAt: "mock-clock"
    }
  ],
  positions: [
    {
      id: "paper-pos-infy",
      accountId: "paper-primary",
      symbol: "INFY",
      side: "Long",
      quantity: "120",
      averagePrice: "1,452.00",
      markPrice: "1,486.35",
      unrealizedPnl: "+INR 4,122"
    },
    {
      id: "paper-pos-tcs",
      accountId: "paper-primary",
      symbol: "TCS",
      side: "Short",
      quantity: "50",
      averagePrice: "3,856.40",
      markPrice: "3,894.80",
      unrealizedPnl: "-INR 1,920"
    }
  ],
  portfolios: [
    {
      account: {
        id: "paper-primary",
        name: "OMEGA Paper Account",
        currency: "INR",
        startingCash: "INR 10,00,000",
        cash: "INR 7,40,000",
        equity: "INR 10,43,400",
        status: "Mock"
      },
      positions: [
        {
          id: "paper-pos-infy",
          accountId: "paper-primary",
          symbol: "INFY",
          side: "Long",
          quantity: "120",
          averagePrice: "1,452.00",
          markPrice: "1,486.35",
          unrealizedPnl: "+INR 4,122"
        }
      ],
      equityCurve: [100, 101, 100.6, 102.2, 103.5, 104.3]
    }
  ],
  journal: [
    {
      id: "journal-infy",
      accountId: "paper-primary",
      symbol: "INFY",
      side: "Long",
      openedAt: "mock-clock",
      thesis: "Breakout base with improving IT sector breadth.",
      lesson: "Wait for confirmation above prior value.",
      mood: "Confident"
    }
  ],
  performance: [
    {
      accountId: "paper-primary",
      winRate: "58.6%",
      profitFactor: "1.64",
      maxDrawdown: "8.6%",
      expectancy: "+0.27R",
      totalTrades: 28
    }
  ]
};
