import Image from "next/image";
import { Package, AlertTriangle } from "lucide-react";

export default function ProductCard({ product }) {
  const { name, price, unit, image, category, stock } = product;

  // Format stock for display
  const displayStock = stock >= 1000 ? `${stock / 1000}k` : stock;
  const isLowStock = stock < 500;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Panel */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || "https://images.unsplash.com/photo-1553413719-875873751d53?w=500"}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {category && (
          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {category}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ₹{price}
            <span className="text-xs font-normal text-slate-500">/{unit}</span>
          </p>
        </div>

        {/* Stock Status Badge */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center space-x-1.5">
            <Package className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-500">
              Stock: {displayStock} {unit === "item" ? "pcs" : unit}
            </span>
          </div>

          <span
            className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isLowStock
                ? "bg-rose-50 text-rose-600 border border-rose-100"
                : "bg-emerald-50 text-emerald-600 border border-emerald-100"
            }`}
          >
            {isLowStock && <AlertTriangle className="h-3 w-3 mr-0.5" />}
            {isLowStock ? "Low Stock" : "In Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}
