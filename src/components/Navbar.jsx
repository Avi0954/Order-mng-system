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
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors group">
              <div className="bg-indigo-600/20 p-2 rounded-lg group-hover:bg-indigo-600/30 transition-all duration-300">
                <Box className="h-6 w-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
                InventoryMS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 mr-2">
              {visibleLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Session Profile & Logout action */}
            {isAuthenticated && (
              <div className="flex items-center space-x-4 border-l border-slate-800 pl-4">
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Hello, <span className="font-bold text-slate-200">{userName}</span></p>
                  <span className={`inline-flex items-center text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase mt-0.5 ${
                    userRole === "ADMIN" ? "bg-amber-500/15 text-amber-400" : "bg-indigo-500/15 text-indigo-400"
                  }`}>
                    {userRole}
                  </span>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="p-2 bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-slate-700/50 hover:border-rose-900/50 rounded-xl transition-all duration-200"
                  title="Sign out of System"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer/Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] border-b border-slate-800 bg-slate-900" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1.5 sm:px-3">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {isAuthenticated && (
            <div className="border-t border-slate-800 mt-4 pt-4 px-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-200">{userName}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">{userRole} Account</p>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="flex items-center space-x-1.5 px-3 py-2 bg-rose-950/20 hover:bg-rose-950/40 text-rose-400 border border-rose-900/30 rounded-xl text-sm font-semibold transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
