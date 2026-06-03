import React from "react";

export default function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-x-auto border border-slate-200 rounded-3xl bg-white shadow-sm">
      <table className={`min-w-full divide-y divide-slate-200 text-left text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead className={`bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className = "", ...props }) {
  return (
    <tbody className={`divide-y divide-slate-200 bg-white text-slate-700 font-medium ${className}`} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr className={`hover:bg-slate-50/50 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "", isHeader = false, ...props }) {
  const Component = isHeader ? "th" : "td";
  return (
    <Component className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </Component>
  );
}
