import React from "react";
import { Package } from "lucide-react";

export default function EmptyState({
  title = "No items found",
  description = "Get started by adding a new record to the list.",
  icon: Icon = Package,
  action,
  className = "",
  ...props
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 max-w-xl mx-auto space-y-5 ${className}`}
      {...props}
    >
      <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-slate-400">
        <Icon className="h-8 w-8 shrink-0" />
      </div>
      <div className="space-y-1">
        <h3 className="font-extrabold text-slate-900 text-sm tracking-tight">{title}</h3>
        <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
