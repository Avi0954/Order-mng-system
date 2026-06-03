import { getProducts } from "@/actions/productActions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductsCatalogClient from "./products-catalog-client";

export const dynamic = "force-dynamic";

export default async function ProductsCatalogPage() {
  // Ensure user is authenticated
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Load all products from PostgreSQL database
  const products = await getProducts();

  return <ProductsCatalogClient initialProducts={products} />;
}
