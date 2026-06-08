"use client";
import { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiAlertTriangle,
  FiGrid,
  FiSave,
  FiX,
} from "react-icons/fi";
import { MdRestaurantMenu } from "react-icons/md";

const MAX_CATEGORIES = 3;

const initialCategories = [
  { id: 1, name: "Tiffin", productCount: 4 },
  { id: 2, name: "Breakfast", productCount: 2 },
  { id: 3, name: "Drinks", productCount: 2 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const atLimit = categories.length >= MAX_CATEGORIES;

  const addCategory = () => {
    if (!newName.trim()) {
      setError("Category name required");
      return;
    }
    if (atLimit) return;

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        productCount: 0,
      },
    ]);
    setNewName("");
    setError("");
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const saveEdit = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, name: editName } : c
      )
    );
    setEditId(null);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#1C1C1C]">
          Categories
        </h1>
        <p className="text-gray-500 text-xs mt-0.5">
          {categories.length}/{MAX_CATEGORIES} categories used
        </p>
      </div>

      {/* Limit Warning */}
      {atLimit && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-center justify-between">
          <p className="text-xs text-red-700 font-medium flex items-center gap-2">
            <FiAlertTriangle /> Category limit reached
          </p>
          <button className="text-xs font-semibold text-[#1A4D2E] hover:underline">
            Upgrade →
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-3 py-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Category Slots</span>
          <span>
            {categories.length} / {MAX_CATEGORIES}
          </span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              atLimit ? "bg-red-400" : "bg-[#1A4D2E]"
            }`}
            style={{
              width: `${
                (categories.length / MAX_CATEGORIES) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-xl border border-gray-100 px-3 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <MdRestaurantMenu size={16} />
              </div>

              <div>
                {editId === cat.id ? (
                  <input
                    value={editName}
                    onChange={(e) =>
                      setEditName(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      saveEdit(cat.id)
                    }
                    className="border border-[#1A4D2E] rounded px-2 py-1 text-xs outline-none"
                    autoFocus
                  />
                ) : (
                  <p className="text-sm font-medium text-[#1C1C1C]">
                    {cat.name}
                  </p>
                )}
                <p className="text-[11px] text-gray-400">
                  {cat.productCount} items
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {editId === cat.id ? (
                <>
                  <button
                    onClick={() => saveEdit(cat.id)}
                    className="p-1.5 bg-[#1A4D2E] text-white rounded-md"
                  >
                    <FiSave size={12} />
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="p-1.5 border rounded-md text-gray-500"
                  >
                    <FiX size={12} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(cat.id);
                      setEditName(cat.name);
                    }}
                    className="p-1.5 border rounded-md text-gray-600"
                  >
                    <FiEdit2 size={12} />
                  </button>
                  <button
                    onClick={() =>
                      deleteCategory(cat.id)
                    }
                    disabled={cat.productCount > 0}
                    className="p-1.5 border border-red-200 text-red-500 rounded-md disabled:opacity-40"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add */}
      {!atLimit ? (
        <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-2">
          <h2 className="text-sm font-semibold text-[#1C1C1C]">
            Add Category
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
                setError("");
              }}
              placeholder="Category name"
              className={`flex-1 border rounded-lg px-3 py-2 text-xs outline-none ${
                error
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200"
              }`}
            />

            <button
              onClick={addCategory}
              className="bg-[#1A4D2E] text-white px-3 py-2 rounded-lg text-xs flex items-center gap-1"
            >
              <FiPlus size={14} />
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-3 text-center">
          <p className="text-xs text-amber-800 mb-1">
            Upgrade for unlimited categories
          </p>
          <button className="bg-[#F4A300] text-[#1A4D2E] px-4 py-1.5 rounded-lg text-xs font-semibold">
            Start Free Trial
          </button>
        </div>
      )}
    </div>
  );
}