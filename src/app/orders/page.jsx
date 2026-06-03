import { getOrders } from "@/actions/orderActions";
import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import { ClipboardList, ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrderHistoryPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Load orders for current seller
  const orders = await getOrders();

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
        
        <PageHeader
          title="My Purchase Orders"
          subtitle="Audit transaction history, verify estimated invoice pricing, and check dispatch status."
        />

        {orders.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th scope="col" className="px-6 py-4">Order ID</th>
                    <th scope="col" className="px-6 py-4">Date Logged</th>
                    <th scope="col" className="px-6 py-4">Fulfillment Status</th>
                    <th scope="col" className="px-6 py-4 text-right">Total Amount</th>
                    <th scope="col" className="px-6 py-4 text-center">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-900 font-bold">#{order.id}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border uppercase ${getStatusBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-950 font-extrabold">
                        ₹{order.totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/orders/${order.id}`}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                          <span>Breakdown</span>
                          <ArrowRight className="h-3 w-3" />
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
            <ClipboardList className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-semibold">No order logs found.</p>
            <p className="text-xs text-slate-400 mt-1">Place an order from the active quotation window.</p>
          </div>
        )}
      </div>
    </div>
  );
}
