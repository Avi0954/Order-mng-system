"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Box, 
  Mail, 
  Lock, 
  LogIn, 
  ArrowLeft, 
  HelpCircle, 
  Check, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  Database, 
  LockKeyhole,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill out both the email and password fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      // Fetch the updated session details to check the user's role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const userRole = session?.user?.role;

      if (userRole === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err) {
      console.error("Login submission error:", err);
      setError("An unexpected connection error occurred.");
      setLoading(false);
    }
  };

  const isDevMode = process.env.NODE_ENV === "development";

  return (
    <div className="flex-grow min-h-screen flex bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-950 text-white relative overflow-hidden font-sans">
      
      {/* Background decoration elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#6D5DFB]/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#38BDF8]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main split-grid layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between p-6 sm:p-12 gap-12 z-10">
        
        {/* LEFT SECTION (55% desktop ratio) */}
        <div className="hidden lg:flex flex-col w-[55%] space-y-8 pr-12 text-left animate-fadeIn">
          {/* Logo brand block */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-[#6D5DFB]/10 p-2.5 rounded-2xl border border-[#6D5DFB]/20">
              <Box className="h-6 w-6 text-[#6D5DFB]" />
            </div>
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-[#6D5DFB] via-indigo-200 to-[#38BDF8] bg-clip-text text-transparent">
              InventoryMS
            </span>
          </Link>

          {/* Headline copy */}
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">
              Inventory & Order <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D5DFB] via-[#a29bfd] to-[#38BDF8]">
                Management Platform
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed font-medium">
              Manage products, inventory, quotations, orders and analytics from a single dashboard.
            </p>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider text-slate-300">
            {[
              "Product Management",
              "Inventory Tracking",
              "Order Processing",
              "Smart Quotations",
              "Analytics Dashboard",
              "Role-Based Access"
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <div className="h-5 w-5 bg-indigo-500/10 border border-indigo-500/25 text-[#38BDF8] rounded-full flex items-center justify-center shrink-0">
                  <Check className="h-3 w-3" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-6">
            <div>
              <p className="text-2xl font-black text-white">1,248+</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Products</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">320+</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">98%</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Accuracy</p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Login Card (45% desktop ratio) */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
          <div className="w-full max-w-[540px] bg-white border border-slate-200/80 rounded-3xl shadow-2xl p-8 sm:p-10 text-slate-900 animate-fadeIn">
            
            {/* Header branding on card */}
            <div className="flex flex-col items-center text-center space-y-4">
              <Link href="/" className="inline-flex items-center space-x-2">
                <div className="bg-indigo-50 p-2.5 rounded-2xl border border-indigo-100/60 shadow-xs">
                  <Box className="h-6 w-6 text-[#6D5DFB]" />
                </div>
              </Link>
              <div className="space-y-1">
                <Badge variant="purple" icon={ShieldCheck} className="text-[9px] uppercase tracking-widest font-black">
                  Secure Login
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Sign in to access your inventory dashboard.
                </p>
              </div>
            </div>

            {/* Error notifications */}
            {error && (
              <div className="mt-6 bg-rose-50 text-rose-600 border border-rose-100 text-xs font-semibold px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Form Fields */}
            <form className="mt-6 space-y-4" onSubmit={handleLoginSubmit}>
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label htmlFor="email-field" className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="email-field"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="block w-full h-[56px] pl-12 pr-4 border border-slate-200 rounded-xl bg-white text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm font-semibold transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password-input" className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password123"
                    className="block w-full h-[56px] pl-12 pr-12 border border-slate-200 rounded-xl bg-white text-slate-950 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-sm font-semibold transition-all"
                  />
                  {/* Password visibility toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              {/* Options row: Remember me & forgot password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                    Remember Me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-xs font-extrabold text-[#6D5DFB] hover:underline uppercase tracking-wider"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Action submission button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[56px] flex items-center justify-center space-x-2 text-sm font-extrabold uppercase tracking-wider text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-indigo-600/10 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="h-4.5 w-4.5" />
                  <span>{loading ? "Authenticating..." : "Sign In"}</span>
                </button>
              </div>
            </form>

            {/* Collapsible Demo credentials card (Dev environment only) */}
            {isDevMode && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <button
                  onClick={() => setIsDemoOpen(!isDemoOpen)}
                  className="w-full flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <span>Demo Accounts</span>
                  {isDemoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                {isDemoOpen && (
                  <div className="mt-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Admin User</p>
                        <p className="text-xs font-semibold text-slate-700">admin@example.com</p>
                      </div>
                      <Badge variant="purple" className="text-[8px] tracking-wide uppercase">Admin</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Seller User</p>
                        <p className="text-xs font-semibold text-slate-700">seller@example.com</p>
                      </div>
                      <Badge variant="blue" className="text-[8px] tracking-wide uppercase">Seller</Badge>
                    </div>
                    <p className="text-[9px] text-slate-400 italic">Default Password: <strong>password123</strong></p>
                  </div>
                )}
              </div>
            )}

            {/* Muted Security Badges Strip */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">
              <span className="flex items-center space-x-1">
                <LockKeyhole className="h-3 w-3 text-emerald-500 shrink-0" />
                <span>Secure Auth</span>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="h-3 w-3 text-[#6D5DFB] shrink-0" />
                <span>RBAC Config</span>
              </span>
              <span className="hidden sm:inline text-slate-300">•</span>
              <span className="flex items-center space-x-1">
                <Database className="h-3 w-3 text-[#38BDF8] shrink-0" />
                <span>Neon PostgreSQL</span>
              </span>
            </div>

            {/* Back CTA link */}
            <div className="mt-6 text-center">
              <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#6D5DFB] transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>&larr; Back to Homepage</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
