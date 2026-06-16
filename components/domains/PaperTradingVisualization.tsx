/**
 * Paper Trading Domain Visualization Component
 * 
 * Displays paper trades, journal, and metrics.
 * Mock data only - no backend integration.
 */

import React from "react";

export const PaperTradingVisualization: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Paper Trading Visualization</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Trades</h3>
          <p className="text-gray-600">Paper trading execution</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Journal</h3>
          <p className="text-gray-600">Trading journal and notes</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Metrics</h3>
          <p className="text-gray-600">Paper trading performance</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Statistics</h3>
          <p className="text-gray-600">Win rate, profit factor, etc.</p>
        </div>
      </div>
    </div>
  );
};
