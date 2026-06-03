import { getProductById } from "@/actions/productActions";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCalculator from "./product-calculator";
import { ArrowLeft, Box, Scale, Layers, IndianRupee, FileText, Info } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetailsPage({ params }) {
  // Enforce session check
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Await the dynamic parameters
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const isUserAdmin = session.user.role === "ADMIN";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation Link */}
        <div className="flex items-center justify-between">
          <Link
            href={isUserAdmin ? "/admin/products" : "/products"}
            className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to catalog</span>
          </Link>
          
          {isUserAdmin && (
            <Link
              href={`/admin/products/edit/${product.id}`}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100/50 border border-indigo-100 rounded-lg"
            >
              Edit Product Record
            </Link>
          )}
        </div>

        <PageHeader
          title={product.name}
          subtitle={`Details page for unique SKU code: ${product.sku}`}
        />

        {/* Product Details Layout */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Card Accent Banner */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white">
            <span className="text-xs font-extrabold tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full uppercase">
              SKU: {product.sku}
            </span>
            <h2 className="text-2xl font-bold mt-2.5">{product.name}</h2>
          </div>

          <div className="p-8 space-y-6">
            {/* Description Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center space-x-1.5">
                <FileText className="h-4 w-4" />
                <span>Description</span>
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {product.description || "No detailed description was logged for this product."}
              </p>
            </div>

            {/* Grid properties */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-slate-100">
              
              {/* Unit Card */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                <Scale className="h-5 w-5 text-indigo-500 mb-2" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Measurement Unit</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">{product.baseUnit}</p>
                </div>
              </div>

              {/* Price Card */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                <span className="text-indigo-500 font-bold text-sm mb-2">₹</span>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Price per Unit</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">₹{product.pricePerBaseUnit.toFixed(4)}</p>
                </div>
              </div>

              {/* Stock Card */}
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-between">
                <Layers className="h-5 w-5 text-indigo-500 mb-2" />
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available Stock Level</p>
                  <p className="text-lg font-extrabold text-slate-900 mt-1">
                    {product.stockQuantity.toLocaleString("en-IN")} units
                  </p>
                </div>
              </div>

            </div>

            {/* Price Estimator Calculator */}
            <ProductCalculator product={product} />
          </div>
        </div>

        {/* Next.js Dynamic Routing explanation card */}
        <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center space-x-2">
            <Info className="h-5 w-5 text-indigo-400" />
            <span>💡 How Next.js Dynamic Routes Work</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            This route is mapped to <code>src/app/products/[id]/page.jsx</code>. In Next.js App Router, placing a folder name in square brackets (e.g. <code>[id]</code>) instructs the framework to treat that segment as a dynamic parameter. 
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 mr-2.5 shrink-0" />
              <span>
                <strong>Parameter Destructuring:</strong> The component receives a <code>params</code> prop. We extract the unique product key via <code>const { id } = await params;</code>.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 mr-2.5 shrink-0" />
              <span>
                <strong>Static & Dynamic Paths:</strong> If a user requests <code>/products/3</code>, Next.js matches this dynamic route, passes <code>id = &quot;3&quot;</code>, queries product ID 3 from Neon, and renders the view.
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
