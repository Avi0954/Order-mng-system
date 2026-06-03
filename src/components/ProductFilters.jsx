import React from "react";
import { LayoutGrid, Scale, Droplet, Hash } from "lucide-react";

export default function ProductFilters({ categoryFilter, setCategoryFilter }) {
  const filters = [
    { id: "all", label: "All Products", icon: LayoutGrid },
    { id: "weight", label: "Weight (g/kg)", icon: Scale },
    { id: "volume", label: "Volume (mL/L)", icon: Droplet },
    { id: "count", label: "Count (items)", icon: Hash },
  ];

  return (
    <div className="flex flex-wrap md:flex-nowrap bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm items-center gap-1 w-full">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = categoryFilter === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => setCategoryFilter(filter.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-bold rounded-xl transition-all duration-200 select-none ${
              isActive
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
