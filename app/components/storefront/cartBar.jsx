"use client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CartBar({ subdomain, products = [], storeColor = "#1A4D2E" }) {
  const router = useRouter();
  const { cartCount, getTotal } = useCart();
  const total = getTotal(products);

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-2">
      <button
        onClick={() => router.push(`/store/${subdomain}/cart`)}
        className="w-full text-white font-black py-4 rounded-2xl shadow-2xl flex items-center justify-between px-5 transition hover:opacity-95 active:scale-[0.99]"
        style={{ backgroundColor: storeColor }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
            style={{ backgroundColor: "#F4A300", color: "#1A4D2E" }}
          >
            {cartCount}
          </span>
          <span className="text-sm">Cart Dekho</span>
        </div>
        <span className="font-black">₹{total} →</span>
      </button>
    </div>
  );
}