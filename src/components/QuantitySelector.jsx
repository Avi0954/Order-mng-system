"use client";

import { Scale, ChevronDown } from "lucide-react";

export default function QuantitySelector({ quantity, selectedUnit, allowedUnits, onQuantityChange, onUnitChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
        Specify Order Quantity
      </label>
      
      <div className="flex rounded-xl border border-slate-200 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all bg-white">
        {/* Quantity Number Input */}
        <input
          type="number"
          min="0.0001"
          step="any"
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value)}
          placeholder="Enter amount..."
          className="flex-grow px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none text-sm bg-transparent w-full"
        />

        {/* Unit Selection Dropdown */}
        <div className="relative border-l border-slate-200 bg-slate-50 shrink-0 flex items-center">
          <select
            value={selectedUnit}
            onChange={(e) => onUnitChange(e.target.value)}
            className="pl-3.5 pr-8 py-3 text-slate-700 font-bold text-xs bg-transparent focus:outline-none appearance-none cursor-pointer h-full"
          >
            {allowedUnits.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          {/* Custom Chevron Indicator */}
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
