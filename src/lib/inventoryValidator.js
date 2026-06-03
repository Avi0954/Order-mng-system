import { prisma } from "@/lib/prisma";
import { convertToBaseUnit, getUnitCategory } from "./unitConverter";

/**
 * Checks if a product has sufficient stock level in base units.
 * Returns { available: boolean, currentStock: number, baseUnit: string }
 */
export async function checkStock(productId, baseQuantityNeeded) {
  const parsedId = parseInt(productId, 10);
  if (isNaN(parsedId)) {
    return { available: false, currentStock: 0, baseUnit: "" };
  }

  const product = await prisma.product.findUnique({
    where: { id: parsedId },
    select: { stockQuantity: true, baseUnit: true },
  });

  if (!product) {
    return { available: false, currentStock: 0, baseUnit: "" };
  }

  const stock = Number(product.stockQuantity);
  const needed = Number(baseQuantityNeeded);

  return {
    available: stock >= needed,
    currentStock: stock,
    baseUnit: product.baseUnit,
  };
}

/**
 * Validates that an order quantity is a positive number and uses a unit
 * compatible with the product's base unit.
 */
export function validateOrderQuantity(quantity, unit, baseUnit) {
  const q = parseFloat(quantity);
  if (isNaN(q) || q <= 0) {
    return { valid: false, error: "Ordered quantity must be a positive number greater than zero." };
  }

  const unitCat = getUnitCategory(unit);
  const baseCat = getUnitCategory(baseUnit);

  if (!unitCat || !baseCat || unitCat !== baseCat) {
    return {
      valid: false,
      error: `Measurement units are incompatible: cannot order unit "${unit}" for product with base unit "${baseUnit}".`,
    };
  }

  return { valid: true };
}

/**
 * Retrieves the current stock level of a product.
 */
export async function getAvailableStock(productId) {
  const parsedId = parseInt(productId, 10);
  if (isNaN(parsedId)) return 0;

  const product = await prisma.product.findUnique({
    where: { id: parsedId },
    select: { stockQuantity: true },
  });

  return product ? Number(product.stockQuantity) : 0;
}
