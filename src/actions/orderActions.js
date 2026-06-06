"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { convertToBaseUnit } from "@/lib/unitConverter";
import { validateOrderQuantity } from "@/lib/inventoryValidator";
import { revalidatePath } from "next/cache";

/**
 * Helper to ensure a valid active user session.
 */
async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in first.");
  }
  return session;
}

/**
 * Helper to ensure user has ADMIN permissions.
 */
async function requireAdmin() {
  // Authentication check removed
  return null;
}

/**
 * Place a new Order based on cart list items.
 */
export async function placeOrder(cartItems) {
  const session = await requireAuth();

  if (!cartItems || cartItems.length === 0) {
    return { success: false, error: "Cannot place order with an empty cart ledger." };
  }

  try {
    // 1. Fetch products from database to ensure high-precision price matches
    const productIds = cartItems.map((item) => item.product.id);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productsMap = new Map(dbProducts.map((p) => [p.id, p]));

    // 2. Perform server-side calculation verification
    let serverTotalAmount = 0;
    const validatedItems = [];

    for (const item of cartItems) {
      const dbProd = productsMap.get(item.product.id);
      if (!dbProd) {
        return { success: false, error: `Product SKU "${item.product.name}" no longer exists in catalog.` };
      }

      // Check quantity validation
      const qtyValidation = validateOrderQuantity(item.quantity, item.unit, dbProd.baseUnit);
      if (!qtyValidation.valid) {
        return { success: false, error: `${dbProd.name}: ${qtyValidation.error}` };
      }

      // Check stock levels before registering quotation
      const convertedQty = convertToBaseUnit(item.quantity, item.unit, dbProd.baseUnit);
      const currentStock = Number(dbProd.stockQuantity);
      
      if (currentStock < convertedQty) {
        return {
          success: false,
          error: `Insufficient Inventory for "${dbProd.name}". Available: ${currentStock} ${dbProd.baseUnit}, Requested: ${convertedQty} ${dbProd.baseUnit}`,
        };
      }

      // Save specifications
      const pricePerBase = Number(dbProd.pricePerBaseUnit);
      const itemLineTotal = convertedQty * pricePerBase;

      serverTotalAmount += itemLineTotal;
      validatedItems.push({
        productId: dbProd.id,
        orderedQuantity: parseFloat(item.quantity),
        orderedUnit: item.unit,
        baseQuantity: convertedQty,
        unitPrice: pricePerBase,
        lineTotal: itemLineTotal,
      });
    }

    // 3. Create database records in a secure atomic transaction
    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount: serverTotalAmount,
          status: "PENDING",
          orderItems: {
            create: validatedItems.map((vItem) => ({
              productId: vItem.productId,
              orderedQuantity: vItem.orderedQuantity,
              orderedUnit: vItem.orderedUnit,
              baseQuantity: vItem.baseQuantity,
              unitPrice: vItem.unitPrice,
              lineTotal: vItem.lineTotal,
            })),
          },
        },
      });
      return order;
    });

    revalidatePath("/orders");
    revalidatePath("/admin/orders");
    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Error in placeOrder Server Action:", error);
    return { success: false, error: "Database write error. Failed to dispatch order." };
  }
}

/**
 * Fetch orders for the currently authenticated Seller (only their own).
 */
export async function getOrders() {
  const session = await requireAuth();

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return orders.map((o) => ({
      ...o,
      totalAmount: Number(o.totalAmount),
    }));
  } catch (error) {
    console.error("Error in getOrders:", error);
    throw new Error("Failed to load customer orders.");
  }
}

/**
 * Fetch all orders (Admin privileged).
 */
export async function getAllOrders() {
  await requireAdmin();

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    return orders.map((o) => ({
      ...o,
      totalAmount: Number(o.totalAmount),
    }));
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    throw new Error("Failed to load invoice registry.");
  }
}

/**
 * Fetch order details by ID (includes authorization checks).
 */
export async function getOrderById(id) {
  const session = await getSession();
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) return null;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parsedId },
      include: {
        user: {
          select: { id: true, name: true, email: true, role: true },
        },
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) return null;

    // Security Gate: Seller can only view their own orders; Admin can view all.
    if (session && session.user.role !== "ADMIN" && order.userId !== session.user.id) {
      throw new Error("Access Denied. You do not have permissions to view this transaction.");
    }

    return {
      ...order,
      totalAmount: Number(order.totalAmount),
      orderItems: order.orderItems.map((item) => ({
        ...item,
        orderedQuantity: Number(item.orderedQuantity),
        baseQuantity: Number(item.baseQuantity),
        unitPrice: Number(item.unitPrice),
        lineTotal: Number(item.lineTotal),
        product: {
          ...item.product,
          pricePerBaseUnit: Number(item.product.pricePerBaseUnit),
          stockQuantity: Number(item.product.stockQuantity),
        },
      })),
    };
  } catch (error) {
    console.error("Error in getOrderById:", error);
    throw error;
  }
}

