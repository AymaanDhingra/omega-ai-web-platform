/**
 * Strategy Domain Visualization Component
 * 
 * Displays strategy rules, indicators, and performance.
 * Mock data only - no backend integration.
 */

import React from "react";

export const StrategyVisualization: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Strategy Visualization</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Indicators</h3>
          <p className="text-gray-600">Technical indicators and values</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Rules</h3>
          <p className="text-gray-600">Entry, exit, and filter rules</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Performance</h3>
          <p className="text-gray-600">Strategy metrics and statistics</p>
        </div>
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-semibold mb-2">Selection</h3>
          <p className="text-gray-600">Strategy selection and scoring</p>
        </div>
      </div>
    </div>
  );
};
