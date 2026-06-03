import { getProductById } from "@/actions/productActions";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import EditProductClient from "./edit-product-client";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }) {
  // Server-side security check removed for admin routes

  // Await the dynamic URL parameters
  const { id } = await params;

  // Server-side fetch from Neon PostgreSQL via Server Action
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <EditProductClient product={product} />;
}
