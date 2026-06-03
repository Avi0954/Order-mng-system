import React from "react";
import Link from "next/link";
import { ArrowUpRight, Scale, Droplet, Hash, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { getUnitCategory } from "@/lib/unitConverter";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((prod) => {
        const category = getUnitCategory(prod.baseUnit);
        const price = Number(prod.pricePerBaseUnit);
        const stock = Number(prod.stockQuantity);
        const threshold = Number(prod.lowStockThreshold || 100);

        // Determine stock status properties
        let stockStatus = { label: "In Stock", variant: "success", icon: CheckCircle };
        if (stock === 0) {
          stockStatus = { label: "Out of Stock", variant: "danger", icon: AlertCircle };
        } else if (stock < threshold) {
          stockStatus = { label: "Low Stock", variant: "warning", icon: AlertTriangle };
        }

        const CategoryIcon = category === "weight" ? Scale : category === "volume" ? Droplet : Hash;

        return (
          <Card
            key={prod.id}
            className="group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Card Top Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold tracking-widest bg-slate-100 text-slate-500 border border-slate-200/60 px-2.5 py-1 rounded-full uppercase font-mono">
                  {prod.sku}
                </span>
                
                <Badge variant={stockStatus.variant} icon={stockStatus.icon}>
                  {stockStatus.label}
                </Badge>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                  {prod.name}
                </h4>
                {prod.description ? (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400 italic">No description provided.</p>
                )}
              </div>
            </div>

            {/* Core Metrics Footer */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price Unit</span>
                  <span className="text-xs font-extrabold text-slate-800 flex items-center space-x-1">
                    <span>₹{price.toFixed(2)}</span>
                    <span className="text-slate-400">/ {prod.baseUnit}</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Warehouse Stock</span>
                  <span className="text-xs font-extrabold text-slate-800 block">
                    {stock.toLocaleString("en-IN")} {prod.baseUnit}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Link href={`/products/${prod.id}`} className="block">
                  <Button
                    variant="primary"
                    className="w-full justify-center group-hover:bg-indigo-600 group-hover:shadow-md"
                    size="sm"
                  >
                    <span>Calculate Order Pricing</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
