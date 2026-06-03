"use client";

import { ClipboardList, IndianRupee, Layers } from "lucide-react";

export default function QuotationSummary({ totalProducts, grandTotal }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <h3 className="font-extrabold text-slate-900 text-base flex items-center space-x-2 pb-4 border-b border-slate-100">
        <ClipboardList className="h-5 w-5 text-indigo-600" />
        <span>Quotation Summary</span>
      </h3>

      <div className="space-y-4">
        {/* Total Unique Items */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold">Total Line Items</span>
          <span className="text-sm font-extrabold text-slate-800">{totalProducts} SKUs</span>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400">Grand Estimated Total</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
