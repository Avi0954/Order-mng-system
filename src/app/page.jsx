import Link from "next/link";
import { ArrowRight, ShoppingBag, LayoutDashboard, ClipboardList, ShieldCheck, LogIn, ArrowUpRight, TrendingUp, CheckCircle, Package, ArrowUp } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function HomePage() {
  const quickLinks = [
    {
      title: "Product Inventory",
      description: "Search, filter, and monitor stock levels of your products in real-time.",
      href: "/products",
      icon: ShoppingBag,
      textColor: "text-[#38BDF8]",
      borderColor: "group-hover:border-[#38BDF8]/30",
      bgLight: "bg-[#38BDF8]/5",
    },
    {
      title: "Operations Dashboard",
      description: "Get key metrics on stock levels, order volume, and overall inventory value.",
      href: "/dashboard",
      icon: LayoutDashboard,
      textColor: "text-[#6D5DFB]",
      borderColor: "group-hover:border-[#6D5DFB]/30",
      bgLight: "bg-[#6D5DFB]/5",
    },
    {
      title: "Order Bookings",
      description: "Track customer orders, pending shipments, and transactional statuses.",
      href: "/orders",
      icon: ClipboardList,
      textColor: "text-rose-400",
      borderColor: "group-hover:border-rose-400/30",
      bgLight: "bg-rose-400/5",
    },
    {
      title: "Admin Panel",
      description: "Manage product catalogs, reset configurations, and supervise operations.",
      href: "/admin",
      icon: ShieldCheck,
      textColor: "text-amber-400",
      borderColor: "group-hover:border-amber-400/30",
      bgLight: "bg-amber-400/5",
    },
  ];

  return (
    <div className="flex-grow flex flex-col justify-center bg-[#050816] text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-6 sm:px-12 lg:px-24 border-b border-slate-900/60">
        {/* Background flares */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6D5DFB]/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-5000" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Headline & Controls */}
          <div className="lg:col-span-7 space-y-8 text-left animate-fadeIn">
            <div className="inline-flex items-center space-x-2.5 bg-[#6D5DFB]/10 border border-[#6D5DFB]/20 rounded-full px-4.5 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#38BDF8]">
              <span>Next-Gen Platform</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
              <span>SaaS Active</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
                Inventory & Order <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5DFB] via-[#a29bfd] to-[#38BDF8]">
                  Management System
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-medium">
                Supercharge inventory counts, verify real-time unit conversions, draft instant client quotations, 
                and approve orders with multi-role permissions from a highly optimized dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="hover:-translate-y-0.5 shadow-lg shadow-[#6D5DFB]/20 bg-[#6D5DFB] hover:bg-[#5b4eed]">
                  <span>Explore Dashboard</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="border-slate-800 text-slate-300 hover:text-white bg-slate-900/40 hover:-translate-y-0.5">
                  <LogIn className="h-4.5 w-4.5" />
                  <span>Seller Portal</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Mockup Card */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end animate-fadeIn">
            {/* Background Glow Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6D5DFB] to-[#38BDF8] opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />
            
            {/* Main Mockup Card Container */}
            <div className="relative w-full max-w-[420px] bg-slate-950/80 backdrop-blur-xl border border-slate-900 rounded-3xl p-6 shadow-2xl space-y-6">
              
              {/* Header block with mock metrics */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                    Warehouse Node: Live
                  </span>
                </div>
                <Badge variant="purple" className="text-[9px]">SaaS Engine</Badge>
              </div>

              {/* Statistical rows */}
              <div className="space-y-4">
                <div className="bg-slate-900/30 border border-slate-900/50 p-4 rounded-2xl flex items-center justify-between hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#6D5DFB]/10 p-2 rounded-xl text-[#6D5DFB]">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fulfillment Rate</p>
                      <p className="text-sm font-extrabold text-white">99.82%</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold flex items-center space-x-0.5">
                    <ArrowUp className="h-3 w-3" />
                    <span>+1.2%</span>
                  </span>
                </div>

                <div className="bg-slate-900/30 border border-slate-900/50 p-4 rounded-2xl flex items-center justify-between hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#38BDF8]/10 p-2 rounded-xl text-[#38BDF8]">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Stock Health</p>
                      <p className="text-sm font-extrabold text-white">Optimal</p>
                    </div>
                  </div>
                  <Badge variant="success" icon={CheckCircle} className="text-[8px]">Passed</Badge>
                </div>
              </div>

              {/* Interactive bar chart representation */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Weekly Dispatch Frequency</span>
                  <span className="text-[#38BDF8]">Peak Activity</span>
                </div>
                <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                  <div className="w-full bg-slate-900 hover:bg-[#6D5DFB]/30 transition-all rounded-t-md h-[40%]" />
                  <div className="w-full bg-slate-900 hover:bg-[#6D5DFB]/30 transition-all rounded-t-md h-[60%]" />
                  <div className="w-full bg-slate-900 hover:bg-[#38BDF8]/30 transition-all rounded-t-md h-[85%]" />
                  <div className="w-full bg-[#6D5DFB] transition-all rounded-t-md h-[100%] shadow-lg shadow-[#6D5DFB]/20" />
                  <div className="w-full bg-slate-900 hover:bg-[#6D5DFB]/30 transition-all rounded-t-md h-[70%]" />
                  <div className="w-full bg-slate-900 hover:bg-[#6D5DFB]/30 transition-all rounded-t-md h-[55%]" />
                  <div className="w-full bg-slate-900 hover:bg-[#6D5DFB]/30 transition-all rounded-t-md h-[30%]" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Grid Quick Navigation Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-extrabold text-[#6D5DFB] tracking-widest uppercase">
            Productivity Suite
          </h2>
          <p className="text-2xl font-black text-white tracking-tight">
            Seamlessly Navigate Operations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href} className="group block">
                <Card className={`h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between border-slate-900/60 bg-slate-950/40 ${link.borderColor}`}>
                  <div className="space-y-4">
                    <div className={`p-3 rounded-2xl ${link.bgLight} ${link.textColor} w-fit group-hover:scale-105 transition-transform duration-300 border border-slate-900/30`}>
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-[#38BDF8] transition-colors duration-200">
                      {link.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {link.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#6D5DFB] mt-6 group-hover:underline">
                    <span>Open Panel</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="mt-auto border-t border-slate-900/60 bg-[#050816] py-6 text-center text-xs text-slate-500 font-bold uppercase tracking-widest">
        InventoryMS &copy; {new Date().getFullYear()} — Powered by Next.js & React
      </footer>
    </div>
  );
}
