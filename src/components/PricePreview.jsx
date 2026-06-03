"use client";

import { Calculator, AlertTriangle, ArrowRightLeft, DollarSign } from "lucide-react";

export default function PricePreview({
  productName,
  ratePerBaseUnit,
  baseUnit,
  inputQuantity,
  inputUnit,
  convertedQuantity,
  estimatedTotal,
  availableStock,
}) {
  const isOutOfStock = convertedQuantity > availableStock;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-slate-300 space-y-5 shadow-inner">
      <h3 className="font-bold text-white text-sm flex items-center space-x-2 pb-3 border-b border-slate-800">
        <Calculator className="h-4.5 w-4.5 text-indigo-400" />
        <span>Price Calculation Calculator Preview</span>
      </h3>

      {/* Conversion Step */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center space-x-2">
          <ArrowRightLeft className="h-4 w-4 text-indigo-400" />
          <span>Conversion Preview</span>
        </div>
        <div className="font-bold text-slate-200">
          {inputQuantity || "0"} {inputUnit} <span className="text-indigo-400">→</span> {convertedQuantity.toLocaleString("en-IN")} {baseUnit}
        </div>
      </div>

      {/* Detailed breakdown lines */}
      <div className="space-y-2 text-xs font-semibold">
        <div className="flex justify-between">
          <span className="text-slate-500 uppercase tracking-wider">Product Name</span>
          <span className="text-slate-200 font-bold">{productName}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 uppercase tracking-wider">Unit Rate</span>
          <span className="text-slate-200">₹{ratePerBaseUnit.toFixed(4)} / {baseUnit}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500 uppercase tracking-wider">Subtotal Quantity</span>
          <span className="text-slate-200">{convertedQuantity.toLocaleString("en-IN")} {baseUnit}</span>
        </div>
      </div>

      {/* Estimated total */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-400">Estimated Total</span>
        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
          ₹{estimatedTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Stock warning */}
      {isOutOfStock && (
        <div className="bg-rose-950/40 text-rose-400 border border-rose-900/50 p-3 rounded-xl flex items-start space-x-2 text-xs font-semibold">
          <AlertTriangle className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Stock Shortage Alert</p>
            <p className="text-[10px] text-rose-500/80 mt-0.5">
              Available: {availableStock.toLocaleString("en-IN")} {baseUnit}. Entering an order for this amount will result in insufficient stock.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
