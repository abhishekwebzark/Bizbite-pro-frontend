"use client";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { getMockStore } from "../../../lib/mockStoreData";

export default function CartPage() {
  const params = useParams();
  const router = useRouter();
  const subdomain = params?.subdomain || "";

  const { addItem, removeItem, getTotal, getCartItems } = useCart();

  // ✅ FIX: direct derive (no state, no effect)
  const store = getMockStore(subdomain);

  // Optional safety
  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Store not found</p>
      </div>
    );
  }

  const cartItems = getCartItems(store.products);
  const total = getTotal(store.products);

  // 🛒 Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF5] flex flex-col items-center justify-center px-5 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-[#1C1C1C]">Cart Khaali Hai</h2>
        <p className="text-gray-500 text-sm mt-1">Kuch items add karein pehle</p>

        <button
          onClick={() => router.push(`/store/${subdomain}`)}
          className="mt-5 font-bold py-3 px-6 rounded-2xl text-white text-sm transition"
          style={{ backgroundColor: store.color }}
        >
          ← Menu Dekho
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5]">

      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
        >
          ←
        </button>

        <div>
          <h1 className="font-black text-[#1C1C1C] text-lg">Aapka Cart</h1>
          <p className="text-xs text-gray-400">{store.name}</p>
        </div>
      </div>

      <div className="px-4 py-4 pb-36 space-y-4">

        {/* Items */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {cartItems.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                idx !== cartItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover"
                    alt={item.name}
                  />
                ) : (
                  item.emoji
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#1C1C1C] text-sm truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-400">
                  ₹{item.price} × {item.qty}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-7 h-7 rounded-lg border-2 flex items-center justify-center font-black text-sm"
                  style={{ borderColor: store.color, color: store.color }}
                >
                  −
                </button>

                <span
                  className="w-5 text-center font-black text-sm"
                  style={{ color: store.color }}
                >
                  {item.qty}
                </span>

                <button
                  onClick={() => addItem(item.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-sm"
                  style={{ backgroundColor: store.color }}
                >
                  +
                </button>
              </div>

              <p
                className="w-14 text-right font-bold text-sm"
                style={{ color: store.color }}
              >
                ₹{item.price * item.qty}
              </p>
            </div>
          ))}
        </div>

        {/* Bill Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2">
          <p className="font-bold text-sm mb-3">Bill Summary</p>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-xs text-gray-500">
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between text-xs text-gray-500 pt-1">
            <span>Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>

          <div className="flex justify-between font-black text-sm pt-2 border-t">
            <span>Total</span>
            <span style={{ color: store.color }}>₹{total}</span>
          </div>
        </div>

        {/* COD */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex gap-2">
          <span>💰</span>
          <div>
            <p className="text-xs font-bold text-amber-800">Sirf Cash on Delivery</p>
            <p className="text-xs text-amber-700">
              Delivery ke waqt ₹{total} ready rakhein
            </p>
          </div>
        </div>

        {/* Add more */}
        <button
          onClick={() => router.push(`/store/${subdomain}`)}
          className="w-full border-2 border-dashed rounded-2xl py-3 text-sm font-semibold"
          style={{ borderColor: store.color, color: store.color }}
        >
          + Aur Items Add Karein
        </button>
      </div>

      {/* Checkout */}
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-6 pt-2 bg-gradient-to-t from-[#FAFAF5]">
        <button
          onClick={() => router.push(`/store/${subdomain}/checkout`)}
          className="w-full text-white font-black py-4 rounded-2xl flex justify-between px-5"
          style={{ backgroundColor: store.color }}
        >
          <span>Checkout Karein</span>
          <span>₹{total} →</span>
        </button>
      </div>
    </div>
  );
}