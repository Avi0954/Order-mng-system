"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { convertToBaseUnit } from "@/lib/unitConverter";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("oms_quotation_cart");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse cart localstorage", e);
        }
      }
    }
    return [];
  });

  // Save cart to localStorage on update
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("oms_quotation_cart", JSON.stringify(newCart));
  };

  /**
   * Add a product to the cart with entered quantity and unit.
   * Recalculates converted quantities and line totals.
   */
  const addToCart = (product, quantityStr, unit) => {
    const qty = parseFloat(quantityStr);
    if (isNaN(qty) || qty <= 0) return;

    // Converted quantity using our high-precision utility
    const baseQty = convertToBaseUnit(qty, unit, product.baseUnit);
    const lineTotal = baseQty * product.pricePerBaseUnit;

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];

    if (existingIndex > -1) {
      // Overwrite or update with latest selection
      newCart[existingIndex] = {
        product,
        quantity: qty,
        unit,
        convertedQuantity: baseQty,
        lineTotal,
      };
    } else {
      newCart.push({
        product,
        quantity: qty,
        unit,
        convertedQuantity: baseQty,
        lineTotal,
      });
    }

    saveCart(newCart);
  };

  /**
   * Remove a product from the quotation.
   */
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
  };

  /**
   * Update quantity and unit for a cart item.
   */
  const updateQuantity = (productId, quantityStr, unit) => {
    const qty = parseFloat(quantityStr);
    if (isNaN(qty) || qty <= 0) return;

    const item = cart.find((item) => item.product.id === productId);
    if (!item) return;

    const baseQty = convertToBaseUnit(qty, unit, item.product.baseUnit);
    const lineTotal = baseQty * item.product.pricePerBaseUnit;

    const newCart = cart.map((cItem) => {
      if (cItem.product.id === productId) {
        return {
          ...cItem,
          quantity: qty,
          unit,
          convertedQuantity: baseQty,
          lineTotal,
        };
      }
      return cItem;
    });

    saveCart(newCart);
  };

  /**
   * Flush quotation list.
   */
  const clearCart = () => {
    saveCart([]);
  };

  // Aggregated totals
  const totalProductsCount = cart.length;
  const grandTotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalProductsCount,
        grandTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
