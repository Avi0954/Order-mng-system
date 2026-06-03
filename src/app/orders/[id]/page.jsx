import { getOrderById } from "@/actions/orderActions";
import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, Box, Scale, Layers, CheckCircle, Calculator, Info } from "lucide-react";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({ params }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Await the dynamic URL parameters
  const { id } = await params;

  let order;
  try {
    order = await getOrderById(id);
  } catch (err) {
    console.error(err);
    redirect("/orders");
  }

  if (!order) {
    notFound();
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Link */}
        <div className="mb-4">
          <Link href="/orders" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to My Orders</span>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <PageHeader
            title={`Order Specifications: #${order.id}`}
            subtitle={`Created on: ${new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
          <span className={`inline-flex items-center text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full border uppercase self-start sm:self-auto ${getStatusBadgeClass(order.status)}`}>
            {order.status}
          </span>
        </div>

        {/* Order Items Table and Breakdown */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-sm">Calculations Breakdown Verification</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4">Ordered Product</th>
                  <th scope="col" className="px-6 py-4 text-right">Client Quantity</th>
                  <th scope="col" className="px-6 py-4 text-center">Conversion Rule Factor</th>
                  <th scope="col" className="px-6 py-4 text-right">Converted Base Qty</th>
                  <th scope="col" className="px-6 py-4 text-right">Price per Base Unit</th>
                  <th scope="col" className="px-6 py-4 text-right">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                {order.orderItems.map((item) => {
                  const factor = item.baseQuantity / item.orderedQuantity;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name & SKU */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{item.product.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.product.sku}</div>
                      </td>

                      {/* Entered Quantity */}
                      <td className="px-6 py-4 text-right font-bold text-slate-800">
                        {item.orderedQuantity} {item.orderedUnit}
                      </td>

                      {/* Conversion Factor */}
                      <td className="px-6 py-4 text-center text-slate-400 text-xs font-mono">
                        1 {item.orderedUnit} = {factor.toLocaleString("en-IN")} {item.product.baseUnit}
                      </td>

                      {/* Converted base units */}
                      <td className="px-6 py-4 text-right font-mono text-xs text-slate-600 bg-slate-50/30">
                        {item.baseQuantity.toLocaleString("en-IN")} {item.product.baseUnit}
                      </td>

                      {/* Base Unit Rate */}
                      <td className="px-6 py-4 text-right text-slate-600 text-xs">
                        ₹{item.unitPrice.toFixed(4)} / {item.product.baseUnit}
                      </td>

                      {/* Line Subtotal */}
                      <td className="px-6 py-4 text-right font-extrabold text-slate-950">
                        ₹{item.lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grand Total Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm font-extrabold text-slate-500 uppercase tracking-wide">Grand Invoice Total</span>
            <span className="text-2xl font-black text-slate-900">
              ₹{order.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Audit explanation */}
        <div className="bg-slate-900 text-slate-300 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h4 className="font-bold text-white text-base flex items-center space-x-2">
            <Info className="h-5 w-5 text-indigo-400" />
            <span>💡 Auditing & Conversion Verification Guidance</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            The items listed above are audited automatically. By tracking quantities in absolute base parameters (grams, milliliters, items), the system enforces total pricing compatibility across multiple packaging sizes.
          </p>
        </div>

      </div>
    </div>
  );
}
