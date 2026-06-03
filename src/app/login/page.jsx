"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Mail, Lock, LogIn, ArrowLeft, HelpCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Client-side validations
    if (!email || !password) {
      setError("Please fill out both the email and password fields.");
      setLoading(false);
      return;
    }

    try {
      // Trigger NextAuth credentials sign-in
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        // NextAuth returned an authorization error
        setError(res.error || "Authentication failed.");
        setLoading(false);
        return;
      }

      // Fetch the updated session details to check the user's role
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const userRole = session?.user?.role;

      // STEP 12: Redirect logic based on role
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

  return (
    <div className="flex-grow flex items-center justify-center bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200 p-8 rounded-3xl shadow-xl relative z-10">
        {/* Top brand header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-500 mb-4 transition-colors">
            <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 shadow-sm">
              <Box className="h-6 w-6 text-indigo-600" />
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            System Sign In
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Phase 3: Role-Based Access Control Active
          </p>
        </div>

        {/* Input Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
          {error && (
            <div className="bg-rose-50 text-rose-600 border border-rose-100 text-xs font-semibold px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email-address" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com / seller@example.com"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password-field" className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Password
                </label>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password-field"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              </span>
              {loading ? "Authenticating credentials..." : "Sign in to System"}
            </button>
          </div>
        </form>

        {/* Back and Demo Info */}
        <div className="mt-6 border-t border-slate-100 pt-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-start space-x-2">
            <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-700">Test Credentials:</p>
              <ul className="mt-1 space-y-1 text-slate-500 list-disc list-inside">
                <li><strong>Admin</strong>: admin@example.com / password123</li>
                <li><strong>Seller</strong>: seller@example.com / password123</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to home landing page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
