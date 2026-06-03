import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, History, Box, Tag, Layers, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminInventoryDetailsPage({ params }) {
  // Server-side security check removed for admin routes

  // Await the dynamic parameters
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    redirect("/admin/inventory");
  }

  // Query product and transactions
  const product = await prisma.product.findUnique({
    where: { id: parsedId },
    include: {
      inventoryTransactions: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  const getStatusBadge = (stockQty, threshold) => {
    const stock = Number(stockQty);
    const minThreshold = Number(threshold);

    if (stock <= 0) {
      return {
        label: "Out Of Stock",
        className: "bg-rose-50 text-rose-700 border-rose-100",
        icon: XCircle,
      };
    }
    if (stock <= minThreshold) {
      return {
        label: "Low Stock Alert",
        className: "bg-amber-50 text-amber-700 border-amber-100",
        icon: AlertTriangle,
      };
    }
    return {
      label: "In Stock (Fulfillment Ready)",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: CheckCircle2,
    };
  };

  const getActionBadgeClass = (actionType) => {
    switch (actionType) {
      case "PRODUCT_CREATED":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "PRODUCT_UPDATED":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "ORDER_APPROVED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "MANUAL_ADJUSTMENT":
        return "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  const statusInfo = getStatusBadge(product.stockQuantity, product.lowStockThreshold);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Link */}
        <div className="mb-4">
          <Link href="/admin/inventory" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Inventory Dashboard</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PageHeader
            title={product.name}
            subtitle={`Specifications & transaction ledger for SKU code: ${product.sku}`}
          />
          <span className={`inline-flex items-center space-x-1 text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full border uppercase self-start sm:self-auto ${statusInfo.className}`}>
            <StatusIcon className="h-4 w-4 shrink-0" />
            <span>{statusInfo.label}</span>
          </span>
        </div>

        {/* Specifications Matrix */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Box className="h-4.5 w-4.5 text-indigo-600" />
            <span>Product Specifications Overview</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Stock Quantity</p>
              <p className="font-black text-lg text-slate-900 mt-1">
                {Number(product.stockQuantity).toLocaleString("en-IN")} {product.baseUnit}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Measurement Unit</p>
              <p className="font-bold text-slate-700 mt-1 uppercase">{product.baseUnit}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Low Stock Threshold Limit</p>
              <p className="font-bold text-slate-700 mt-1">
                {Number(product.lowStockThreshold).toLocaleString("en-IN")} {product.baseUnit}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Base Invoice Rate</p>
              <p className="font-bold text-slate-900 mt-1">
                ₹{Number(product.pricePerBaseUnit).toFixed(4)} / {product.baseUnit}
              </p>
            </div>
          </div>

          {product.description && (
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-bold text-slate-400 uppercase tracking-wider mb-1">Catalog Description</p>
              <p className="leading-relaxed font-medium">{product.description}</p>
            </div>
          )}
        </div>

        {/* Transaction History Log Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center space-x-2 bg-slate-50/50">
            <History className="h-5 w-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-sm">Historical Warehouse Stock Transactions</h3>
          </div>

          {product.inventoryTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Transaction ID</th>
                    <th scope="col" className="px-6 py-4">Action Event</th>
                    <th scope="col" className="px-6 py-4 text-right">Quantity Delta</th>
                    <th scope="col" className="px-6 py-4">Date Recorded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                  {product.inventoryTransactions.map((tx) => {
                    const delta = Number(tx.quantityChanged);
                    const isPositive = delta > 0;

                    return (
                      <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                        {/* ID */}
                        <td className="px-6 py-4 text-slate-900 font-bold">#{tx.id}</td>

                        {/* Event */}
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border uppercase ${getActionBadgeClass(tx.actionType)}`}>
                            {tx.actionType.replace("_", " ")}
                          </span>
                        </td>

                        {/* Delta */}
                        <td className={`px-6 py-4 text-right font-extrabold font-mono text-sm ${
                          isPositive ? "text-emerald-600" : "text-rose-600"
                        }`}>
                          {isPositive ? "+" : ""}{delta.toLocaleString("en-IN")} {product.baseUnit}
                        </td>

                        {/* Created At */}
                        <td className="px-6 py-4 text-slate-500 text-xs">
                          {new Date(tx.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs font-semibold">
              No historical log modifications have registered yet for this product.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
