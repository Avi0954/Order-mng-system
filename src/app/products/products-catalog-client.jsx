"use client";

import { useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import ProductSearch from "@/components/ProductSearch";
import ProductFilters from "@/components/ProductFilters";
import ProductGrid from "@/components/ProductGrid";
import { getUnitCategory } from "@/lib/unitConverter";
import EmptyState from "@/components/ui/EmptyState";
import { Search } from "lucide-react";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          {/* Search bar */}
          <div className="lg:col-span-2">
            <ProductSearch query={searchQuery} onQueryChange={setSearchQuery} />
          </div>

          {/* Unit category filter component */}
          <div>
            <ProductFilters 
              categoryFilter={categoryFilter} 
              setCategoryFilter={setCategoryFilter} 
            />
          </div>
        </div>

        {/* Product Cards Layout Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <EmptyState
            title="No catalog matches found"
            description="Try clearing your search filters or modifying your search terms to locate products."
            icon={Search}
            action={
              (searchQuery || categoryFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("all");
                  }}
                  className="px-4 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition-all cursor-pointer"
                >
                  Clear Active Filters
                </button>
              )
            }
          />
        )}
      </div>
    </div>
  );
}
