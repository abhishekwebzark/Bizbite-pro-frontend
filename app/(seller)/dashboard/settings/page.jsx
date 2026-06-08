"use client";
import { useState } from "react";
import {
  FaCreditCard,
  FaWhatsapp,
  FaBox,
  FaLayerGroup,
  FaChartLine,
  FaFileInvoice,
  FaCalendarAlt,
  FaRedo,
  FaGlobe,
  FaMapMarkerAlt,
  FaStickyNote,
  FaUsers,
  FaBolt,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";

const proFeatures = [
  { icon: <FaCreditCard />, label: "UPI / Online Payments", desc: "Accept Razorpay, GPay, PhonePe" },
  { icon: <FaWhatsapp />, label: "WhatsApp Notifications", desc: "Instant order alerts" },
  { icon: <FaBox />, label: "Unlimited Products", desc: "No product limit" },
  { icon: <FaLayerGroup />, label: "Unlimited Categories", desc: "No category limit" },
  { icon: <FaChartLine />, label: "Full Analytics", desc: "Revenue insights" },
  { icon: <FaFileInvoice />, label: "Payment History", desc: "Track COD & UPI" },
  { icon: <FaCalendarAlt />, label: "Scheduled Orders", desc: "Advance ordering" },
  { icon: <FaRedo />, label: "1-Tap Reorder", desc: "Quick repeat orders" },
  { icon: <FaGlobe />, label: "Custom Domain", desc: "Use your own domain" },
  { icon: <FaMapMarkerAlt />, label: "Order Tracking", desc: "Live delivery tracking" },
  { icon: <FaStickyNote />, label: "Order Notes", desc: "Special instructions" },
  { icon: <FaUsers />, label: "Customer List", desc: "Manage customers" },
];

export default function SettingsPage() {
  const [notifPush, setNotifPush] = useState(true);
  const [trialStarted, setTrialStarted] = useState(false);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#1C1C1C]">Settings</h1>
        <p className="text-gray-500 text-xs">Manage account & subscription</p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-xl border p-4">
        <div className="flex justify-between mb-3">
          <h2 className="text-sm font-semibold">Current Plan</h2>
          <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
            Free
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Products", value: "8 / 10" },
            { label: "Categories", value: "3 / 3" },
            { label: "Orders", value: "Unlimited" },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-lg p-2">
              <p className="font-bold text-[#1A4D2E] text-sm">{s.value}</p>
              <p className="text-[10px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Card */}
      {!trialStarted ? (
        <div className="bg-[#1A4D2E] rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[#F4A300] font-bold">Pro Plan</p>
              <p className="text-green-200 text-xs">₹149/month</p>
            </div>
            <span className="text-xs bg-[#F4A300]/20 px-2 py-1 rounded">
              14-day trial
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {proFeatures.map((f) => (
              <div key={f.label} className="flex gap-2 bg-white/5 p-2 rounded-lg">
                <div className="text-white text-sm">{f.icon}</div>
                <div>
                  <p className="text-white text-[11px] font-medium">{f.label}</p>
                  <p className="text-green-300 text-[10px]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setTrialStarted(true)}
            className="w-full bg-[#F4A300] text-[#1A4D2E] text-sm font-bold py-2.5 rounded-lg hover:bg-amber-400"
          >
            Start Free Trial
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border rounded-xl p-4 text-center">
          <p className="font-semibold text-[#1A4D2E] text-sm">
            Trial Activated
          </p>
          <p className="text-xs text-gray-500 mt-1">
            You have full Pro access for 14 days
          </p>
        </div>
      )}

      {/* Notifications */}
      <div className="bg-white rounded-xl border p-4 space-y-3">
        <h2 className="text-sm font-semibold">Notifications</h2>

        <div className="flex justify-between items-center">
          <p className="text-sm">Push Notifications</p>
          <button
            onClick={() => setNotifPush(!notifPush)}
            className={`w-10 h-5 rounded-full ${
              notifPush ? "bg-[#1A4D2E]" : "bg-gray-300"
            }`}
          />
        </div>

        <div className="flex justify-between items-center opacity-50">
          <p className="text-sm flex items-center gap-2">
            <FaLock /> WhatsApp Notifications
          </p>
          <span className="text-xs text-amber-600">Pro</span>
        </div>
      </div>

      {/* Account */}
      <div className="bg-white rounded-xl border p-4 space-y-3">
        <h2 className="text-sm font-semibold">Account</h2>

        {/* Mobile Locked */}
        <div className="flex justify-between items-center opacity-60">
          <div>
            <p className="text-sm flex items-center gap-2">
              <FaLock /> Mobile Number
            </p>
            <p className="text-xs text-gray-400">+91 98765 43210</p>
          </div>
        </div>

        {/* Store */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">Store Name</p>
            <p className="text-xs text-gray-400">Ramesh Tiffin Centre</p>
          </div>
          <button className="text-xs text-[#1A4D2E]">Edit</button>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 text-sm border border-red-200 text-red-500 py-2 rounded-lg">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-gray-300">
        BizBiteNow · v1.0
      </p>
    </div>
  );
}