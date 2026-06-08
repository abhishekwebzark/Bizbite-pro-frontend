"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, Trash2, CheckCircle } from "lucide-react";

const CATEGORIES = ["Tiffin", "Breakfast", "Snacks", "Drinks", "Sweets", "Other"];
const UNITS = ["1 plate", "1 piece", "200ml", "300ml", "500ml", "1 litre", "250g", "500g", "1kg", "1 box", "per serving"];
const MAX_PRODUCTS = 10;

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    mrp: "",
    sellingPrice: "",
    unit: "",
    category: "",
    description: "",
    imageUrl: "",
    imagePreview: null,
    isAvailable: true,
    isDeleted: false,
  });
  const [extraDetails, setExtraDetails] = useState([]); // QA-005: key-value map
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  // QA-003: ImageUrl field + file upload
  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((p) => ({ ...p, image: "Only JPG, PNG, or WebP allowed" })); return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "File must be under 5MB" })); return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, imagePreview: ev.target.result, imageUrl: "" }));
    reader.readAsDataURL(file);
    setErrors((p) => ({ ...p, image: "" }));
  };

  // QA-005: ExtraDetails key-value map
  const addExtra = () => setExtraDetails((p) => [...p, { key: "", value: "" }]);
  const updateExtra = (i, field, val) => setExtraDetails((p) => p.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
  const removeExtra = (i) => setExtraDetails((p) => p.filter((_, idx) => idx !== i));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required";
    if (!form.sellingPrice || isNaN(form.sellingPrice) || Number(form.sellingPrice) <= 0) e.sellingPrice = "Enter a valid selling price";
    if (form.mrp && Number(form.mrp) < Number(form.sellingPrice)) e.mrp = "MRP cannot be less than selling price";
    if (!form.category) e.category = "Select a category";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Check product limit
    const existing = JSON.parse(localStorage.getItem("products") || "[]");
    if (existing.length >= MAX_PRODUCTS) {
      setErrors({ name: `Free Tier limit: max ${MAX_PRODUCTS} products reached` });
      return;
    }

    setSaving(true);

    // QA-003/004/005: Save all fields to localStorage
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      mrp: form.mrp ? Number(form.mrp) : null,
      sellingPrice: Number(form.sellingPrice),
      price: Number(form.sellingPrice), // alias for display
      unit: form.unit,
      category: form.category,
      description: form.description.trim(),
      image: form.imagePreview || form.imageUrl || null,
      imageUrl: form.imageUrl || null,
      isAvailable: form.isAvailable,
      available: form.isAvailable,
      isDeleted: false,
      extraDetails: extraDetails.filter((e) => e.key.trim()), // key-value map
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("products", JSON.stringify([...existing, newProduct]));
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSuccess(true);
    setTimeout(() => router.push("/dashboard/products"), 1200);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <CheckCircle size={56} className="text-green-600" />
        <h2 className="text-xl font-bold text-green-700">Product Added Successfully</h2>
        <p className="text-gray-600 text-sm">Redirecting to products...</p>
      </div>
    );
  }

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 ${errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 focus:border-green-600 bg-gray-50 focus:bg-white"}`;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-700">←</button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <p className="text-gray-600 text-sm">Fill in the product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Image Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <label className="block text-sm font-semibold text-gray-800 mb-3">Product Image</label>

          <div className="flex items-start gap-4">
            {/* Preview */}
            <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center">
              {(form.imagePreview || form.imageUrl) ? (
                <img src={form.imagePreview || form.imageUrl} className="w-full h-full object-cover" alt="preview"
                  onError={() => setForm((p) => ({ ...p, imagePreview: null }))} />
              ) : (
                <Upload size={24} className="text-gray-300" />
              )}
            </div>

            <div className="flex-1 space-y-2">
              {/* File Upload */}
              <label className="cursor-pointer bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-green-800 transition inline-flex items-center gap-2">
                <Upload size={14} /> Upload Photo
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleImageFile} />
              </label>

              {/* QA-003: ImageUrl field */}
              <div>
                <input type="url" name="imageUrl" value={form.imageUrl} onChange={handleChange}
                  placeholder="Or paste image URL (https://...)"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 outline-none focus:border-green-600 bg-gray-50 focus:bg-white placeholder:text-gray-400 transition" />
              </div>

              <p className="text-xs text-gray-500">JPG, PNG, WebP · Max 5MB</p>
              {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h2 className="font-semibold text-gray-800">Product Details</h2>

          {/* Name — QA-003 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Dal Tadka Tiffin" className={inputClass("name")} />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* MRP + Selling Price — QA-004 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">MRP (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">₹</span>
                <input type="number" name="mrp" value={form.mrp} onChange={handleChange}
                  placeholder="0" min="0" className={`${inputClass("mrp")} pl-7`} />
              </div>
              {errors.mrp && <p className="text-xs text-red-500 mt-1">{errors.mrp}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price (₹) *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">₹</span>
                <input type="number" name="sellingPrice" value={form.sellingPrice} onChange={handleChange}
                  placeholder="0" min="0" className={`${inputClass("sellingPrice")} pl-7`} />
              </div>
              {errors.sellingPrice && <p className="text-xs text-red-500 mt-1">{errors.sellingPrice}</p>}
              {form.mrp && form.sellingPrice && Number(form.mrp) > Number(form.sellingPrice) && (
                <p className="text-xs text-green-600 mt-1 font-medium">
                  {Math.round(((form.mrp - form.sellingPrice) / form.mrp) * 100)}% off shown to customers
                </p>
              )}
            </div>
          </div>

          {/* Category + Unit — QA-004 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Category Name *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass("category")}>
                <option value="">Select category...</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit</label>
              <select name="unit" value={form.unit} onChange={handleChange} className={inputClass("unit")}>
                <option value="">Select unit...</option>
                {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </div>
          </div>

          {/* Description — QA-003 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea name="description" value={form.description} onChange={handleChange}
              rows={3} placeholder="e.g. Homestyle dal tadka with 2 rotis, salad & pickle"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600 bg-gray-50 focus:bg-white resize-none transition" />
          </div>

          {/* IsAvailable — QA-003 */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="text-sm font-semibold text-gray-800">Available for Order</p>
              <p className="text-xs text-gray-500">Toggle to show/hide from store</p>
            </div>
            <button type="button" onClick={() => setForm((p) => ({ ...p, isAvailable: !p.isAvailable }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${form.isAvailable ? "bg-green-700" : "bg-gray-300"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.isAvailable ? "left-7" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Extra Details — QA-005: dynamic key-value map */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold text-gray-800">Extra Details</h2>
              <p className="text-xs text-gray-500 mt-0.5">Custom attributes (e.g. Spice Level: Medium, Allergens: Dairy)</p>
            </div>
            <button type="button" onClick={addExtra}
              className="flex items-center gap-1.5 text-xs font-semibold text-green-700 border border-green-700 px-3 py-1.5 rounded-xl hover:bg-green-50 transition">
              <Plus size={12} /> Add Field
            </button>
          </div>

          {extraDetails.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-3">No extra details added</p>
          ) : (
            <div className="space-y-2">
              {extraDetails.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={item.key} onChange={(e) => updateExtra(i, "key", e.target.value)}
                    placeholder="Key (e.g. Spice Level)"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600 bg-gray-50 focus:bg-white transition" />
                  <input value={item.value} onChange={(e) => updateExtra(i, "value", e.target.value)}
                    placeholder="Value (e.g. Medium)"
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-green-600 bg-gray-50 focus:bg-white transition" />
                  <button type="button" onClick={() => removeExtra(i)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition flex-shrink-0">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" disabled={saving}
          className="w-full bg-green-700 text-white font-bold py-4 rounded-2xl text-sm hover:bg-green-800 transition disabled:opacity-60 flex items-center justify-center gap-2">
          {saving ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</> : "Add Product"}
        </button>
      </form>
    </div>
  );
}