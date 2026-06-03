"use client";

import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardCard from "@/components/DashboardCard";
import { mockProducts } from "@/data/mockProducts";
import Table, { TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { 
  ShoppingBag, 
  ClipboardList, 
  Clock, 
  AlertTriangle, 
  Activity, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Compute metrics dynamically from mock data
  const totalProducts = mockProducts.length;
  const lowStockCount = mockProducts.filter((item) => item.stock < 500).length;
  
  // Static mock stats for orders
  const totalOrders = 42;
  const pendingOrders = 8;

  const formatNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  const recentOrders = [
    { id: "ORD-1024", customer: "Amit Kumar", items: "250g Basmati Rice", amount: "₹4,250.00", status: "PENDING", date: "10 mins ago" },
    { id: "ORD-1023", customer: "Priya Sharma", items: "1,000mL Organic Milk", amount: "₹1,890.00", status: "APPROVED", date: "42 mins ago" },
    { id: "ORD-1022", customer: "Rajesh Patel", items: "500g Whole Wheat Flour", amount: "₹850.00", status: "APPROVED", date: "2 hours ago" },
    { id: "ORD-1021", customer: "Sneha Reddy", items: "10x Gel Ink Pens", amount: "₹12,400.00", status: "REJECTED", date: "5 hours ago" },
    { id: "ORD-1020", customer: "Vikram Malhotra", items: "3x Hardcover Notebooks", amount: "₹3,150.00", status: "APPROVED", date: "1 day ago" }
  ];

  const activities = [
    { id: 1, message: "Stock alert: 'Gel Ink Pen' is running low (500 items remaining)", time: "10 mins ago", type: "warning" },
    { id: 2, message: "Order #1024 placed for 250g Basmati Rice by Amit K.", time: "42 mins ago", type: "info" },
    { id: 3, message: "Order #1023 shipped to Priya S. (1,000mL Organic Milk)", time: "2 hours ago", type: "success" },
    { id: 4, message: "Product catalog updated: 'Mineral Water' stock refilled", time: "5 hours ago", type: "success" },
  ];

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 md:p-8 bg-slate-50 space-y-8">
        
        {/* Top: Page Header */}
        <PageHeader
          title="Seller Dashboard"
          subtitle="Real-time commercial analytics, order pipelines, and warehouse operations."
        />

        {/* Middle: Statistics KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Products"
            value={totalProducts}
            icon={ShoppingBag}
            trend="Active catalog lines"
            trendType="positive"
          />
          <DashboardCard
            title="Total Orders"
            value={totalOrders}
            icon={ClipboardList}
            trend="+15% vs last month"
            trendType="positive"
          />
          <DashboardCard
            title="Pending Orders"
            value={pendingOrders}
            icon={Clock}
            trend="Needs authorization"
            trendType="warning"
          />
          <DashboardCard
            title="Low Stock Products"
            value={lowStockCount}
            icon={AlertTriangle}
            trend="Below threshold limits"
            trendType="danger"
          />
        </div>

        {/* Bottom: Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Orders Section */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
                Recent Customer Orders
              </h2>
              <Link 
                href="/orders" 
                className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                <span>View all orders</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>ID</TableCell>
                  <TableCell isHeader>Customer</TableCell>
                  <TableCell isHeader>Items</TableCell>
                  <TableCell isHeader>Amount</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader className="text-right">Placed</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs text-slate-500 font-semibold">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-bold text-slate-800">
                      {order.customer}
                    </TableCell>
                    <TableCell className="text-slate-600 text-xs">
                      {order.items}
                    </TableCell>
                    <TableCell className="font-extrabold text-slate-900">
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          order.status === "APPROVED" ? "success" : 
                          order.status === "PENDING" ? "warning" : "danger"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-slate-400 font-semibold">
                      {order.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Side Logs / Event Log Panel */}
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">
              Live Operations Log
            </h2>
            
            <Card className="divide-y divide-slate-100">
              {activities.map((act) => (
                <div key={act.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-start space-x-3">
                  <div className={`mt-0.5 p-1.5 rounded-lg border ${
                    act.type === "warning" ? "bg-rose-50 text-rose-600 border-rose-100" :
                    act.type === "success" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    "bg-blue-50 text-blue-600 border-blue-100"
                  }`}>
                    <Activity className="h-4 w-4 shrink-0" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                      {act.message}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold">
                      {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
