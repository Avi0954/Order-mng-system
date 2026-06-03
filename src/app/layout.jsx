import { Geist, Geist_Mono } from "next/font/google";
import AppLayout from "@/components/AppLayout";
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
      <body className="min-h-full flex flex-col bg-[#050816] text-white font-sans">
        <AuthProvider>
          <OrderProvider>
            <AppLayout>{children}</AppLayout>
          </OrderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
