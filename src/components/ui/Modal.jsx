import React from "react";
import { X } from "lucide-react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = "",
  ...props
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" {...props}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Centered Modal Content Wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className={`relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg ${className}`}>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
            {title ? (
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">
                {title}
              </h3>
            ) : (
              <div />
            )}
            <button
              onClick={onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 text-sm text-slate-600">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-4 bg-slate-50/30">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
