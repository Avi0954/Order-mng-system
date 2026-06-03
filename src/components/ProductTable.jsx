"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, AlertCircle, RefreshCw } from "lucide-react";

export default function ProductTable({ products, onDelete }) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

  const handleDeleteTrigger = (id) => {
    setDeleteConfirmId(id);
    setActionError("");
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const handleDeleteConfirm = async (id) => {
    setIsDeleting(true);
    setActionError("");

    try {
      const res = await onDelete(id);
      if (res?.success) {
        setDeleteConfirmId(null);
      } else {
        setActionError(res?.error || "Failed to delete product.");
      }
    } catch (err) {
      console.error(err);
      setActionError("An error occurred during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 bg-white border border-slate-200 rounded-2xl">
        <p className="text-sm font-semibold">No products found matching the criteria.</p>
        <p className="text-xs text-slate-400 mt-1">Try expanding your search query or register a new product.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {actionError && (
        <div className="bg-rose-50 text-rose-600 border-b border-rose-100 p-4 flex items-center space-x-2 text-xs font-semibold">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-semibold">
            <tr>
              <th scope="col" className="px-6 py-4">Product Name</th>
              <th scope="col" className="px-6 py-4">SKU Code</th>
              <th scope="col" className="px-6 py-4">Base Unit</th>
              <th scope="col" className="px-6 py-4 text-right">Price per Base Unit</th>
              <th scope="col" className="px-6 py-4 text-right">Stock Quantity</th>
              <th scope="col" className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {products.map((prod) => {
              const isConfirmingDelete = deleteConfirmId === prod.id;

              return (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{prod.name}</div>
                    {prod.description && (
                      <div className="text-xs text-slate-400 truncate max-w-xs">{prod.description}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{prod.sku}</td>
                  <td className="px-6 py-4 text-slate-500">{prod.baseUnit}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">
                    ₹{prod.pricePerBaseUnit.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600 font-medium">
                    {prod.stockQuantity.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {isConfirmingDelete ? (
                      <div className="inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 animate-pulse">
                        <span>Delete?</span>
                        <button
                          onClick={() => handleDeleteConfirm(prod.id)}
                          disabled={isDeleting}
                          className="px-2 py-0.5 bg-rose-600 text-white rounded hover:bg-rose-500 transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? "..." : "Yes"}
                        </button>
                        <button
                          onClick={handleDeleteCancel}
                          disabled={isDeleting}
                          className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        {/* Edit Link */}
                        <Link
                          href={`/admin/products/edit/${prod.id}`}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-all"
                          title="Edit Product"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteTrigger(prod.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-all"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
