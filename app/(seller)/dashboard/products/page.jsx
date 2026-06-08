"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ImageOff, Lock } from "lucide-react";

const MAX_PRODUCTS = 10;

function ProductImage({ image, name }) {
  const [err, setErr] = useState(false);
  const initials = name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  if (image && image.startsWith("data:") && !err) {
    return <img src={image} alt={name} className="w-full h-full object-cover" onError={() => setErr(true)} />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-amber-50 gap-1">
      <span className="text-2xl font-black text-green-700 opacity-60">{initials}</span>
      <ImageOff size={12} className="text-gray-300" />
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
    setLoading(false);
  }, []);

  const updateStorage = (data) => {
    setProducts(data);
    localStorage.setItem("products", JSON.stringify(data));
  };

  const toggleAvailability = (id) => {
    updateStorage(products.map((p) => p.id === id ? { ...p, available: !p.available } : p));
  };

  const doDelete = () => {
    updateStorage(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const remaining = MAX_PRODUCTS - products.length;
  const atLimit = remaining <= 0;

  if (loading) {
    return <div className="flex items-center justify-center min-h-40"><div className="w-8 h-8 border-4 border-green-700/20 border-t-green-700 rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-600">{products.length}/{MAX_PRODUCTS} slots used</p>
        </div>
        {atLimit ? (
          <button className="flex items-center gap-1.5 bg-amber-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl">
            <Lock size={14} /> Upgrade for More
          </button>
        ) : (
          <Link href="/dashboard/products/add" className="flex items-center gap-1.5 bg-green-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-green-800 transition">
            <Plus size={16} /> Add Product
          </Link>
        )}
      </div>

      {/* Warnings */}
      {atLimit && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-red-700 font-medium">All 10 product slots used on Free Tier</p>
          <button className="text-xs font-bold text-green-700 hover:underline">Unlock unlimited on Pro</button>
        </div>
      )}
      {!atLimit && remaining <= 3 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-amber-800 font-medium">Only {remaining} slot{remaining !== 1 ? "s" : ""} remaining on Free Tier</p>
          <button className="text-xs font-bold text-green-700 hover:underline">Upgrade to Pro</button>
        </div>
      )}

      {/* Slot Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4">
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span className="font-medium">Product Slots</span>
          <span className="font-semibold">{products.length} / {MAX_PRODUCTS}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${atLimit ? "bg-red-400" : "bg-green-700"}`}
            style={{ width: `${(products.length / MAX_PRODUCTS) * 100}%` }} />
        </div>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <ImageOff size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No products yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first product to get started</p>
          <Link href="/dashboard/products/add" className="inline-flex items-center gap-1.5 mt-4 bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-green-800 transition">
            <Plus size={15} /> Add First Product
          </Link>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
            {/* Image */}
            <div className="h-36 overflow-hidden">
              <ProductImage image={product.image} name={product.name} />
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded-full font-medium">{product.category}</span>
                    {product.unit && <span className="text-xs text-gray-500">{product.unit}</span>}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-green-700 text-lg">₹{product.sellingPrice || product.price}</p>
                  {product.mrp && Number(product.mrp) > Number(product.sellingPrice || product.price) && (
                    <p className="text-xs text-gray-400 line-through">₹{product.mrp}</p>
                  )}
                </div>
              </div>

              {product.description && (
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
              )}

              {/* Availability Toggle */}
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs font-semibold ${product.available ? "text-green-700" : "text-gray-400"}`}>
                  {product.available ? "Available" : "Unavailable"}
                </span>
                <button
                  onClick={() => toggleAvailability(product.id)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${product.available ? "bg-green-700" : "bg-gray-200"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${product.available ? "left-5" : "left-0.5"}`} />
                </button>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <Link href={`/dashboard/products/edit/${product.id}`}
                  className="flex-1 text-center text-xs font-semibold border border-green-700 text-green-700 py-2 rounded-xl hover:bg-green-50 transition flex items-center justify-center gap-1">
                  <Pencil size={12} /> Edit
                </Link>
                <button onClick={() => setDeleteId(product.id)}
                  className="flex-1 text-xs font-semibold border border-red-200 text-red-500 py-2 rounded-xl hover:bg-red-50 transition flex items-center justify-center gap-1">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Single Add Slot card */}
        {!atLimit && products.length > 0 && (
          <Link href="/dashboard/products/add"
            className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 min-h-[220px] hover:border-green-600 hover:bg-green-50/50 transition group">
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-green-100 flex items-center justify-center transition">
              <Plus size={20} className="text-gray-400 group-hover:text-green-700 transition" />
            </div>
            <span className="text-xs text-gray-400 group-hover:text-green-700 font-medium transition">Add Product</span>
          </Link>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <Trash2 size={32} className="mx-auto text-red-400 mb-3" />
            <h3 className="text-lg font-bold text-center text-gray-900">Delete Product?</h3>
            <p className="text-sm text-gray-600 text-center mt-1 mb-5">
              "{products.find((p) => p.id === deleteId)?.name}" will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={doDelete} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-600 transition">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}