import React from "react";
import { Loader2 } from "lucide-react";

export default function Loader({
  size = "md",
  label = "Loading information...",
  className = "",
  fullScreen = false,
  ...props
}) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const containerStyles = fullScreen
    ? "fixed inset-0 bg-slate-900/10 backdrop-blur-xs z-50 flex flex-col items-center justify-center space-y-3"
    : "flex flex-col items-center justify-center p-8 space-y-2.5 w-full";

  return (
    <div className={`${containerStyles} ${className}`} {...props}>
      <Loader2 className={`animate-spin text-indigo-600 ${sizes[size]}`} />
      {label && (
        <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
