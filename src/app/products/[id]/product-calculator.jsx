"use client";

import { useState, useMemo } from "react";
import { convertToBaseUnit, getAvailableUnits } from "@/lib/unitConverter";
import { useOrder } from "@/context/OrderContext";
import QuantitySelector from "@/components/QuantitySelector";
import PricePreview from "@/components/PricePreview";
import { ShoppingCart, Plus, Check } from "lucide-react";

export default function ProductCalculator({ product }) {
  const allowedUnits = useMemo(() => getAvailableUnits(product.baseUnit), [product.baseUnit]);
  const { addToCart } = useOrder();
  
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState(product.baseUnit);
  const [feedback, setFeedback] = useState("");

  // High-precision calculations based on inputs and converter rules
  const convertedQty = useMemo(() => {
    const qtyVal = parseFloat(quantity);
    if (isNaN(qtyVal) || qtyVal <= 0) return 0;
    try {
      return convertToBaseUnit(qtyVal, unit, product.baseUnit);
    } catch (err) {
      console.error(err);
      return 0;
    }
  }, [quantity, unit, product.baseUnit]);

  const estimatedPrice = useMemo(() => {
    return convertedQty * product.pricePerBaseUnit;
  }, [convertedQty, product.pricePerBaseUnit]);

  const handleAddClick = () => {
    addToCart(product, quantity, unit);
    setFeedback("Product added to active quotation cart!");
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
      {/* Selector Container */}
      <div className="space-y-6">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-5">
          <h4 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
            <ShoppingCart className="h-4.5 w-4.5 text-indigo-500" />
            <span>Select Purchase Options</span>
          </h4>
          <p className="text-xs text-slate-400 leading-normal">
            Choose custom units and input order values. The system converts it dynamically to the base tracking unit (<code>{product.baseUnit}</code>) to calculate invoice rates.
          </p>

          <QuantitySelector
            quantity={quantity}
            selectedUnit={unit}
            allowedUnits={allowedUnits}
            onQuantityChange={setQuantity}
            onUnitChange={setUnit}
          />

          {/* Add to Quotation Button */}
          <button
            onClick={handleAddClick}
            disabled={parseFloat(quantity) <= 0 || isNaN(parseFloat(quantity))}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            <span>Add To Quotation</span>
          </button>

          {/* Success feedback toast inside card */}
          {feedback && (
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 p-3 rounded-xl flex items-center space-x-2 text-xs font-semibold animate-pulse">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>

      {/* Calculations Preview Container */}
      <div>
        <PricePreview
          productName={product.name}
          ratePerBaseUnit={product.pricePerBaseUnit}
          baseUnit={product.baseUnit}
          inputQuantity={quantity}
          inputUnit={unit}
          convertedQuantity={convertedQty}
          estimatedTotal={estimatedPrice}
          availableStock={product.stockQuantity}
        />
      </div>
    </div>
  );
}
