import React from "react";

export default function DashboardCard({ title, value, icon: Icon, trend, trendType = "positive" }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">
          {title}
        </p>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-slate-900 tracking-tight">
            {value}
          </span>
          {trend && (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                trendType === "positive"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-amber-50 text-amber-600"
              }`}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
      {Icon && (
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
