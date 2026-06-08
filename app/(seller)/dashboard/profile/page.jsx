"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "Ramesh Kumar",
    phone: "9876543210",
    storeName: "Ramesh Tiffin Centre",
    city: "Meerut",
    state: "Uttar Pradesh",
    pincode: "250001",
    about: "Homestyle tiffin service in Meerut. Daily fresh meals since 2018.",
    avatar: null,
    avatarPreview: null,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: ev.target.result,
      }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = form.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1C1C1C] bg-white outline-none focus:border-[#1A4D2E] focus:ring-2 focus:ring-[#1A4D2E]/20 transition";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Profile</h1>
        <p className="text-[#4B5563] text-sm">
          Your personal & business information
        </p>
      </div>

      {/* Avatar */}
      <div className="bg-white rounded-2xl border p-5 flex items-center gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-[#1A4D2E] flex items-center justify-center overflow-hidden">
            {form.avatarPreview ? (
              <img src={form.avatarPreview} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-2xl font-bold">{initials}</span>
            )}
          </div>

          <label className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#F4A300] rounded-full flex items-center justify-center cursor-pointer">
            ✏️
            <input type="file" className="hidden" onChange={handleAvatar} />
          </label>
        </div>

        <div>
          <p className="font-bold text-lg text-[#1C1C1C]">{form.name}</p>
          <p className="text-[#6B7280] text-sm">{form.storeName}</p>
        </div>
      </div>

      {/* Personal */}
      <div className="bg-white rounded-2xl border p-5 space-y-4">
        <h2 className="font-semibold text-[#1C1C1C]">Personal Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#1C1C1C]">
              Full Name
            </label>
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium text-[#1C1C1C]">
              Mobile
            </label>
            <input value={form.phone} disabled className={inputClass + " opacity-80"} />
          </div>
        </div>
      </div>

      {/* Business */}
      <div className="bg-white rounded-2xl border p-5 space-y-4">
        <h2 className="font-semibold text-[#1C1C1C]">Business Details</h2>

        <input name="storeName" value={form.storeName} onChange={handleChange} className={inputClass} />

        <div className="grid grid-cols-2 gap-4">
          <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
          <input name="pincode" value={form.pincode} onChange={handleChange} className={inputClass} />
        </div>

        <textarea name="about" value={form.about} onChange={handleChange} className={inputClass} />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full bg-[#1A4D2E] text-white py-4 rounded-2xl font-bold"
      >
        {saving ? "Saving..." : saved ? "✅ Saved!" : "Save Profile"}
      </button>
    </div>
  );
}