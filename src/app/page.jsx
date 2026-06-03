import Link from "next/link";
import { 
  ArrowRight, 
  ArrowUpRight,
  ShoppingBag, 
  LayoutDashboard, 
  ClipboardList, 
  ShieldCheck, 
  FileCheck, 
  User, 
  BarChart, 
  TrendingUp, 
  Package, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp,
  Layers,
  Database,
  Lock,
  Clock,
  ChevronRight
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function HomePage() {
  const stats = [
    { value: "1,248+", label: "Products Managed", desc: "Across multiple unit scales" },
    { value: "320+", label: "Orders Completed", desc: "Fulfilled automatically" },
    { value: "150+", label: "Active Users", desc: "Collaborating in real-time" },
    { value: "98%", label: "Inventory Accuracy", desc: "Verified via audits" }
  ];

  const features = [
    {
      title: "Custom Product Management",
      description: "Create SKUs, configure pricing, and manage unit-based inventory.",
      icon: Package,
    },
    {
      title: "Inventory Tracking",
      description: "Monitor stock levels, receive alerts, and automate stock updates.",
      icon: Layers,
    },
    {
      title: "Quotation Engine",
      description: "Generate quotations with automatic unit conversion and pricing.",
      icon: FileCheck,
    },
    {
      title: "Order Management",
      description: "Track pending, approved, and completed customer orders.",
      icon: ClipboardList,
    },
    {
      title: "Analytics & Reports",
      description: "Monitor business performance with operational insights.",
      icon: BarChart,
    },
    {
      title: "Role-Based Access",
      description: "Secure Admin and Seller permissions across the platform.",
      icon: Lock,
    }
  ];

  const quickAccess = [
    { title: "Dashboard", href: "/dashboard", desc: "View inventory performance, orders and system metrics.", icon: LayoutDashboard, action: "Open Dashboard" },
    { title: "Products", href: "/products", desc: "Manage products, SKUs, pricing and stock levels.", icon: ShoppingBag, action: "Open Products" },
    { title: "Quotations", href: "/quotation", desc: "Generate quotations using unit conversion and pricing.", icon: FileCheck, action: "Open Quotations" },
    { title: "Orders", href: "/orders", desc: "Track customer orders and approval workflow.", icon: ClipboardList, action: "Open Orders" },
    { title: "Profile", href: "/profile", desc: "Manage account settings and role permissions.", icon: User, action: "Open Profile" },
    { title: "Analytics", href: "/dashboard", desc: "Monitor inventory trends and operational reports.", icon: BarChart, action: "Open Analytics" }
  ];

  const benefits = [
    { title: "Save Time", desc: "Automatic workflow transitions" },
    { title: "Reduce Errors", desc: "Pre-validated unit conversions" },
    { title: "Improve Accuracy", desc: "Single source of ledger truth" },
    { title: "Grow Business", desc: "Optimized operational capacity" }
  ];

  return (
    <div className="flex-grow flex flex-col justify-center bg-[#050816] text-white">
      
      {/* SECTION 3 & 4 & 5: HERO SECTION (50/50 Desktop Split) */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-6 sm:px-12 lg:px-24 border-b border-slate-900/60">
        {/* Decorative Radial Background Lights */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6D5DFB]/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Hero CTA Copy */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-[#6D5DFB]/10 border border-[#6D5DFB]/20 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#38BDF8]">
              <span>Enterprise Hub</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] animate-ping" />
              <span>v2.0 Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
              Inventory & Order <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5DFB] via-[#a29bfd] to-[#38BDF8]">
                Management System
              </span>
            </h1>

            <p className="text-base text-[#94A3B8] max-w-xl leading-relaxed font-medium">
              Manage products, inventory, quotations, and orders from a single intelligent dashboard.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/dashboard">
                <Button variant="primary" size="lg" className="bg-[#6D5DFB] hover:bg-[#5b4eed] text-white shadow-lg shadow-[#6D5DFB]/20 select-none cursor-pointer">
                  <span>Explore Dashboard</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-slate-800 text-slate-300 hover:text-white bg-slate-900/40 select-none cursor-pointer">
                  <span>View Products</span>
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT SIDE & SECTION 7: INTERACTIVE DASHBOARD PREVIEW CARD */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#6D5DFB] to-[#38BDF8] opacity-15 blur-xl pointer-events-none" />
            
            <div className="relative w-full max-w-[450px] bg-[#090d23]/80 backdrop-blur-xl border border-slate-900 rounded-3xl p-6 shadow-2xl space-y-6">
              {/* Mock Header */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Telemetry Console
                  </span>
                </div>
                <Badge variant="blue" className="text-[8px] tracking-wide">Live Feed</Badge>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-2xl">
                  <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">Products</span>
                  <span className="text-xl font-black text-white mt-1 block">1,248</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-2xl">
                  <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">Orders</span>
                  <span className="text-xl font-black text-white mt-1 block">320</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-2xl">
                  <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">Pending</span>
                  <span className="text-xl font-black text-white mt-1 block text-amber-400">24</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-3.5 rounded-2xl">
                  <span className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-wider block">Low Stock</span>
                  <span className="text-xl font-black text-white mt-1 block text-rose-400">18</span>
                </div>
              </div>

              {/* Line graph visualization */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Weekly Sales Velocity</span>
                  <span className="text-emerald-400">+18.4%</span>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-3 rounded-2xl h-14 flex items-end justify-between gap-1">
                  <div className="w-full bg-[#6D5DFB]/20 rounded-t-sm h-[30%] hover:bg-[#6D5DFB] transition-colors" />
                  <div className="w-full bg-[#6D5DFB]/20 rounded-t-sm h-[50%] hover:bg-[#6D5DFB] transition-colors" />
                  <div className="w-full bg-[#6D5DFB]/20 rounded-t-sm h-[40%] hover:bg-[#6D5DFB] transition-colors" />
                  <div className="w-full bg-[#38BDF8] rounded-t-sm h-[80%] transition-colors shadow-sm shadow-[#38BDF8]/20" />
                  <div className="w-full bg-[#6D5DFB]/20 rounded-t-sm h-[60%] hover:bg-[#6D5DFB] transition-colors" />
                  <div className="w-full bg-[#6D5DFB] rounded-t-sm h-[95%] transition-colors shadow-sm shadow-[#6D5DFB]/20" />
                </div>
              </div>

              {/* Recent listings */}
              <div className="space-y-2">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Recent Orders Activity</span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs bg-slate-950/30 p-2.5 rounded-xl border border-slate-900/60">
                    <span className="font-bold text-slate-200">Basmati Rice</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">250 kg</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-slate-950/30 p-2.5 rounded-xl border border-slate-900/60">
                    <span className="font-bold text-slate-200">Organic Milk</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">80 L</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8: STATS KPI BAR */}
      <section className="bg-slate-950/30 border-b border-slate-900/40 py-10 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center lg:text-left border-l border-slate-900 pl-6 first:border-0">
              <p className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#94A3B8]">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-white uppercase tracking-wider">{stat.label}</p>
              <p className="text-[10px] text-[#94A3B8] font-medium">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: FEATURES SECTION */}
      <section className="py-20 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto space-y-16 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-extrabold text-[#6D5DFB] tracking-widest uppercase">
            Platform Capabilities
          </h2>
          <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Everything You Need In One Place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="group h-[250px] bg-white border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:translate-y-[-6px] transition-all duration-300 flex flex-col justify-between relative overflow-hidden select-none"
              >
                <div className="space-y-4">
                  {/* Icon section */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 flex items-center justify-center text-[#6D5DFB] shrink-0 shadow-xs border border-indigo-100/40">
                    <Icon className="h-6 w-6 shrink-0" />
                  </div>
                  {/* Typography */}
                  <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500 max-w-[90%] leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
                {/* Accent CTA visible on hover */}
                <div className="text-sm font-semibold text-[#6D5DFB] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More &rarr;
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 11: BENEFITS HORIZONTAL STRIP */}
      <section className="px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full pb-10">
        <div className="bg-gradient-to-r from-[#090d23] via-[#0c1233] to-[#090d23] border border-slate-900 rounded-3xl p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="space-y-1 border-r last:border-0 border-slate-900/80 pr-4 last:pr-0">
                <h4 className="text-xs font-black text-[#38BDF8] uppercase tracking-wider">
                  {benefit.title}
                </h4>
                <p className="text-[10px] text-[#94A3B8] font-medium leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: QUICK ACCESS SECTION */}
      <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-extrabold text-[#38BDF8] tracking-widest uppercase">
            Operations Center
          </h2>
          <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Direct Module Portals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccess.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link key={idx} href={link.href} className="group block select-none">
                <div className="h-[190px] bg-white border border-slate-200/80 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:translate-y-[-6px] hover:border-[#6D5DFB] transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-2">
                    {/* Icon section */}
                    <div className="text-slate-400 group-hover:text-[#6D5DFB] transition-colors duration-200">
                      <Icon className="h-5 w-5 shrink-0" />
                    </div>
                    {/* Typography */}
                    <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-500 max-w-full leading-snug font-medium line-clamp-2">
                      {link.desc}
                    </p>
                  </div>
                  {/* Action Link */}
                  <div className="flex items-center space-x-1 text-xs font-bold text-[#6D5DFB] tracking-wide uppercase">
                    <span>{link.action}</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="border-t border-slate-900/60 bg-[#050816] py-8 text-center text-xs text-slate-500 font-bold uppercase tracking-widest">
        InventoryMS &copy; {new Date().getFullYear()} — Built using Next.js & React
      </footer>
    </div>
  );
}
