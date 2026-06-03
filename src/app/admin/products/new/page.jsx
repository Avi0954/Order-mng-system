import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewProductFormClient from "./new-product-client";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  // Server-side security check: must be logged in as ADMIN
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <NewProductFormClient />;
}
