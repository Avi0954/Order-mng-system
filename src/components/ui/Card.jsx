import React from "react";

export default function Card({
  children,
  className = "",
  header,
  footer,
  title,
  subtitle,
  ...props
}) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden ${className}`}
      {...props}
    >
      {/* Card Header */}
      {(header || title || subtitle) && (
        <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          {header ? (
            header
          ) : (
            <div className="space-y-1">
              {title && <h3 className="font-extrabold text-slate-900 text-sm">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
            </div>
          )}
        </div>
      )}

      {/* Card Body */}
      <div className="p-6">{children}</div>

      {/* Card Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/20">{footer}</div>
      )}
    </div>
  );
}
