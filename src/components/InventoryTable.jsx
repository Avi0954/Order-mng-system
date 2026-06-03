import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function InventoryTable({ products }) {
  const getStatusDetails = (product) => {
    const stock = Number(product.stockQuantity);
    const threshold = Number(product.lowStockThreshold);

    if (stock <= 0) {
      return {
        label: "Out of Stock",
        className: "bg-rose-50 text-rose-700 border-rose-100",
        icon: XCircle,
      };
    }
    if (stock <= threshold) {
      return {
        label: "Low Stock",
        className: "bg-amber-50 text-amber-700 border-amber-100",
        icon: AlertTriangle,
      };
    }
    return {
      label: "In Stock",
      className: "bg-emerald-50 text-emerald-700 border-emerald-100",
      icon: CheckCircle2,
    };
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
            <tr>
              <th scope="col" className="px-6 py-4">Product Name</th>
              <th scope="col" className="px-6 py-4">SKU Code</th>
              <th scope="col" className="px-6 py-4 text-right">Available Stock</th>
              <th scope="col" className="px-6 py-4 text-center">Fulfillment State</th>
              <th scope="col" className="px-6 py-4">Last Updated</th>
              <th scope="col" className="px-6 py-4 text-center">History Logs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700 font-medium">
            {products.map((product) => {
              const status = getStatusDetails(product);
              const StatusIcon = status.icon;

              return (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Name */}
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {product.name}
                  </td>
                  
                  {/* SKU */}
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {product.sku}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 text-right text-slate-900 font-extrabold">
                    {Number(product.stockQuantity).toLocaleString("en-IN")} <span className="text-slate-400 font-medium text-xs">{product.baseUnit}</span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center space-x-1 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full border uppercase ${status.className}`}>
                      <StatusIcon className="h-3 w-3 shrink-0" />
                      <span>{status.label}</span>
                    </span>
                  </td>

                  {/* Updated At */}
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(product.updatedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Inspect Details */}
                  <td className="px-6 py-4 text-center">
                    <Link
                      href={`/admin/inventory/${product.id}`}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                      <span>Audit Logs</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
