"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

/**
 * Utility to verify if the current requester has ADMIN permissions.
 * Throws an error if validation fails.
 */
async function requireAdmin() {
  const session = await getSession();
  if (!session || session.user?.role !== "ADMIN") {
    throw new Error("Unauthorized. You must be an administrator to perform this action.");
  }
}

/**
 * Fetch all products from Neon PostgreSQL.
 */
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Serialize Decimals to JS numbers/strings for safe client consumption
    return products.map(p => ({
      ...p,
      pricePerBaseUnit: Number(p.pricePerBaseUnit),
      stockQuantity: Number(p.stockQuantity),
    }));
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw new Error("Failed to load products from database.");
  }
}

/**
 * Fetch a single product by its unique integer ID.
 */
export async function getProductById(id) {
  try {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) return null;

    const product = await prisma.product.findUnique({
      where: { id: parsedId },
    });

    if (!product) return null;

    return {
      ...product,
      pricePerBaseUnit: Number(product.pricePerBaseUnit),
      stockQuantity: Number(product.stockQuantity),
    };
  } catch (error) {
    console.error("Error in getProductById:", error);
    throw new Error("Failed to fetch product details.");
  }
}

/**
 * Create a new product.
 */
export async function createProduct(formData) {
  await requireAdmin();

  // Extract variables
  const { name, sku, description, baseUnit, pricePerBaseUnit, stockQuantity } = formData;

  // Server-side validation
  if (!name || name.trim() === "") {
    return { success: false, error: "Product Name is required." };
  }
  if (!sku || sku.trim() === "") {
    return { success: false, error: "SKU is required." };
  }
  if (!baseUnit || !["g", "kg", "mL", "L", "item"].includes(baseUnit)) {
    return { success: false, error: "A valid base unit is required." };
  }

  const price = parseFloat(pricePerBaseUnit);
  if (isNaN(price) || price < 0) {
    return { success: false, error: "Price must be a valid positive number." };
  }

  const stock = parseFloat(stockQuantity);
  if (isNaN(stock) || stock < 0) {
    return { success: false, error: "Stock must be a valid non-negative number." };
  }

  try {
    // Check if SKU is unique
    const existingProduct = await prisma.product.findUnique({
      where: { sku: sku.trim() },
    });
    if (existingProduct) {
      return { success: false, error: "Product SKU code must be unique. This SKU already exists." };
    }

    const newProduct = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.create({
        data: {
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          description: description?.trim() || null,
          baseUnit,
          pricePerBaseUnit: price,
          stockQuantity: stock,
        },
      });

      // Log initial stock creation transaction
      await tx.inventoryTransaction.create({
        data: {
          productId: prod.id,
          quantityChanged: stock,
          actionType: "PRODUCT_CREATED",
        },
      });

      return prod;
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, product: { ...newProduct, pricePerBaseUnit: price, stockQuantity: stock } };
  } catch (error) {
    console.error("Error in createProduct:", error);
    return { success: false, error: "Database write error. Could not create product." };
  }
}

/**
 * Update an existing product.
 */
export async function updateProduct(id, formData) {
  await requireAdmin();
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return { success: false, error: "Invalid product reference identifier." };
  }

  const { name, sku, description, baseUnit, pricePerBaseUnit, stockQuantity } = formData;

  // Server-side validation
  if (!name || name.trim() === "") {
    return { success: false, error: "Product Name is required." };
  }
  if (!sku || sku.trim() === "") {
    return { success: false, error: "SKU is required." };
  }
  if (!baseUnit || !["g", "kg", "mL", "L", "item"].includes(baseUnit)) {
    return { success: false, error: "A valid base unit is required." };
  }

  const price = parseFloat(pricePerBaseUnit);
  if (isNaN(price) || price < 0) {
    return { success: false, error: "Price must be a valid positive number." };
  }

  const stock = parseFloat(stockQuantity);
  if (isNaN(stock) || stock < 0) {
    return { success: false, error: "Stock must be a valid non-negative number." };
  }

  try {
    // Check if SKU is taken by another product record
    const existingProductWithSku = await prisma.product.findFirst({
      where: {
        sku: sku.trim().toUpperCase(),
        NOT: { id: parsedId },
      },
    });
    if (existingProductWithSku) {
      return { success: false, error: "Product SKU code must be unique. This SKU is already taken." };
    }

    const updated = await prisma.$transaction(async (tx) => {
      const oldProd = await tx.product.findUnique({
        where: { id: parsedId },
        select: { stockQuantity: true },
      });

      if (!oldProd) {
        throw new Error("Product not found.");
      }

      const prod = await tx.product.update({
        where: { id: parsedId },
        data: {
          name: name.trim(),
          sku: sku.trim().toUpperCase(),
          description: description?.trim() || null,
          baseUnit,
          pricePerBaseUnit: price,
          stockQuantity: stock,
        },
      });

      const diff = stock - Number(oldProd.stockQuantity);
      if (diff !== 0) {
        await tx.inventoryTransaction.create({
          data: {
            productId: prod.id,
            quantityChanged: diff,
            actionType: "PRODUCT_UPDATED",
          },
        });
      }

      return prod;
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/edit/${parsedId}`);
    revalidatePath(`/products/${parsedId}`);
    revalidatePath("/products");

    return { success: true, product: { ...updated, pricePerBaseUnit: price, stockQuantity: Number(updated.stockQuantity) } };
  } catch (error) {
    console.error("Error in updateProduct:", error);
    return { success: false, error: "Database write error. Could not update product." };
  }
}

/**
 * Delete a product by ID.
 */
export async function deleteProduct(id) {
  await requireAdmin();
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return { success: false, error: "Invalid product reference identifier." };
  }

  try {
    // Check if product is referenced in order items before deleting (integrity constraint helper)
    const activeOrdersCount = await prisma.orderItem.count({
      where: { productId: parsedId },
    });
    if (activeOrdersCount > 0) {
      return {
        success: false,
        error: `Cannot delete this product. It is linked to ${activeOrdersCount} existing order items.`
      };
    }

    await prisma.product.delete({
      where: { id: parsedId },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    return { success: false, error: "Database deletion failed. Make sure the record exists." };
  }
}