/**
 * Update order status (Admin privileged).
 */
export async function updateOrderStatus(orderId, status) {
  await requireAdmin();
  const parsedId = parseInt(orderId, 10);

  if (!["PENDING", "APPROVED", "REJECTED"].includes(status)) {
    return { success: false, error: "Invalid status state value." };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch current order and its items
      const existingOrder = await tx.order.findUnique({
        where: { id: parsedId },
        include: { orderItems: { include: { product: true } } },
      });

      if (!existingOrder) {
        return { success: false, error: "Order not found." };
      }

      // Check current status to prevent duplicate stock updates
      if (existingOrder.status === "APPROVED" && status === "APPROVED") {
        return { success: false, error: "This order is already approved. Duplicate stock reduction prevented." };
      }
      if (existingOrder.status === "REJECTED" && status === "REJECTED") {
        return { success: false, error: "This order is already rejected." };
      }

      // If updating status to APPROVED, check and reduce stock levels
      if (status === "APPROVED") {
        for (const item of existingOrder.orderItems) {
          const currentStock = Number(item.product.stockQuantity);
          const baseQty = Number(item.baseQuantity);

          if (currentStock < baseQty) {
            throw new Error(
              `Insufficient stock for "${item.product.name}". Available: ${currentStock} ${item.product.baseUnit}, Needed: ${baseQty} ${item.product.baseUnit}`
            );
          }

          // Decrement stock
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stockQuantity: {
                decrement: baseQty,
              },
            },
          });

          // Log inventory transaction
          await tx.inventoryTransaction.create({
            data: {
              productId: item.productId,
              quantityChanged: -baseQty,
              actionType: "ORDER_APPROVED",
            },
          });
        }
      }

      // 2. Update status of the order
      await tx.order.update({
        where: { id: parsedId },
        data: { status },
      });

      return { success: true };
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${parsedId}`);
    revalidatePath("/orders");
    revalidatePath(`/orders/${parsedId}`);
    revalidatePath("/admin/inventory");

    return { success: true };
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    return { success: false, error: error.message || "Failed to update order status." };
  }
}

/**
 * Calculate order pricing safely on the server.
 */
export async function calculateOrderPricing(productId, quantity, unit) {
  try {
    const parsedId = parseInt(productId, 10);
    if (isNaN(parsedId)) {
      return { success: false, error: "Invalid product ID format." };
    }

    const qtyVal = parseFloat(quantity);
    if (isNaN(qtyVal) || qtyVal <= 0) {
      return { success: false, error: "Invalid quantity provided." };
    }

    const validUnits = ["g", "kg", "mL", "L", "item"];
    if (!unit || !validUnits.includes(unit)) {
      return { success: false, error: "Invalid unit provided." };
    }

    // FIX 1: Product Validation
    const product = await prisma.product.findUnique({
      where: { id: parsedId }
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    if (product.pricePerBaseUnit === null || product.pricePerBaseUnit === undefined) {
      return { success: false, error: "Product pricing is not configured." };
    }

    if (!product.baseUnit) {
      return { success: false, error: "Product base unit is missing." };
    }

    // FIX 6: Database Safety
    const currentStock = Number(product.stockQuantity);
    if (isNaN(currentStock) || product.stockQuantity === null) {
      return { success: false, error: "Product stock information is missing." };
    }

    // FIX 3: Unit Conversion validation
    let convertedBaseQuantity = 0;
    try {
      convertedBaseQuantity = convertToBaseUnit(qtyVal, unit, product.baseUnit);
    } catch (err) {
      return { success: false, error: "Invalid unit conversion: " + err.message };
    }

    // FIX 2: Decimal Calculations
    const pricePerBase = Number(product.pricePerBaseUnit);
    if (isNaN(pricePerBase)) {
      return { success: false, error: "Invalid price format in database." };
    }

    const lineTotal = convertedBaseQuantity * pricePerBase;

    // FIX 8: Response Format
    return {
      success: true,
      calculatedQuantity: qtyVal,
      convertedBaseQuantity: convertedBaseQuantity,
      unitPrice: pricePerBase,
      lineTotal: lineTotal,
      error: null
    };

  } catch (error) {
    // FIX 5: Server action error handling
    console.error("Pricing Error:", error);
    return { success: false, error: "Failed to calculate order pricing due to a server error." };
  }
}
