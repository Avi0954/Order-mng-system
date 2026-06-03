import { getProducts } from "@/actions/productActions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductsClient from "./products-client";

// Enforce dynamic data loading so updates appear immediately
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Server-side security check removed for admin routes

  // Server-side fetch from Neon PostgreSQL via Prisma
  const products = await getProducts();

  return <ProductsClient initialProducts={products} />;
}
