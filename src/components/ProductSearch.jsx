"use client";

import { Search, X } from "lucide-react";

export default function ProductSearch({ query, onQueryChange }) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center space-x-3 w-full">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Filter catalog by product name or SKU code..."
          className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
        />
        {query && (
          <button
            onClick={() => onQueryChange("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
