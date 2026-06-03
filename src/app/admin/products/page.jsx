import { getProducts } from "@/actions/productActions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductsClient from "./products-client";

// Enforce dynamic data loading so updates appear immediately
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Server-side security check: must be logged in as ADMIN
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Server-side fetch from Neon PostgreSQL via Prisma
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
