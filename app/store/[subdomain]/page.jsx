"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";

// Mock data
const mockStore = {
  dukaanName: "Ramesh Tiffin Centre",
  subdomain: "rameshtiffin",
  brandColor: "#1A4D2E",
  logo: null,
  banner: null,
  isLive: true,
};

const mockProducts = [
  { id: "p1", name: "Dal Makhani Tiffin", category: "Tiffin", price: 140, emoji: "🍱", description: "Ghar jaisa khana, pyaar se bana" },
  { id: "p2", name: "Paneer Tiffin", category: "Tiffin", price: 160, emoji: "🍛", description: "Fresh paneer ke saath" },
  { id: "p3", name: "Veg Tiffin Full", category: "Tiffin", price: 200, emoji: "🌾", description: "2 sabzi, dal, chawal, roti" },
  { id: "p4", name: "Extra Chawal", category: "Extras", price: 30, emoji: "🍚", description: "Extra serving" },
  { id: "p5", name: "Roti (6 pcs)", category: "Extras", price: 60, emoji: "🫓", description: "Tawa se seedha" },
];

export default function StorePage() {
  const params = useParams();
  const subdomain = params?.subdomain || "";

  const {
    cart = {},
    cartCount = 0,
    addItem,
    removeItem,
    getTotal,
    getCartItems,
  } = useCart();

  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setStore(mockStore);
      setProducts(mockProducts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(t);
  }, [subdomain]);

  // categories
  const categories = useMemo(() => {
    return ["All", ...new Set(products.map((p) => p.category))];
  }, [products]);

  // filter products
  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  // qty
  const getQty = (id) => cart[id] || 0;

  // cart data
  const cartItems = getCartItems(products);
  const totalAmount = getTotal(products);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF5]">

      {/* HEADER */}
      <header
        className="sticky top-0 z-30 text-white flex justify-between items-center px-4 py-3 shadow-md"
        style={{ backgroundColor: store.brandColor }}
      >
        <span className="font-bold">{store.dukaanName}</span>

        <button
          onClick={() => setShowCart(true)}
          className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold"
        >
          🛒 {cartCount}
        </button>
      </header>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm border ${
              activeCategory === cat
                ? "bg-green-700 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-lg mx-auto px-4 space-y-3">
        {filtered.map((product) => {
          const qty = getQty(product.id);

          return (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-gray-400">{product.description}</p>
                <p className="font-bold mt-1">₹{product.price}</p>
              </div>

              {/* ADD / QTY CONTROLS */}
              {qty === 0 ? (
                <button
                  onClick={() => addItem(product.id)}
                  className="bg-green-700 text-white px-3 py-1 rounded-lg"
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
                  <button
                    onClick={() => removeItem(product.id)}
                    className="w-7 h-7 flex items-center justify-center"
                  >
                    −
                  </button>

                  <span className="font-bold">{qty}</span>

                  <button
                    onClick={() => addItem(product.id)}
                    className="w-7 h-7 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CART DRAWER */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">

          {/* BACKDROP */}
          <div
            className="absolute inset-0"
            onClick={() => setShowCart(false)}
          />

          {/* PANEL */}
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b">
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-600 font-semibold"
              >
                ← Back
              </button>

              <h2 className="font-bold">Cart</h2>

              <span />
            </div>

            {/* ITEMS */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">

              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400 mt-10">
                  Cart is empty 🛒
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => removeItem(item.id)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => addItem(item.id)}>+</button>
                    </div>

                    <div className="font-bold">
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            <div className="border-t p-4">
              <div className="flex justify-between mb-3">
                <span>Total</span>
                <span className="font-bold">₹{totalAmount}</span>
              </div>

              <button className="w-full bg-green-700 text-white py-3 rounded-lg">
                Checkout
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}