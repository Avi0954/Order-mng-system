import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  icon: Icon,
  disabled,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight rounded-2xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white border border-transparent shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 focus:ring-indigo-500",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-transparent focus:ring-slate-300",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 focus:ring-indigo-500",
    danger: "bg-rose-600 hover:bg-rose-500 text-white border border-transparent shadow-md shadow-rose-600/10 focus:ring-rose-500",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-transparent focus:ring-slate-200",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {!isLoading && Icon && <Icon className="h-4.5 w-4.5 shrink-0" />}
      {children}
    </button>
  );
}
