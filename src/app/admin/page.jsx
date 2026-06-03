import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ClipboardList,
  RefreshCw,
  ShieldCheck,
  Settings,
  Users,
  FileBarChart,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ShieldAlert,
  ShoppingBag
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Server-side security check: must be logged in as ADMIN
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Fetch real-time count metrics from Neon PostgreSQL
  const activeProductsCount = await prisma.product.count();
  const stockAggregate = await prisma.product.aggregate({
    _sum: { stockQuantity: true },
  });
  const totalStockAmount = Number(stockAggregate._sum.stockQuantity || 0);
  const totalOrders = await prisma.order.count();
  const pendingOrdersCount = await prisma.order.count({ where: { status: "PENDING" } });
  const approvedOrdersCount = await prisma.order.count({ where: { status: "APPROVED" } });
  const rejectedOrdersCount = await prisma.order.count({ where: { status: "REJECTED" } });

  const allProducts = await prisma.product.findMany({
    select: { stockQuantity: true, lowStockThreshold: true },
  });
  const lowStockCount = allProducts.filter(
    (p) => Number(p.stockQuantity) > 0 && Number(p.stockQuantity) <= Number(p.lowStockThreshold)
  ).length;
  const outOfStockCount = allProducts.filter((p) => Number(p.stockQuantity) <= 0).length;

  const adminStats = [
    { name: "Total Products", count: activeProductsCount, icon: ShoppingBag, color: "text-indigo-400" },
    { name: "Total Orders", count: totalOrders, icon: ClipboardList, color: "text-blue-400" },
    { name: "Pending Orders", count: pendingOrdersCount, icon: Clock, color: "text-amber-400" },
    { name: "Approved Orders", count: approvedOrdersCount, icon: CheckCircle, color: "text-emerald-400" },
    { name: "Rejected Orders", count: rejectedOrdersCount, icon: XCircle, color: "text-rose-400" },
    { name: "Low Stock Products", count: lowStockCount, icon: AlertTriangle, color: "text-amber-500" },
    { name: "Out of Stock", count: outOfStockCount, icon: ShieldAlert, color: "text-rose-500" },
  ];

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 md:p-8 bg-slate-50">
        <PageHeader
          title="Administrative Portal"
          subtitle="Configure system variables, manage products & inventory, and audit invoices."
        />

        {/* Admin overview metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {adminStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 flex flex-col justify-between shadow-sm">
                <div className="p-2 bg-slate-800 text-indigo-400 rounded-lg self-start">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="mt-3">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider line-clamp-1">{stat.name}</p>
                  <p className="text-base font-black text-slate-100 mt-0.5">{stat.count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature catalog grid */}
        <h3 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
          <FileBarChart className="h-5 w-5 text-indigo-600" />
          <span>Core Operations</span>
        </h3>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Card 1: Product Catalog Management */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Package className="h-6 w-6" />
                </div>
                <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  SKUs Active: {activeProductsCount}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Manage Product Catalog</h4>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed font-medium">
                Add new products, edit catalog specifications, delete discontinued items, and search current list SKU codes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col space-y-2">
              <Link
                href="/admin/products"
                className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10"
              >
                Go to Products List
              </Link>
              <Link
                href="/admin/products/new"
                className="w-full text-center bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-100 text-slate-600 hover:text-indigo-600 text-xs font-semibold py-2.5 rounded-xl transition-all"
              >
                Create Product Form
              </Link>
            </div>
          </div>

          {/* Card 2: Inventory Tracking */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Total Items: {totalStockAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">Manage Inventory Logs</h4>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Directly adjust warehouse stocks, update thresholds for low-stock warnings, and trigger bulk restocks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/admin/inventory"
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10"
              >
                Go to Inventory Dashboard
              </Link>
            </div>
          </div>

          {/* Card 3: Orders Ledger */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Pending: {pendingOrdersCount}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">View Order Ledger</h4>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Supervise outgoing transactions, manually dispatch pending orders, print packaging receipts, and issue approvals.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/admin/orders"
                className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10"
              >
                Go to Orders Ledger
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
