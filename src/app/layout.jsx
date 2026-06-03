import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import { OrderProvider } from "@/context/OrderContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InventoryMS - Inventory & Order Management System",
  description: "Modern high-performance dashboard for managing retail inventory and tracking incoming orders in real-time.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <AuthProvider>
          <OrderProvider>
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
