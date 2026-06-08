"use client";
import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // { productId: qty } — session only, no saved cart (Free Tier rule)
  const [storeData, setStoreData] = useState(null);

  const addItem = useCallback((productId) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  }, []);

  const removeItem = useCallback((productId) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[productId] > 1) next[productId]--;
      else delete next[productId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  const getTotal = useCallback(
    (products = []) =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = products.find((p) => String(p.id) === String(id));
        return sum + (p ? p.price * qty : 0);
      }, 0),
    [cart]
  );

  const getCartItems = useCallback(
    (products = []) =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const p = products.find((p) => String(p.id) === String(id));
          return p ? { ...p, qty } : null;
        })
        .filter(Boolean),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, cartCount, storeData, setStoreData, addItem, removeItem, clearCart, getTotal, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}