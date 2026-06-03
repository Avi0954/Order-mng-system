"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Box, Home, ShoppingBag, ClipboardList, LayoutDashboard, LogIn, LogOut, User, ShieldCheck, FileCheck } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const userRole = session?.user?.role;
  const userName = session?.user?.name || "User";

  // Build the dynamic nav links array
  const navLinks = [
    { name: "Home", href: "/", icon: Home, show: true },
  ];

  if (isAuthenticated) {
    navLinks.push(
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
      { name: "Products", href: "/products", icon: ShoppingBag, show: true },
      { name: "Quotation", href: "/quotation", icon: FileCheck, show: true },
      { name: "Orders", href: "/orders", icon: ClipboardList, show: true },
      { name: "Profile", href: "/profile", icon: User, show: true },
      { name: "Admin Portal", href: "/admin", icon: ShieldCheck, show: userRole === "ADMIN" }
    );
  } else {
    navLinks.push(
      { name: "Login", href: "/login", icon: LogIn, show: true }
    );
  }

  // Filter links that are permitted
  const visibleLinks = navLinks.filter(link => link.show);

  return (
    <>
      {/* Mobile Top Header (Visible only on mobile/tablet) */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-indigo-600/10 p-1.5 rounded-lg border border-indigo-500/20">
            <Box className="h-5 w-5 text-indigo-400" />
          </div>
          <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
            InventoryMS
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Fixed Left Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-[280px] bg-[#090d23] border-r border-slate-900/60 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Branding & Close trigger */}
        <div className="p-6 border-b border-slate-900/40">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5 group" onClick={() => setIsOpen(false)}>
              <div className="bg-indigo-600/10 p-2 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
                <Box className="h-5 w-5 text-indigo-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              </div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-indigo-400 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                InventoryMS
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Close sidebar"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Middle: Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 border-indigo-500/20"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900 border-transparent"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: User Info & Logout actions */}
        <div className="p-4 border-t border-slate-900/60 bg-slate-950/20">
          {isAuthenticated ? (
            <div className="flex items-center justify-between bg-slate-900/40 p-3 rounded-2xl border border-slate-900/60">
              <div className="space-y-1.5 min-w-0">
                <span className={`inline-flex items-center text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border uppercase ${
                  userRole === "ADMIN" 
                    ? "bg-purple-950/40 text-purple-400 border-purple-900/40" 
                    : "bg-blue-950/40 text-blue-400 border-blue-900/40"
                }`}>
                  {userRole}
                </span>
                <p className="text-xs font-extrabold text-slate-200 truncate pr-1">
                  {userName}
                </p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="p-2.5 bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 rounded-xl transition-all duration-200 cursor-pointer shrink-0"
                title="Sign out of System"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center p-2 text-xs text-slate-500 font-bold uppercase tracking-wider">
              Guest Portal
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
