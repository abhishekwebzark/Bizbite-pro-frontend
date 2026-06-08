"use client";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import { getMockStore } from "../../../lib/mockStoreData";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const subdomain = params?.subdomain || "";

  const { getTotal, getCartItems, clearCart } = useCart();

  // ✅ FIX 1: useEffect हटाया (direct derive)
  const store = getMockStore(subdomain);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const cartItems = getCartItems(store.products);
  const total = getTotal(store.products);

  // ✅ FIX 2: redirect inside useEffect
  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace(`/store/${subdomain}`);
    }
  }, [cartItems, router, subdomain]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Sahi 10-digit mobile number daalein";
    if (form.address.trim().length < 10)
      e.address = "Pura address daalein";
    return e;
  };

  const placeOrder = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setPlacing(true);

    const orderId = "#ORD-" + Math.floor(100 + Math.random() * 900);
    await new Promise((r) => setTimeout(r, 1200));

    clearCart();
    setPlacing(false);

    router.push(
      `/store/${subdomain}/success?orderId=${orderId}&total=${total}&name=${encodeURIComponent(
        form.name
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAF5]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"
        >
          ←
        </button>
        <div>
          <h1 className="font-black text-lg">Checkout</h1>
          <p className="text-xs text-gray-400">{store.name}</p>
        </div>
      </div>

      <div className="px-4 py-4 pb-36 space-y-4">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-sm mb-3">Order Summary</p>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1.5">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Naam"
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded"
          />
          {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
        </div>
      </div>

      {/* Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <button
          onClick={placeOrder}
          disabled={placing}
          className="w-full bg-black text-white p-3 rounded"
        >
          {placing ? "Placing..." : `Order ₹${total}`}
        </button>
      </div>
    </div>
  );
}