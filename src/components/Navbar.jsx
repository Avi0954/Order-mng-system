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

  // Build the dynamic nav links array in Title Case
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
      { name: "Admin Portal", href: "/admin", icon: ShieldCheck, show: true }
    );
  } else {
    navLinks.push(
      { name: "Admin Portal", href: "/admin", icon: ShieldCheck, show: true },
      { name: "Login", href: "/login", icon: LogIn, show: true }
    );
  }

  // Filter links that are permitted
  const visibleLinks = navLinks.filter(link => link.show);

  // Helper to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] bg-[#090d23] border-r border-slate-900/60 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top: Branding & Close trigger */}
        <div className="p-6 border-b border-slate-900/40">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5 group" onClick={() => setIsOpen(false)}>
              <div className="bg-indigo-600/10 p-2 rounded-xl border border-indigo-500/20 group-hover:bg-indigo-600/20 group-hover:border-indigo-500/30 transition-all duration-300">
                <Box className="h-5 w-5 text-[#6D5DFB] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
              </div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-[#6D5DFB] via-indigo-200 to-[#38BDF8] bg-clip-text text-transparent">
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

        {/* Middle: Navigation Items in Title Case with Linear-inspired active state */}
        <nav className="flex-1 py-6 space-y-1 overflow-y-auto">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center space-x-3.5 px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 border-l-[3px] ${
                  isActive
                    ? "bg-[#6D5DFB]/5 text-white border-[#6D5DFB] shadow-inner shadow-[#6D5DFB]/2"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/40 border-transparent"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 transition-all duration-200 ${
                  isActive ? "text-[#6D5DFB] scale-110" : "text-slate-500 group-hover:text-slate-300"
                }`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Redesigned Profile Card */}
        <div className="p-4 border-t border-slate-900/60 bg-slate-950/20">
          {isAuthenticated ? (
            <div className="flex flex-col space-y-3 bg-[#0c1130] p-4 rounded-2xl border border-slate-900/80 shadow-lg">
              {/* Profile details */}
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#6D5DFB] to-[#38BDF8] flex items-center justify-center text-sm font-black text-white shadow-md shadow-[#6D5DFB]/20 shrink-0">
                  {getInitials(userName)}
                </div>
                {/* Text credentials */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-extrabold text-slate-200 truncate leading-snug">
                    {userName}
                  </p>
                  <div className="flex flex-col space-y-0.5 mt-1">
                    <div>
                      <span className={`inline-flex items-center text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full border uppercase ${
                        userRole === "ADMIN" 
                          ? "bg-purple-950/40 text-purple-400 border-purple-900/40" 
                          : "bg-blue-950/40 text-blue-400 border-blue-900/40"
                      }`}>
                        {userRole === "ADMIN" ? "Admin" : "Seller"}
                      </span>
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium">Last Active Today</p>
                  </div>
                </div>
              </div>

              {/* Signout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-slate-900/60 hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/40 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all duration-200 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="text-center p-2 text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
              Guest Portal
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
