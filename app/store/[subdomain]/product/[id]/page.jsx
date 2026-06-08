"use client";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../../../context/CartContext";
import { getMockStore } from "../../../../lib/mockStoreData";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const subdomain = params?.subdomain || "";
  const productId = Number(params?.id);
  const { cart, cartCount, addItem, removeItem, getTotal } = useCart();
  const [store, setStore] = useState(null);

  useEffect(() => {
    setStore(getMockStore(subdomain));
  }, [subdomain]);

  if (!store) return null;

  const product = store.products.find((p) => p.id === productId);
  const related = store.products.filter((p) => p.category === product?.category && p.id !== productId).slice(0, 3);
  const total = getTotal(store.products);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <p className="text-5xl mb-3">🍽️</p>
        <p className="font-bold text-[#1C1C1C]">Product nahi mila</p>
        <button onClick={() => router.back()} className="mt-4 text-sm text-[#1A4D2E] hover:underline">← Wapas Jaayein</button>
      </div>
    );
  }

  const qty = cart[product.id] || 0;

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* Back Button */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
        >
          ←
        </button>
        <p className="font-semibold text-[#1C1C1C] text-sm truncate flex-1">{product.name}</p>
        {cartCount > 0 && (
          <button
            onClick={() => router.push(`/store/${subdomain}/cart`)}
            className="relative p-2"
          >
            <span className="text-xl">🛒</span>
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-xs font-black flex items-center justify-center text-white"
              style={{ backgroundColor: "#F4A300", color: "#1A4D2E" }}
            >
              {cartCount}
            </span>
          </button>
        )}
      </div>

      <div className="pb-36">
        {/* Product Image */}
        <div
          className="w-full h-64 flex items-center justify-center text-8xl"
          style={{ background: `linear-gradient(135deg, ${store.color}15, #F4A30020)` }}
        >
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            : product.emoji}
        </div>

        <div className="px-4 py-5 space-y-4">
          {/* Product Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h1 className="text-xl font-black text-[#1C1C1C] leading-tight">{product.name}</h1>
                <span
                  className="inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: `${store.color}15`, color: store.color }}
                >
                  {product.category}
                </span>
              </div>
              <p className="text-2xl font-black flex-shrink-0" style={{ color: store.color }}>₹{product.price}</p>
            </div>

            {product.description && (
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">{product.description}</p>
            )}

            {/* Availability */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`w-2 h-2 rounded-full ${product.available ? "bg-green-400" : "bg-red-400"}`} />
              <span className={`text-xs font-medium ${product.available ? "text-green-600" : "text-red-500"}`}>
                {product.available ? "Available" : "Abhi Available Nahi"}
              </span>
            </div>
          </div>

          {/* COD Badge */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-2">
            <span className="text-lg">💰</span>
            <p className="text-xs text-amber-800 font-medium">Sirf Cash on Delivery · Free Delivery</p>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <p className="font-bold text-[#1C1C1C] text-sm mb-3">Iske Saath Try Karein</p>
              <div className="space-y-2">
                {related.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 p-3 cursor-pointer hover:shadow-md transition"
                    onClick={() => router.push(`/store/${subdomain}/product/${r.id}`)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center text-2xl flex-shrink-0">
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1C1C1C] text-sm truncate">{r.name}</p>
                      <p className="font-bold text-sm mt-0.5" style={{ color: store.color }}>₹{r.price}</p>
                    </div>
                    {r.available && store.isOpen && (
                      <button
                        onClick={(e) => { e.stopPropagation(); addItem(r.id); }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-base flex-shrink-0"
                        style={{ backgroundColor: store.color }}
                      >
                        {cart[r.id] ? cart[r.id] : "+"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add to Cart / Qty Control */}
      <div className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-6 pt-2 bg-gradient-to-t from-[#FAFAF5] to-transparent">
        {!product.available || !store.isOpen ? (
          <div className="w-full bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl text-center text-sm">
            {!product.available ? "Abhi Available Nahi" : "Store Abhi Band Hai"}
          </div>
        ) : qty === 0 ? (
          <button
            onClick={() => addItem(product.id)}
            className="w-full text-white font-black py-4 rounded-2xl shadow-xl text-sm transition hover:opacity-95 active:scale-[0.99]"
            style={{ backgroundColor: store.color }}
          >
            🛒 Cart Mein Daalo — ₹{product.price}
          </button>
        ) : (
          <div className="flex gap-3">
            <div
              className="flex items-center gap-3 bg-white border-2 rounded-2xl px-5 py-3 shadow-lg"
              style={{ borderColor: store.color }}
            >
              <button onClick={() => removeItem(product.id)} className="font-black text-xl w-7 text-center" style={{ color: store.color }}>−</button>
              <span className="font-black text-lg w-6 text-center" style={{ color: store.color }}>{qty}</span>
              <button onClick={() => addItem(product.id)} className="font-black text-xl w-7 text-center" style={{ color: store.color }}>+</button>
            </div>
            <button
              onClick={() => router.push(`/store/${subdomain}/cart`)}
              className="flex-1 text-white font-black py-3 rounded-2xl shadow-xl text-sm transition hover:opacity-95"
              style={{ backgroundColor: store.color }}
            >
              Cart Dekho · ₹{total}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}