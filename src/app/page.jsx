import Link from "next/link";
import { ArrowRight, ShoppingBag, LayoutDashboard, ClipboardList, ShieldCheck, LogIn, ArrowUpRight } from "lucide-react";

export default function HomePage() {
  const quickLinks = [
    {
      title: "Product Inventory",
      description: "Search, filter, and monitor stock levels of your products in real-time.",
      href: "/products",
      icon: ShoppingBag,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-indigo-600",
      bgLight: "bg-indigo-50",
    },
    {
      title: "Operations Dashboard",
      description: "Get key metrics on stock levels, order volume, and overall inventory value.",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "from-indigo-600 to-purple-600",
      textColor: "text-purple-600",
      bgLight: "bg-purple-50",
    },
    {
      title: "Order Bookings",
      description: "Track customer orders, pending shipments, and transactional statuses.",
      href: "/orders",
      icon: ClipboardList,
      color: "from-purple-500 to-pink-600",
      textColor: "text-pink-600",
      bgLight: "bg-pink-50",
    },
    {
      title: "Admin Panel",
      description: "Manage product catalogs, reset configurations, and supervise operations.",
      href: "/admin",
      icon: ShieldCheck,
      color: "from-amber-500 to-orange-600",
      textColor: "text-orange-600",
      bgLight: "bg-orange-50",
    },
  ];

  return (
    <div className="flex-grow flex flex-col justify-center bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-20 px-6 sm:px-12 lg:px-24">
        {/* Background gradient radial flare */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-indigo-300">
            <span>Next.js 15 App Router & React Demo</span>
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Phase 1 Frontend</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
            Inventory & Order <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300">
              Management System
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the InventoryMS platform. Easily search and track products, place customer orders, 
            supervise warehouse stock levels, and review key commercial insights.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-100 px-6 py-3 rounded-xl font-medium border border-slate-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              <LogIn className="h-5 w-5" />
              <span>Seller Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Quick Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center mb-2">
          Quick Access Portal
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-lg mx-auto">
          Navigate through the system pages designed using reusable React components.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group relative bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3 rounded-xl ${link.bgLight} ${link.textColor} w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-indigo-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-sm font-semibold text-indigo-600 mt-6 group-hover:underline">
                  <span>Enter</span>
                  <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        InventoryMS Phase 1 &copy; {new Date().getFullYear()} — Made with Next.js 15 & React
      </div>
    </div>
  );
}
