import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewProductFormClient from "./new-product-client";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  // Server-side security check removed for admin routes

  return <NewProductFormClient />;
}
