"use client";

import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardCard from "@/components/DashboardCard";
import { mockProducts } from "@/data/mockProducts";
import { ShoppingBag, ClipboardList, Package, Layers, Activity, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // Compute metrics dynamically from mock data
  const totalProductTypes = mockProducts.length;
  const totalStockItems = mockProducts.reduce((sum, item) => sum + item.stock, 0);
  
  // Static mock stats for orders
  const totalOrders = 42;
  const pendingOrders = 8;
  const inventoryValue = mockProducts.reduce((sum, item) => sum + (item.price * item.stock), 0);

  // Format big numbers
  const formatNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  const activities = [
    { id: 1, message: "Stock alert: 'Gel Ink Pen' is running low (500 items remaining)", time: "10 mins ago", type: "warning" },
    { id: 2, message: "Order #1024 placed for 250g Basmati Rice by Amit K.", time: "42 mins ago", type: "info" },
    { id: 3, message: "Order #1023 shipped to Priya S. (1,000mL Organic Milk)", time: "2 hours ago", type: "success" },
    { id: 4, message: "Product catalog updated: 'Mineral Water' stock refilled", time: "5 hours ago", type: "success" },
    { id: 5, message: "System backup completed successfully", time: "1 day ago", type: "system" }
  ];

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 md:p-8 bg-slate-50">
        <PageHeader
          title="Operations Dashboard"
          subtitle="Real-time commercial analytics, inventory counts, and processing queues."
        />

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Product Lines"
            value={totalProductTypes}
            icon={ShoppingBag}
            trend="+2 added this week"
            trendType="positive"
          />
          <DashboardCard
            title="Total Orders Booked"
            value={totalOrders}
            icon={ClipboardList}
            trend="+15% vs last month"
            trendType="positive"
          />
          <DashboardCard
            title="Total Stock Units"
            value={formatNumber(totalStockItems)}
            icon={Package}
            trend="99.2% fulfillment rate"
            trendType="positive"
          />
          <DashboardCard
            title="Inventory Valuation"
            value={`₹${formatNumber(Math.round(inventoryValue))}`}
            icon={Layers}
            trend="Active catalog asset cost"
            trendType="positive"
          />
        </div>

        {/* Bottom Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Analytics Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                <span>Inventory Distribution & Category Overview</span>
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-600">Groceries & Staples</span>
                  <span className="text-slate-800 font-bold">670,000 g</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-600">Beverages</span>
                  <span className="text-slate-800 font-bold">25,400 units/g</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-600">Dairy Products</span>
                  <span className="text-slate-800 font-bold">80,000 mL</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span className="text-slate-600">Stationery</span>
                  <span className="text-slate-800 font-bold">620 items</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "3%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Operations Log */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
                <Activity className="h-5 w-5 text-indigo-500" />
                <span>Live Event Logs</span>
              </h3>
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
            </div>

            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((act, actIdx) => (
                  <li key={act.id}>
                    <div className="relative pb-6">
                      {actIdx !== activities.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            act.type === "warning" ? "bg-rose-50 text-rose-500" :
                            act.type === "success" ? "bg-emerald-50 text-emerald-500" :
                            act.type === "info" ? "bg-blue-50 text-blue-500" : "bg-slate-100 text-slate-500"
                          }`}>
                            <span className="text-[10px] font-bold">LOG</span>
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-xs text-slate-700">{act.message}</p>
                          </div>
                          <div className="text-right text-[10px] whitespace-nowrap text-slate-400">
                            <time>{act.time}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
