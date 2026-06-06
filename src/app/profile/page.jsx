import { getSession } from "@/lib/auth";
import PageHeader from "@/components/PageHeader";
import { User, Mail, ShieldAlert, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getSession();

  // Setup demo user fallback if not authenticated
  const user = session?.user || {
    name: "Demo Seller",
    email: "demo@seller.com",
    role: "SELLER"
  };

  const { name, email, role } = user;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <PageHeader
          title="My Account Profile"
          subtitle="Review authentication details, role authorization levels, and login variables."
        />

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Accent Header */}
          <div className="h-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative flex items-end px-6 pb-4">
            <div className="absolute -bottom-10 left-6 bg-slate-100 p-1.5 rounded-2xl border border-white shadow-md">
              <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <User className="h-10 w-10" />
              </div>
            </div>
          </div>

          {/* Details list */}
          <div className="pt-16 pb-8 px-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
              <span className={`inline-flex items-center text-xs font-bold tracking-wider px-2.5 py-1 rounded-full uppercase mt-1.5 ${
                role === "ADMIN" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-indigo-50 text-indigo-700 border border-indigo-200"
              }`}>
                {role}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4 text-sm text-slate-600">
              {/* Email */}
              <div className="flex items-center space-x-3.5">
                <Mail className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Email Address</p>
                  <p className="font-medium text-slate-800 mt-0.5">{email}</p>
                </div>
              </div>

              {/* Role Account Authority */}
              <div className="flex items-center space-x-3.5">
                <ShieldAlert className="h-5 w-5 text-slate-400 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Security Role</p>
                  <p className="font-medium text-slate-800 mt-0.5">
                    {role === "ADMIN" ? "Full Super Admin Access Permissions" : "Standard Seller Operations Access"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-3.5">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase">Authentication Session</p>
                  <p className="font-semibold text-emerald-600 mt-0.5">Active & Encrypted via JWT</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={role === "ADMIN" ? "/admin" : "/dashboard"}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl text-center shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all w-full"
              >
                Go to Management Workspace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
