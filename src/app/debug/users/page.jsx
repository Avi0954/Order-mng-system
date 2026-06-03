import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Users, ShieldAlert, CheckCircle2 } from "lucide-react";
import Table, { TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/Table";
import Badge from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function DebugUsersPage() {
  let users = [];
  let errorMsg = null;

  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to query users in debug page:", error);
    errorMsg = error.message || "Failed to establish a connection to the database.";
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Link */}
        <div>
          <Link href="/login" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Login Portal</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-slate-800">
          <div>
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-indigo-400" />
              <h1 className="text-2xl font-black tracking-tight">Database User Ledger Verification</h1>
            </div>
            <p className="text-slate-400 text-xs mt-2 font-medium">
              Inspect user records in Neon PostgreSQL to verify that credentials seeding was executed successfully.
            </p>
          </div>
          <span className="bg-indigo-950 text-indigo-300 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full border border-indigo-900 tracking-wider">
            Debug Mode
          </span>
        </div>

        {/* Database Error Alert */}
        {errorMsg && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-start space-x-3 text-rose-700 shadow-sm">
            <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Database Connection Error</p>
              <p className="text-xs font-medium mt-1 leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* User Listing Table */}
        {!errorMsg && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>CUID</TableCell>
                <TableCell isHeader>Account Name</TableCell>
                <TableCell isHeader>Email Address</TableCell>
                <TableCell isHeader>Privilege Role</TableCell>
                <TableCell isHeader className="text-center">Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((u) => (
                  <TableRow key={u.id}>
                    {/* ID */}
                    <TableCell className="font-mono text-[10px] text-slate-400">
                      {u.id}
                    </TableCell>
                    
                    {/* Name */}
                    <TableCell className="text-slate-900 font-bold">
                      {u.name}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-slate-600 font-mono text-xs">
                      {u.email}
                    </TableCell>

                    {/* Role Badge */}
                    <TableCell>
                      <Badge variant={u.role === "ADMIN" ? "purple" : "blue"}>
                        {u.role}
                      </Badge>
                    </TableCell>

                    {/* Status Icon */}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="h-4.5 w-4.5" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-slate-400 text-xs font-semibold">
                    The User table is currently empty. Run the database seed script to populate default users.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

      </div>
    </div>
  );
}
