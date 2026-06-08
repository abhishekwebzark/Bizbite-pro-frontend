"use client";
import { useState } from "react";
import { isValidPhone } from "@/lib/utils";

export default function CheckoutForm({ storeColor = "#1A4D2E", total = 0, onSubmit, loading = false }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Naam zaroori hai";
    if (!isValidPhone(form.phone)) e.phone = "Sahi 10-digit mobile number daalein";
    if (form.address.trim().length < 10) e.address = "Pura address daalein";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit?.(form);
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
      errors[field]
        ? "border-red-300 bg-red-50"
        : "border-gray-200 bg-gray-50 focus:bg-white"
    }`;

  return (
    <div className="space-y-3">
      {/* Name */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Aapka Naam *</label>
        <input
          type="text" name="name" value={form.name} onChange={handleChange}
          placeholder="Poora naam likhein"
          className={inputClass("name")}
          style={{ "--tw-ring-color": storeColor }}
          onFocus={(e) => (e.target.style.borderColor = storeColor)}
          onBlur={(e) => !errors.name && (e.target.style.borderColor = "")}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Number *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+91</span>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="10-digit number" maxLength={10}
            className={`${inputClass("phone")} pl-10`}
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      {/* Address */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Delivery Address *</label>
        <textarea
          name="address" value={form.address} onChange={handleChange}
          rows={3} placeholder="Ghar/flat no., gali, mohalla, sheher"
          className={`${inputClass("address")} resize-none`}
        />
        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
      </div>

      {/* COD notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
        <span>💰</span>
        <p className="text-xs text-amber-800 font-medium">Cash on Delivery — ₹{total} delivery pe dena hoga</p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full text-white font-black py-4 rounded-2xl text-sm shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99]"
        style={{ backgroundColor: storeColor }}
      >
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Order Ho Raha Hai...</>
        ) : (
          `🛍️ Order Place Karein — ₹${total} COD`
        )}
      </button>
    </div>
  );
}