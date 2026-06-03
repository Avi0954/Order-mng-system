/**
 * Inventory standard conversion rules:
 * - Weight standard base: 'g' (1 kg = 1000 g)
 * - Volume standard base: 'mL' (1 L = 1000 mL)
 * - Count standard base: 'item' (1 item = 1 item)
 */

const CONVERSION_FACTORS = {
  // Weight conversions relative to grams (g)
  weight: {
    g: 1,
    kg: 1000,
  },
  // Volume conversions relative to milliliters (mL)
  volume: {
    mL: 1,
    L: 1000,
  },
  // Count conversions relative to items
  count: {
    item: 1,
  }
};

/**
 * Returns the unit category (weight, volume, count) based on the unit name.
 */
export function getUnitCategory(unit) {
  if (["g", "kg"].includes(unit)) return "weight";
  if (["mL", "L"].includes(unit)) return "volume";
  if (["item"].includes(unit)) return "count";
  return null;
}

/**
 * Converts an entered quantity from a selected unit into the product's base unit.
 * E.g. convertToBaseUnit(2, "kg", "g") => 2000
 */
export function convertToBaseUnit(quantity, fromUnit, baseUnit) {
  const q = parseFloat(quantity);
  if (isNaN(q) || q <= 0) return 0;

  const fromCategory = getUnitCategory(fromUnit);
  const baseCategory = getUnitCategory(baseUnit);

  if (!fromCategory || !baseCategory || fromCategory !== baseCategory) {
    throw new Error(`Incompatible units: cannot convert from ${fromUnit} to ${baseUnit}`);
  }

  // Calculate value in standard base unit (g, mL, item)
  const factorFrom = CONVERSION_FACTORS[fromCategory][fromUnit];
  const factorBase = CONVERSION_FACTORS[baseCategory][baseUnit];

  // Convert to absolute base unit then adjust to product base unit
  return (q * factorFrom) / factorBase;
}

/**
 * Converts a base quantity back into the target display unit.
 * E.g. convertFromBaseUnit(2000, "kg", "g") => 2
 */
export function convertFromBaseUnit(baseQuantity, targetUnit, baseUnit) {
  const bq = parseFloat(baseQuantity);
  if (isNaN(bq) || bq <= 0) return 0;

  const targetCategory = getUnitCategory(targetUnit);
  const baseCategory = getUnitCategory(baseUnit);

  if (!targetCategory || !baseCategory || targetCategory !== baseCategory) {
    throw new Error(`Incompatible units: cannot convert from ${baseUnit} to ${targetUnit}`);
  }

  const factorTarget = CONVERSION_FACTORS[targetCategory][targetUnit];
  const factorBase = CONVERSION_FACTORS[baseCategory][baseUnit];

  // Convert from product base unit to absolute base then to target display unit
  return (bq * factorBase) / factorTarget;
}

/**
 * Returns the valid unit options available for selection based on product's base unit.
 */
export function getAvailableUnits(baseUnit) {
  const category = getUnitCategory(baseUnit);
  if (category === "weight") return ["g", "kg"];
  if (category === "volume") return ["mL", "L"];
  return ["item"];
}
