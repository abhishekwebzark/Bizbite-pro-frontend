"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

const categories = ["Tiffin", "Breakfast", "Snacks", "Drinks", "Sweets", "Other"];

const mockProducts = {
  1: { name: "Dal Tadka Tiffin", price: "80", category: "Tiffin", description: "Homestyle dal tadka with 2 rotis, salad & pickle", imagePreview: null },
  2: { name: "Rajma Chawal", price: "80", category: "Tiffin", description: "Classic rajma with steamed rice", imagePreview: null },
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id || "1";
  const existing = mockProducts[productId] || mockProducts[1];

  const [form, setForm] = useState({ ...existing, image: null });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({ ...prev, image: file, imagePreview: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Product name required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) errs.price = "Enter valid price";
    if (!form.category) errs.category = "Select a category";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => router.push("/dashboard/products"), 1500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">✅</div>
        <h2 className="text-xl font-bold text-[#1A4D2E]">Product Updated!</h2>
        <p className="text-gray-500 text-sm">Redirecting to products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-xl transition">←</button>
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">Edit Product</h1>
          <p className="text-gray-500 text-sm">Update product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <label className="block text-sm font-semibold text-[#1C1C1C] mb-3">Product Image</label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-50 to-amber-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
              {form.imagePreview ? (
                <img src={form.imagePreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">🍛</span>
              )}
            </div>
            <div>
              <label className="cursor-pointer bg-[#1A4D2E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#2d6b42] transition inline-block">
                Change Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </label>
              <p className="text-xs text-gray-400 mt-1.5">Auto-compressed to 50KB WebP</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <h2 className="font-semibold text-[#1C1C1C]">Product Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name <span className="text-red-400">*</span></label>
            <input
              type="text" name="name" value={form.name} onChange={handleChange}
              className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#1A4D2E] bg-gray-50 focus:bg-white"}`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (₹) <span className="text-red-400">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="number" name="price" value={form.price} onChange={handleChange}
                  className={`w-full border rounded-xl pl-7 pr-4 py-3 text-sm outline-none transition ${errors.price ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#1A4D2E] bg-gray-50 focus:bg-white"}`}
                />
              </div>
              {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category <span className="text-red-400">*</span></label>
              <select
                name="category" value={form.category} onChange={handleChange}
                className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${errors.category ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-[#1A4D2E] bg-gray-50 focus:bg-white"}`}
              >
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              name="description" value={form.description} onChange={handleChange} rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none transition focus:border-[#1A4D2E] bg-gray-50 focus:bg-white resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border border-gray-200 py-3.5 rounded-2xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={saving}
            className="flex-1 bg-[#1A4D2E] text-white font-bold py-3.5 rounded-2xl text-sm hover:bg-[#2d6b42] transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {saving ? (
              <><span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Saving...</>
            ) : "✅ Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}