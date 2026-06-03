import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import Sidebar from "@/components/Sidebar";
import InventoryTable from "@/components/InventoryTable";
import DashboardCard from "@/components/DashboardCard";
import { ArrowLeft, Box, AlertTriangle, CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminInventoryDashboard() {
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Load products and stock parameters
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });

  const totalProducts = products.length;
  const totalStockItems = products.reduce((sum, p) => sum + Number(p.stockQuantity), 0);
  const lowStockCount = products.filter(
    (p) => Number(p.stockQuantity) > 0 && Number(p.stockQuantity) <= Number(p.lowStockThreshold)
  ).length;
  const outOfStockCount = products.filter((p) => Number(p.stockQuantity) <= 0).length;

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      {/* Side Navigation Console */}
      <Sidebar />

      {/* Main Panel */}
      <main className="flex-grow p-6 md:p-8 bg-slate-50 space-y-8">
        
        {/* Navigation Link */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Admin Console</span>
          </Link>
        </div>

        <PageHeader
          title="Warehouse Inventory Dashboard"
          subtitle="Audit SKU stock levels, evaluate alerts, and examine historical transaction changes."
        />

        {/* Inventory Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total SKUs Tracked"
            value={totalProducts}
            icon={Package}
            trend="Active unique configurations"
            trendType="positive"
          />
          <DashboardCard
            title="Total Stock Units"
            value={totalStockItems.toLocaleString("en-IN")}
            icon={Box}
            trend="Aggregated warehouse items"
            trendType="positive"
          />
          <DashboardCard
            title="Low Stock Warning Alert"
            value={lowStockCount}
            icon={AlertTriangle}
            trend="Exceeded limit levels"
            trendType={lowStockCount > 0 ? "negative" : "positive"}
          />
          <DashboardCard
            title="Out Of Stock Alert"
            value={outOfStockCount}
            icon={AlertTriangle}
            trend="Requires restock actions"
            trendType={outOfStockCount > 0 ? "negative" : "positive"}
          />
        </div>

        {/* Main inventory listing */}
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-800 text-base">Current Warehouse Storage Catalog</h3>
          <InventoryTable products={products} />
        </div>

      </main>
    </div>
  );
}
