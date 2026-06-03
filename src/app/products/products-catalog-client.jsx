"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductSearch from "@/components/ProductSearch";
import { getUnitCategory } from "@/lib/unitConverter";
import { ArrowUpRight, Scale, Layers, IndianRupee, LayoutGrid, Ruler, Droplet, Hash } from "lucide-react";

export default function ProductsCatalogClient({ initialProducts }) {
  const [products] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all"); // 'all', 'weight', 'volume', 'count'

  // Dynamic filter lists using unit converter categories and search inputs
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Search Query filter (Name or SKU)
      const matchesSearch =
        !searchQuery.trim() ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Unit category filter
      const prodCategory = getUnitCategory(prod.baseUnit);
      const matchesCategory =
        categoryFilter === "all" || prodCategory === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <PageHeader
          title="Product Inventory Catalog"
          subtitle="Search catalog specifications, view available weights or counts, and calculate order prices."
        />

        {/* Filter controls panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Search bar */}
          <div className="lg:col-span-2">
            <ProductSearch query={searchQuery} onQueryChange={setSearchQuery} />
          </div>

          {/* Unit category filter select group */}
          <div className="flex bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm items-center space-x-1.5">
            <button
              onClick={() => setCategoryFilter("all")}
              className={`flex-grow flex items-center justify-center space-x-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                categoryFilter === "all"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>All</span>
            </button>
            
            <button
              onClick={() => setCategoryFilter("weight")}
              className={`flex-grow flex items-center justify-center space-x-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                categoryFilter === "weight"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Weight</span>
            </button>
            
            <button
              onClick={() => setCategoryFilter("volume")}
              className={`flex-grow flex items-center justify-center space-x-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                categoryFilter === "volume"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Droplet className="h-3.5 w-3.5" />
              <span>Volume</span>
            </button>
            
            <button
              onClick={() => setCategoryFilter("count")}
              className={`flex-grow flex items-center justify-center space-x-1 py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                categoryFilter === "count"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Hash className="h-3.5 w-3.5" />
              <span>Count</span>
            </button>
          </div>
        </div>

        {/* Product Cards Layout Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => {
              const category = getUnitCategory(prod.baseUnit);
              
              return (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-extrabold tracking-widest bg-slate-100 text-slate-500 border border-slate-200/60 px-2.5 py-1 rounded-full uppercase font-mono">
                        {prod.sku}
                      </span>
                      <span className={`inline-flex items-center text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded-md uppercase ${
                        category === "weight" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                        category === "volume" ? "bg-indigo-50 text-indigo-700 border border-indigo-100" :
                        "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      }`}>
                        {category}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {prod.name}
                    </h4>
                    {prod.description && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    )}
                  </div>

                  {/* Core Metrics */}
                  <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unit Rate</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">₹{prod.pricePerBaseUnit.toFixed(4)} / {prod.baseUnit}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stock Available</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-1">
                        {prod.stockQuantity.toLocaleString("en-IN")} {prod.baseUnit}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6">
                    <Link
                      href={`/products/${prod.id}`}
                      className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all group-hover:shadow-md"
                    >
                      <span>Calculate Order Pricing</span>
                      <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center text-slate-500 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <p className="text-base font-semibold">No catalog matches found.</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
