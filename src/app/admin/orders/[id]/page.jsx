import { getOrderById } from "@/actions/orderActions";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AdminOrderClient from "./admin-order-client";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({ params }) {
  // Server-side security check removed for admin routes

  // Await the dynamic parameters
  const { id } = await params;

  let order;
  try {
    order = await getOrderById(id);
  } catch (err) {
    console.error(err);
    redirect("/admin/orders");
  }

  if (!order) {
    notFound();
  }

  return <AdminOrderClient order={order} />;
}
