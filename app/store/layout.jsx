"use client";
import { CartProvider } from "../context/CartContext";

export default function StoreLayout({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FAFAF5]">
        {children}
      </div>
    </CartProvider>
  );
}