"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { placeOrder } from "@/actions/orderActions";
import QuotationSummary from "@/components/QuotationSummary";
import PageHeader from "@/components/PageHeader";
import { getAvailableUnits } from "@/lib/unitConverter";
import { Trash2, AlertCircle, ShoppingBag, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuotationPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalProductsCount, grandTotal } = useOrder();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccessId, setOrderSuccessId] = useState(null);
  const router = useRouter();

  const handleQtyChange = (productId, val, unit) => {
    updateQuantity(productId, val, unit);
  };

  const handleUnitChange = (productId, qty, newUnit) => {
    updateQuantity(productId, qty, newUnit);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    setOrderSuccessId(null);

    try {
      const res = await placeOrder(cart);
      if (res.success) {
        setOrderSuccessId(res.orderId);
        clearCart(); // Clean cart on order placement
      } else {
        setError(res.error || "Failed to dispatch order.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected connection error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccessId) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl text-center shadow-md space-y-6 animate-bounce">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Order Placed Successfully!</h3>
            <p className="text-xs text-slate-400 mt-2">
              Transaction logged. Order reference code is <strong>#{orderSuccessId}</strong>.
            </p>
          </div>
          <div className="flex flex-col space-y-2 pt-2">
            <Link
              href={`/orders/${orderSuccessId}`}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-indigo-600/10"
            >
              Inspect Order Calculation Breakdowns
            </Link>
            <Link
              href="/products"
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold py-2.5 rounded-xl text-xs transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Your Quotation list is empty.</h3>
            <p className="text-xs text-slate-400 mt-1">Browse our products and add quantities to estimate invoice totals.</p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
          >
            <span>Browse Products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader
          title="Active Quotation Ledger"
          subtitle="Inspect conversion factors, verify estimated rates, and place your order."
        />

        {error && (
          <div className="bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-xl flex items-start space-x-2 text-sm font-medium">
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table list */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Product</th>
                    <th scope="col" className="px-6 py-4 text-center">Entered Quantity</th>
                    <th scope="col" className="px-6 py-4 text-right">Converted Quantity</th>
                    <th scope="col" className="px-6 py-4 text-right">Unit Rate</th>
                    <th scope="col" className="px-6 py-4 text-right">Line Total</th>
                    <th scope="col" className="px-6 py-4 text-center">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                  {cart.map((item) => {
                    const allowedUnits = getAvailableUnits(item.product.baseUnit);
                    return (
                      <tr key={item.product.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* Name & SKU */}
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{item.product.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.product.sku}</div>
                        </td>

                        {/* Input quantity & unit selector */}
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1.5 justify-center max-w-[150px] mx-auto border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                            <input
                              type="number"
                              min="0.0001"
                              step="any"
                              value={item.quantity}
                              onChange={(e) => handleQtyChange(item.product.id, e.target.value, item.unit)}
                              className="w-16 px-2 py-1.5 text-center text-xs bg-transparent focus:outline-none text-slate-800 font-bold"
                            />
                            <select
                              value={item.unit}
                              onChange={(e) => handleUnitChange(item.product.id, item.quantity, e.target.value)}
                              className="pr-4 py-1.5 text-center text-[10px] bg-transparent focus:outline-none text-slate-500 font-extrabold cursor-pointer border-l border-slate-200"
                            >
                              {allowedUnits.map((u) => (
                                <option key={u} value={u}>
                                  {u}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        {/* Converted base units */}
                        <td className="px-6 py-4 text-right font-mono text-xs text-slate-500">
                          {item.convertedQuantity.toLocaleString("en-IN")} {item.product.baseUnit}
                        </td>

                        {/* Base Unit Rate */}
                        <td className="px-6 py-4 text-right text-slate-600 text-xs">
                          ₹{item.product.pricePerBaseUnit.toFixed(4)} / {item.product.baseUnit}
                        </td>

                        {/* Line Subtotal */}
                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                          ₹{item.lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>

                        {/* Remove item */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quotation Summary panel */}
          <div className="space-y-6">
            <QuotationSummary totalProducts={totalProductsCount} grandTotal={grandTotal} />

            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-1.5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Confirm & Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
