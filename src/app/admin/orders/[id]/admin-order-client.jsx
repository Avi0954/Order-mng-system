"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/actions/orderActions";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, User, Mail, Shield, CheckCircle2, XCircle, AlertCircle, Calculator } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminOrderClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    setError("");

    try {
      const res = await updateOrderStatus(order.id, newStatus);
      if (res.success) {
        setStatus(newStatus);
        router.refresh();
      } else {
        setError(res.error || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during communication with server.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (s) => {
    switch (s) {
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
          <Link href="/admin/orders" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Orders</span>
          </Link>
        </div>

        {error && (
          <div className="bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-xl flex items-start space-x-2 text-sm font-medium">
            <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageHeader
            title={`Audit Order: #${order.id}`}
            subtitle={`Registered: ${new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          />
          
          <div className="flex items-center space-x-3.5 self-start md:self-auto">
            <span className={`inline-flex items-center text-xs font-bold tracking-wider px-3.5 py-1.5 rounded-full border uppercase ${getStatusBadgeClass(status)}`}>
              {status}
            </span>
            
            {status === "PENDING" && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStatusChange("APPROVED")}
                  disabled={loading}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleStatusChange("REJECTED")}
                  disabled={loading}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Reject</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2">
            <User className="h-4.5 w-4.5 text-indigo-600" />
            <span>Customer Information</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Name</p>
              <p className="font-bold text-slate-800 mt-1">{order.user?.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Email Address</p>
              <p className="text-slate-600 mt-1 flex items-center space-x-1">
                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="font-medium">{order.user?.email}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Authorization Role</p>
              <p className="text-slate-600 mt-1 flex items-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="font-bold uppercase text-xs">{order.user?.role}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Calculations Verification list */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-800 text-sm">Verify Conversions & Calculations Correctness</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th scope="col" className="px-6 py-4">Product Name</th>
                  <th scope="col" className="px-6 py-4 text-right">Client Quantity</th>
                  <th scope="col" className="px-6 py-4 text-center">Conversion Ratio</th>
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
                      <td className="px-6 py-4 text-right font-bold text-slate-850">
                        {item.orderedQuantity} {item.orderedUnit}
                      </td>

                      {/* Conversion Ratio */}
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

      </div>
    </div>
  );
}
