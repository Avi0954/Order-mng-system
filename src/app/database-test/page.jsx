import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/PageHeader";
import { Database, AlertCircle, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering so database calls are made on every request
export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
  let products = [];
  let connectionError = null;

  try {
    // Attempt database connection by fetching products
    products = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error("❌ Database test fetch error:", error);
    connectionError = error.message || JSON.stringify(error);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center space-x-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to landing page</span>
          </Link>
        </div>

        <PageHeader
          title="Database Connection Test"
          subtitle="Direct Server Component verification querying Neon PostgreSQL via Prisma Client."
        />

        {/* Connection Status Banner */}
        <div className={`mb-8 p-5 rounded-2xl border flex items-start space-x-3.5 shadow-sm ${
          connectionError
            ? "bg-rose-50 border-rose-200 text-rose-800"
            : "bg-emerald-50 border-emerald-200 text-emerald-800"
        }`}>
          {connectionError ? (
            <>
              <AlertCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">Database Connection Failed</h3>
                <p className="text-sm mt-1 text-rose-700 max-w-3xl">
                  Prisma could not connect to your PostgreSQL database. This usually means the `DATABASE_URL` in your `.env` is either missing, incorrect, or blocked by firewalls.
                </p>
                <div className="mt-3 p-3 bg-slate-900 text-slate-300 font-mono text-xs rounded-xl overflow-x-auto max-w-full">
                  Error Details: {connectionError}
                </div>
              </div>
            </>
          ) : (
            <>
              <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-base">Database Connected Successfully!</h3>
                <p className="text-sm mt-1 text-emerald-700">
                  Prisma successfully connected to Neon PostgreSQL. Ready to query inventory records.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Products Table Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <Database className="h-5 w-5 text-indigo-600" />
              <span>Products Table (`Product` Model)</span>
            </h3>
            {!connectionError && (
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                Records: {products.length}
              </span>
            )}
          </div>

          {connectionError ? (
            <div className="p-8 text-center text-slate-500">
              <p className="text-sm">Please fix the database connection above to inspect products.</p>
            </div>
          ) : products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                    <th scope="col" className="px-6 py-4">ID</th>
                    <th scope="col" className="px-6 py-4">Product Name</th>
                    <th scope="col" className="px-6 py-4">SKU Code</th>
                    <th scope="col" className="px-6 py-4">Base Unit</th>
                    <th scope="col" className="px-6 py-4 text-right">Price per Base Unit</th>
                    <th scope="col" className="px-6 py-4 text-right">Stock Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-indigo-600">#{prod.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{prod.name}</td>
                      <td className="px-6 py-4 font-mono text-xs">{prod.sku}</td>
                      <td className="px-6 py-4 text-slate-500">{prod.baseUnit}</td>
                      <td className="px-6 py-4 text-right font-bold">
                        ₹{Number(prod.pricePerBaseUnit).toFixed(4)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {Number(prod.stockQuantity).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              <p className="text-sm">Connected, but the `Product` table is empty.</p>
              <p className="text-xs text-slate-400 mt-1">Run `npx prisma db seed` to populate sample data.</p>
            </div>
          )}
        </div>

        {/* Server Component Explanation Info Card */}
        <div className="mt-8 bg-slate-900 text-slate-300 rounded-2xl p-6 border border-slate-800">
          <h4 className="font-bold text-white text-base mb-3 flex items-center">
            💡 Next.js Server Component Advantage
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 mr-2.5 shrink-0" />
              <span>
                <strong>No Client APIs Required:</strong> This page queries database records directly using Prisma Client during server rendering, bypassing the need to write backend API endpoints.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 mr-2.5 shrink-0" />
              <span>
                <strong>Credentials Security:</strong> The database connection credentials (like your `DATABASE_URL` token) reside solely in the server environment, never leaking into client-side JS bundles.
              </span>
            </li>
            <li className="flex items-start">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mt-2 mr-2.5 shrink-0" />
              <span>
                <strong>Zero Client Overhead:</strong> Because the query runs on the server, the heavy weight of the Prisma Client engine remains server-side, reducing bundle loading overhead for the user.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
