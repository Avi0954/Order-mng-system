import React from "react";

export default function Badge({
  children,
  className = "",
  variant = "primary",
  icon: Icon,
  ...props
}) {
  const baseStyles = "inline-flex items-center space-x-1.5 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border uppercase select-none";

  const variants = {
    primary: "bg-indigo-50 text-indigo-700 border-indigo-100",
    secondary: "bg-slate-50 text-slate-700 border-slate-100",
    success: "bg-emerald-50 text-emerald-700 border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border-amber-100",
    danger: "bg-rose-50 text-rose-700 border-rose-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
