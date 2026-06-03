"use client";

import { useState } from "react";
import { ShoppingBag, Key, AlignLeft, Scale, IndianRupee, Layers, AlertCircle } from "lucide-react";

export default function ProductForm({ initialData = null, onSubmit, submitButtonText = "Save Product", loading = false }) {
  // Initialize form state variables directly from initialData properties
  const [name, setName] = useState(initialData?.name || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [baseUnit, setBaseUnit] = useState(initialData?.baseUnit || "item");
  const [pricePerBaseUnit, setPricePerBaseUnit] = useState(initialData?.pricePerBaseUnit?.toString() || "");
  const [stockQuantity, setStockQuantity] = useState(initialData?.stockQuantity?.toString() || "");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Form client-side validations
    if (!name.trim()) {
      setValidationError("Product Name is required.");
      return;
    }
    if (!sku.trim()) {
      setValidationError("SKU code is required.");
      return;
    }
    if (!pricePerBaseUnit || parseFloat(pricePerBaseUnit) < 0) {
      setValidationError("Price per Base Unit must be a positive number.");
      return;
    }
    if (stockQuantity === "" || parseFloat(stockQuantity) < 0) {
      setValidationError("Stock Quantity must be a valid non-negative number.");
      return;
    }

    // Submit callback
    onSubmit({
      name: name.trim(),
      sku: sku.trim().toUpperCase(),
      description: description.trim(),
      baseUnit,
      pricePerBaseUnit: parseFloat(pricePerBaseUnit),
      stockQuantity: parseFloat(stockQuantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {validationError && (
        <div className="bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-xl flex items-start space-x-2.5 text-sm font-medium">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label htmlFor="prod-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Product Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <ShoppingBag className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="prod-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Basmati Rice, Mineral Water, etc."
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label htmlFor="prod-sku" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            SKU Code <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="prod-sku"
              type="text"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder="PROD-RICE-001"
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Base Unit Dropdown */}
        <div>
          <label htmlFor="prod-unit" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Base Inventory Unit <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Scale className="h-5 w-5 text-slate-400" />
            </div>
            <select
              id="prod-unit"
              value={baseUnit}
              onChange={(e) => setBaseUnit(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all appearance-none"
            >
              <option value="g">Gram (g) — Weight</option>
              <option value="kg">Kilogram (kg) — Weight</option>
              <option value="mL">Milliliter (mL) — Volume</option>
              <option value="L">Liter (L) — Volume</option>
              <option value="item">Item (item) — Count</option>
            </select>
            {/* Custom chevron indicator */}
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Price Per Base Unit */}
        <div>
          <label htmlFor="prod-price" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Price per Base Unit (₹) <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <span className="text-slate-400 text-sm font-bold">₹</span>
            </div>
            <input
              id="prod-price"
              type="number"
              step="0.0001"
              min="0"
              required
              value={pricePerBaseUnit}
              onChange={(e) => setPricePerBaseUnit(e.target.value)}
              placeholder="0.08"
              className="block w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Stock Quantity */}
        <div>
          <label htmlFor="prod-stock" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Initial Stock Level <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Layers className="h-5 w-5 text-slate-400" />
            </div>
            <input
              id="prod-stock"
              type="number"
              step="0.0001"
              min="0"
              required
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              placeholder="250000"
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label htmlFor="prod-desc" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
            Description / Specifications
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 pt-3 flex items-start pointer-events-none">
              <AlignLeft className="h-5 w-5 text-slate-400" />
            </div>
            <textarea
              id="prod-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe product characteristics, packaging size, or grade details..."
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Form Buttons */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
        >
          {loading ? "Saving Changes..." : submitButtonText}
        </button>
      </div>
    </form>
  );
}
