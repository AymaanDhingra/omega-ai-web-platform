import type { MarketAsset, MarketGroup } from "../types";

export const marketGroups: MarketGroup[] = ["All", "Indian", "Crypto", "Global"];

export const marketAssets: MarketAsset[] = [
  { id: "nifty", group: "Indian", symbol: "NIFTY", price: "23,486.20", volume: "289M", trend: "Range Up", signal: "Watch", confidence: 67, support: "23,210", resistance: "23,720", change: 0.36 },
  { id: "banknifty", group: "Indian", symbol: "BANKNIFTY", price: "51,820.60", volume: "116M", trend: "Momentum", signal: "Buy", confidence: 72, support: "51,240", resistance: "52,540", change: 0.78 },
  { id: "sensex", group: "Indian", symbol: "SENSEX", price: "77,210.11", volume: "204M", trend: "Balanced", signal: "Neutral", confidence: 54, support: "76,530", resistance: "78,080", change: 0.21 },
  { id: "reliance", group: "Indian", symbol: "RELIANCE", price: "2,940.45", volume: "9.1M", trend: "Accumulation", signal: "Watch", confidence: 63, support: "2,875", resistance: "3,015", change: 0.44 },
  { id: "tcs", group: "Indian", symbol: "TCS", price: "3,894.80", volume: "2.8M", trend: "Mean Revert", signal: "Sell", confidence: 58, support: "3,820", resistance: "3,985", change: -0.31 },
  { id: "infy", group: "Indian", symbol: "INFY", price: "1,486.35", volume: "5.9M", trend: "Breakout Base", signal: "Buy", confidence: 69, support: "1,452", resistance: "1,524", change: 0.61 },
  { id: "btcusdt", group: "Crypto", symbol: "BTCUSDT", price: "104,280.50", volume: "38.4B", trend: "Expansion", signal: "Buy", confidence: 78, support: "101,900", resistance: "106,800", change: 1.42 },
  { id: "ethusdt", group: "Crypto", symbol: "ETHUSDT", price: "5,842.10", volume: "18.2B", trend: "Trend", signal: "Buy", confidence: 74, support: "5,620", resistance: "6,020", change: 1.08 },
  { id: "solusdt", group: "Crypto", symbol: "SOLUSDT", price: "212.76", volume: "4.1B", trend: "Volatile", signal: "Watch", confidence: 62, support: "198", resistance: "226", change: -0.18 },
  { id: "xrpusdt", group: "Crypto", symbol: "XRPUSDT", price: "0.6124", volume: "1.6B", trend: "Compression", signal: "Neutral", confidence: 51, support: "0.586", resistance: "0.646", change: 0.09 },
  { id: "gold", group: "Global", symbol: "GOLD", price: "2,384.70", volume: "142K", trend: "Flight Bid", signal: "Buy", confidence: 71, support: "2,352", resistance: "2,420", change: 0.53 },
  { id: "silver", group: "Global", symbol: "SILVER", price: "31.26", volume: "88K", trend: "Momentum", signal: "Watch", confidence: 65, support: "30.55", resistance: "32.10", change: 0.72 },
  { id: "crude", group: "Global", symbol: "CRUDE", price: "78.42", volume: "321K", trend: "Distribution", signal: "Sell", confidence: 66, support: "76.80", resistance: "80.20", change: -0.46 },
  { id: "nasdaq", group: "Global", symbol: "NASDAQ", price: "19,860.40", volume: "1.8B", trend: "Risk On", signal: "Buy", confidence: 73, support: "19,520", resistance: "20,120", change: 0.94 },
  { id: "sp500", group: "Global", symbol: "S&P500", price: "5,812.30", volume: "3.2B", trend: "Risk On", signal: "Watch", confidence: 64, support: "5,740", resistance: "5,890", change: 0.48 }
];

export const candles: [number, number, number, number][] = [
  [34, 52, 30, 45],
  [46, 62, 40, 58],
  [57, 69, 50, 54],
  [53, 61, 44, 48],
  [49, 70, 46, 66],
  [67, 76, 60, 72],
  [71, 82, 68, 78],
  [79, 86, 70, 73],
  [74, 92, 72, 88],
  [89, 96, 81, 84],
  [85, 98, 80, 94],
  [93, 102, 90, 98]
];
