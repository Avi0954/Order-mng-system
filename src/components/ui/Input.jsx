import React from "react";

export default function Input({
  label,
  error,
  icon: Icon,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-500 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative rounded-2xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Icon className="h-5 w-5 shrink-0" />
          </div>
        )}
        <input
          id={id}
          className={`block w-full border rounded-2xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all py-3 ${
            Icon ? "pl-11 pr-4" : "px-4"
          } ${
            error ? "border-rose-300 focus:ring-rose-500 focus:border-rose-500" : "border-slate-200"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-semibold text-rose-600 pl-1">{error}</p>
      )}
    </div>
  );
}
