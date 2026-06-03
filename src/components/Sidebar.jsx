"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ClipboardList, ShieldAlert, FileCheck } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Quotation", href: "/quotation", icon: FileCheck },
    { name: "Orders", href: "/orders", icon: ClipboardList },
    { name: "Admin Portal", href: "/admin", icon: ShieldAlert },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 text-white min-h-[calc(100vh-4rem)] hidden md:block shrink-0 relative">
      <div className="p-6">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Management Console
        </h2>
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white border border-transparent"
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Phase 6 Engine Active</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">Quotations & Orders Live</p>
        </div>
      </div>
    </aside>
  );
}
