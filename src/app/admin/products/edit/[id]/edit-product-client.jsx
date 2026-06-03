"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/productActions";
import ProductForm from "@/components/ProductForm";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function EditProductClient({ product }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Call updateProduct Server Action
      const res = await updateProduct(product.id, formData);

      if (res.success) {
        setSuccess(true);
        // Redirect back to list after short delay
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else {
        setError(res.error || "Failed to update product.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected connection error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Navigation Link */}
        <div className="mb-4">
          <Link href="/admin/products" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Cancel and back to list</span>
          </Link>
        </div>

        <PageHeader
          title={`Edit Product: ${product.name}`}
          subtitle="Modify high-precision catalog values. Modifications are saved to PostgreSQL."
        />

        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-xl flex items-start space-x-2 text-sm font-medium">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-4 rounded-xl flex items-start space-x-2 text-sm font-medium animate-bounce">
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Product Updated Successfully!</p>
                <p className="text-xs text-emerald-600 mt-0.5">Redirecting to product list...</p>
              </div>
            </div>
          )}

          <ProductForm
            initialData={product}
            onSubmit={handleFormSubmit}
            submitButtonText="Update Product SKU"
            loading={loading || success}
          />
        </div>
      </div>
    </div>
  );
}
