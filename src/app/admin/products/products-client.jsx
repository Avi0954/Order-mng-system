"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductSearch from "@/components/ProductSearch";
import ProductTable from "@/components/ProductTable";
import { deleteProduct } from "@/actions/productActions";
import { Plus, Package, Layers, ShieldCheck, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsClient({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Handle product deletion inside local state on success
  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    if (res.success) {
      setProducts(products.filter((p) => p.id !== id));
      router.refresh();
    }
    return res;
  };

  // Filter products by Name or SKU in real-time
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.sku.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  // Compute dashboard metrics
  const totalProductsCount = products.length;
  const totalStockQuantitySum = useMemo(() => {
    return products.reduce((sum, p) => sum + p.stockQuantity, 0);
  }, [products]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin Console</span>
          </Link>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
          >
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Link>
        </div>

        <PageHeader
          title="Product Inventory Management"
          subtitle="Add, inspect, modify, and delete inventory SKU items. Stored in Neon PostgreSQL."
        />

        {/* Dashboard metrics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Card 1: Unique SKU Count */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center space-x-4 shadow-sm hover:shadow-md transition-all">
            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Unique Products</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalProductsCount} SKUs</h3>
            </div>
          </div>

          {/* Card 2: Cumulative Inventory Count */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center space-x-4 shadow-sm hover:shadow-md transition-all">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
              <Layers className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Cumulative Stock Units</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                {totalStockQuantitySum.toLocaleString("en-IN")} units
              </h3>
            </div>
          </div>
        </div>

        {/* Search filtering panel */}
        <ProductSearch query={searchQuery} onQueryChange={setSearchQuery} />

        {/* Products catalog list table */}
        <ProductTable products={filteredProducts} onDelete={handleDelete} />

      </div>
    </div>
  );
}
