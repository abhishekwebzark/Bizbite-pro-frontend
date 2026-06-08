"use client";
import { useState } from "react";

export default function StoreFrontPage() {
  const [store, setStore] = useState({
    name: "Ramesh Tiffin Centre",
    subdomain: "rameshtiffincentre",
    color: "#1A4D2E",
    logoPreview: null,
    bannerPreview: null,
    storeOpen: true,
  });

  const [bannerError, setBannerError] = useState("");
  const [saving, setSaving] = useState(false);

  const storeUrl = `${store.subdomain}.apnadukaan.in`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const sub = value.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
      setStore((prev) => ({ ...prev, name: value, subdomain: sub }));
    } else {
      setStore((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBanner = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setBannerError("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setBannerError("Max size is 5MB");
      return;
    }

    setBannerError("");

    const reader = new FileReader();
    reader.onload = (ev) =>
      setStore((prev) => ({
        ...prev,
        bannerPreview: ev.target.result,
      }));

    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#1C1C1C]">Store Front</h1>
        <p className="text-[#4B5563] text-xs">Customize your store</p>
      </div>

      {/* Link Card */}
      <div className="bg-[#1A4D2E] rounded-xl p-4">
        <p className="text-green-300 text-xs">Store Link</p>
        <p className="text-white font-bold text-sm break-all">{storeUrl}</p>
      </div>

      {/* Branding */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <h2 className="font-semibold text-sm text-[#1C1C1C]">Branding</h2>

        {/* Name */}
        <input
          name="name"
          value={store.name}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm text-[#1C1C1C] bg-white outline-none focus:border-[#1A4D2E]"
        />

        {/* COLOR PICKER */}
        <div>
          <label className="text-sm font-medium text-[#1C1C1C]">
            Brand Color
          </label>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="color"
              value={store.color}
              onChange={(e) =>
                setStore((prev) => ({ ...prev, color: e.target.value }))
              }
              className="w-10 h-10 border rounded"
            />

            <input
              type="text"
              value={store.color}
              onChange={(e) =>
                setStore((prev) => ({ ...prev, color: e.target.value }))
              }
              className="border px-2 py-1 rounded text-sm w-28 text-[#1C1C1C]"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Banner Upload */}
        <div>
          <label className="text-sm font-medium text-[#1C1C1C]">
            Banner
          </label>

          <div className="border-dashed border rounded-lg h-24 flex items-center justify-center relative mt-2">
            {store.bannerPreview ? (
              <img
                src={store.bannerPreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <p className="text-xs text-[#6B7280]">Upload Banner</p>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleBanner}
              className="absolute inset-0 opacity-0"
            />
          </div>

          {bannerError && (
            <p className="text-xs text-red-500 mt-1">{bannerError}</p>
          )}
        </div>
      </div>

      {/* Save */}
      <button className="w-full bg-[#1A4D2E] text-white py-3 rounded-lg text-sm font-semibold">
        Save Changes
      </button>
    </div>
  );
}