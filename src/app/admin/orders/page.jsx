import { getAllOrders } from "@/actions/orderActions";
import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import { ArrowLeft, Clock, ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminOrdersDashboard() {
  // Server-side security check removed for admin routes

  // Load all system orders
  const orders = await getAllOrders();

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
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation header */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin Console</span>
          </Link>
        </div>

        <PageHeader
          title="All System Orders Ledger"
          subtitle="Audit incoming seller requests, verify measurement calculations, and issue approvals."
        />

        {orders.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Order ID</th>
                    <th scope="col" className="px-6 py-4">Customer Account</th>
                    <th scope="col" className="px-6 py-4">Date Logged</th>
                    <th scope="col" className="px-6 py-4">Fulfillment Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Total Amount</th>
                    <th scope="col" className="px-6 py-4 text-center">Audit Calculations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* ID */}
                      <td className="px-6 py-4 text-slate-900 font-bold">#{order.id}</td>

                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <div className="text-slate-900 font-semibold">{order.user?.name || "Anonymous User"}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{order.user?.email}</div>
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border uppercase ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Total Amount */}
                      <td className="px-6 py-4 text-right text-slate-950 font-extrabold">
                        ₹{order.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>

                      {/* Inspect details link */}
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                        >
                          <span>Verify</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-16 text-center text-slate-500 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <ShieldAlert className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-semibold">No order logs registered in system.</p>
            <p className="text-xs text-slate-400 mt-1">Pending seller checkouts will register here automatically.</p>
          </div>
        )}
      </div>
    </div>
  );
}
