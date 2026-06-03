"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#050816] text-white relative">
      {/* Global Responsive Sidebar (previously top Navbar) */}
      <Navbar />

      {/* Main Content Workspace */}
      <div className="flex flex-col flex-1 w-full md:pl-[280px] pt-16 md:pt-0 min-w-0 transition-all duration-300">
        <main className="flex-grow flex flex-col min-h-screen bg-[#050816]">
          {children}
        </main>
      </div>
    </div>
  );
}
