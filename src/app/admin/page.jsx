import Sidebar from "@/components/Sidebar";
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
  ShoppingBag,
  Search,
  Bell,
  Plus,
  ArrowUpRight,
  Activity,
  Boxes,
  ActivitySquare
} from "lucide-react";
import Badge from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Server-side security check removed for admin routes
  const session = await getSession();
  const userName = session?.user?.name || "Admin";

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
    { name: "Total Products", count: activeProductsCount, icon: ShoppingBag, color: "text-indigo-600", trend: "↑ +12%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
    { name: "Total Orders", count: totalOrders, icon: ClipboardList, color: "text-blue-600", trend: "↑ +8%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
    { name: "Pending Orders", count: pendingOrdersCount, icon: Clock, color: "text-amber-500", trend: "↓ -4%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
    { name: "Approved Orders", count: approvedOrdersCount, icon: CheckCircle, color: "text-emerald-600", trend: "↑ +15%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
    { name: "Rejected Orders", count: rejectedOrdersCount, icon: XCircle, color: "text-rose-600", trend: "↓ -2%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
    { name: "Low Stock", count: lowStockCount, icon: AlertTriangle, color: "text-amber-600", trend: "↑ +3%", trendColor: "text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full" },
    { name: "Out of Stock", count: outOfStockCount, icon: ShieldAlert, color: "text-rose-600", trend: "↓ -10%", trendColor: "text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" },
  ];

  // Helper to get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      {/* Navigation Sidebar (returns null to let global layout handle sidebar rendering) */}
      <Sidebar />

      {/* Main Content Workspace inside a premium dark backdrop */}
      <main className="flex-grow p-6 md:p-8 bg-[#050816] text-white space-y-8">
        
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-900/60 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">Administrative Portal</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage products, inventory, orders, users and system settings.</p>
          </div>
          {/* Header Controls */}
          <div className="flex items-center space-x-4 self-start md:self-center">
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search portal..." 
                className="bg-[#090d23]/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 rounded-xl py-2.5 pl-8 pr-4 focus:outline-none focus:border-[#6D5DFB] transition-colors w-40 sm:w-48"
                disabled
              />
              <Search className="absolute left-2.5 top-3 h-3.5 w-3.5 text-slate-500" />
            </div>
            {/* Notification bell */}
            <button className="relative p-2 bg-[#090d23]/80 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-rose-500 rounded-full" />
            </button>
            {/* User credentials */}
            <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-900">
              <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-[#6D5DFB] to-[#38BDF8] flex items-center justify-center text-xs font-black text-white shadow-md shadow-[#6D5DFB]/10 shrink-0">
                {getInitials(userName)}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-300 leading-snug">{userName}</p>
                <Badge variant="purple" className="text-[8px] px-2 py-0.5 tracking-wider uppercase font-black mt-0.5">Admin</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS HORIZONTAL BAR */}
        <div className="bg-[#090d23]/60 border border-slate-900 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#38BDF8] px-2">Quick Actions:</span>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/products/new">
              <button className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Add Product</span>
              </button>
            </Link>
            <Link href="/orders">
              <button className="inline-flex items-center space-x-1.5 border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Create Order</span>
              </button>
            </Link>
            <Link href="/admin/inventory">
              <button className="inline-flex items-center space-x-1.5 border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Adjust Inventory</span>
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="inline-flex items-center space-x-1.5 border border-slate-800 bg-slate-950/40 text-slate-300 hover:text-white hover:border-slate-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer">
                <Plus className="h-3.5 w-3.5" />
                <span>Generate Report</span>
              </button>
            </Link>
          </div>
        </div>

        {/* KPI SECTION REDESIGN */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {adminStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.name} 
                className="bg-white border border-slate-200/80 text-slate-900 rounded-2xl p-4 flex flex-col justify-between h-[130px] hover:-translate-y-1 hover:shadow-md transition-all duration-300 shadow-xs select-none"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Icon className={`h-4.5 w-4.5 ${stat.color}`} />
                  </div>
                  <span className={`text-[9px] font-black tracking-wide ${stat.trendColor}`}>{stat.trend}</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block leading-none">{stat.name}</p>
                  <p className="text-xl font-black text-slate-950 mt-1 block leading-none">{stat.count}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CORE OPERATIONS GRID */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-white text-lg tracking-tight flex items-center space-x-2">
            <FileBarChart className="h-5 w-5 text-[#6D5DFB]" />
            <span>Core Operations</span>
          </h3>
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Card 1: Product Catalog */}
            <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[250px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Package className="h-5.5 w-5.5" />
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    SKUs Active: {activeProductsCount}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-950">Manage Product Catalog</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Add new products, edit specifications, remove discontinued items, and monitor SKU categories.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/admin/products"
                  className="flex-1 text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Products List
                </Link>
                <Link
                  href="/admin/products/new"
                  className="text-xs font-bold text-[#6D5DFB] hover:underline px-2 py-2 cursor-pointer shrink-0"
                >
                  Create Product
                </Link>
              </div>
            </div>

            {/* Card 2: Inventory Tracking */}
            <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[250px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <RefreshCw className="h-5.5 w-5.5" />
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Total Items: {totalStockAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-950">Manage Inventory Logs</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Adjust warehouse physical stock registers, inspect tracking thresholds, and view current valuations.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/admin/inventory"
                  className="flex-1 text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Inventory Dashboard
                </Link>
                <Link
                  href="/admin/inventory"
                  className="text-xs font-bold text-[#6D5DFB] hover:underline px-2 py-2 cursor-pointer shrink-0"
                >
                  Adjust Stock
                </Link>
              </div>
            </div>

            {/* Card 3: Orders Ledger */}
            <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[250px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <ClipboardList className="h-5.5 w-5.5" />
                  </div>
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Pending: {pendingOrdersCount}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-950">View Order Ledger</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Monitor order approval states, review quotation transactions, and oversee dispatcher schedules.
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <Link
                  href="/admin/orders"
                  className="flex-1 text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  Orders Dashboard
                </Link>
                <Link
                  href="/admin/orders"
                  className="text-xs font-bold text-[#6D5DFB] hover:underline px-2 py-2 cursor-pointer shrink-0"
                >
                  Review Requests
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* SYSTEM OVERVIEW GRID (Progress Telemetry Logs) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card left: System Overview */}
          <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-950 flex items-center space-x-2">
                <Boxes className="h-4.5 w-4.5 text-[#6D5DFB]" />
                <span>System Overview</span>
              </h3>
              <Badge variant="blue" className="text-[8px] tracking-wide uppercase font-black">Online</Badge>
            </div>
            
            {/* Progress Telemetry bars */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <span>Inventory Capacity Rate</span>
                  <span className="text-[#6D5DFB]">92%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-600 to-[#6D5DFB] rounded-full" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <span>Fulfillment Accuracy</span>
                  <span className="text-emerald-600">98.4%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: "98.4%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <span>Low Stock Alert Risk</span>
                  <span className="text-amber-600">5.2%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: "5.2%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card right: System Health indicator */}
          <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-950 flex items-center space-x-2">
                <ActivitySquare className="h-4.5 w-4.5 text-[#38BDF8]" />
                <span>Performance telemetry</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase">System: Normal</span>
            </div>
            
            {/* Visual statistics log items */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">API Latency</span>
                <span className="text-lg font-black text-slate-800 mt-1 block">42 ms</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">DB Queries</span>
                <span className="text-lg font-black text-slate-800 mt-1 block">99.98%</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-700">Database Sync Status</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Synced 1m ago</span>
            </div>
          </div>

        </div>

        {/* RECENT ACTIVITY SECTION (UI Tables/Cards) */}
        <div className="bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-950 flex items-center space-x-2">
              <Activity className="h-4.5 w-4.5 text-[#6D5DFB]" />
              <span>Recent System Activity Log</span>
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-widest font-black">
                  <th className="pb-3.5 font-bold">Event Type</th>
                  <th className="pb-3.5 font-bold">Details</th>
                  <th className="pb-3.5 font-bold">Executor</th>
                  <th className="pb-3.5 font-bold">Timestamp</th>
                  <th className="pb-3.5 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                <tr>
                  <td className="py-3.5 font-bold text-slate-900">Order Approved</td>
                  <td className="py-3.5 text-slate-500">Order #1042 dispatched to logistics</td>
                  <td className="py-3.5">{userName}</td>
                  <td className="py-3.5 text-slate-400">10 mins ago</td>
                  <td className="py-3.5 text-right"><span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Completed</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900">Stock Threshold Trigger</td>
                  <td className="py-3.5 text-slate-500">Basmati Rice fell below 500 units</td>
                  <td className="py-3.5">System Monitor</td>
                  <td className="py-3.5 text-slate-400">1 hr ago</td>
                  <td className="py-3.5 text-right"><span className="bg-amber-50 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Warning</span></td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900">Catalog Registry Update</td>
                  <td className="py-3.5 text-slate-500">Created new item: SKU-8822 (Whole Wheat)</td>
                  <td className="py-3.5">{userName}</td>
                  <td className="py-3.5 text-slate-400">3 hrs ago</td>
                  <td className="py-3.5 text-right"><span className="bg-blue-50 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Created</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
