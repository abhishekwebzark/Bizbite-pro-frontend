"use client";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Phone, MapPin, CheckCircle, Truck, XCircle, ArrowLeft } from "lucide-react";

const STATUS_CONFIG = {
  PENDING:   { label: "Pending",   badge: "bg-gray-100 text-gray-700",   next: "PLACED",    nextLabel: "Mark Placed",    icon: null },
  PLACED:    { label: "Placed",    badge: "bg-blue-50 text-blue-700",    next: "SHIPPED",   nextLabel: "Mark Shipped",   icon: Truck },
  SHIPPED:   { label: "Shipped",   badge: "bg-amber-50 text-amber-700",  next: "DELIVERED", nextLabel: "Mark Delivered", icon: Truck },
  DELIVERED: { label: "Delivered", badge: "bg-green-50 text-green-700",  next: null,        nextLabel: null,             icon: CheckCircle },
  CANCELLED: { label: "Cancelled", badge: "bg-red-50 text-red-600",      next: null,        nextLabel: null,             icon: XCircle },
};

const STATUS_STEPS = ["PENDING", "PLACED", "SHIPPED", "DELIVERED"];

const mockOrder = {
  id: "ORD-041",
  customer: "Suresh Kumar",
  phone: "9876543210",
  address: "12, Shastri Nagar, Near Bus Stand, Meerut - 250001",
  items: [
    { name: "Dal Tadka Tiffin", qty: 2, price: 80 },
    { name: "Masala Chai",      qty: 2, price: 20 },
  ],
  total: 200,
  status: "PLACED",
  payment: "COD",
  placedAt: "Today, 10:15 AM",
};

export default function OrderDetailPage() {
  const router = useRouter();
  const [status, setStatus] = useState(mockOrder.status);
  const [loading, setLoading] = useState(false);

  const sc = STATUS_CONFIG[status];
  const stepIndex = STATUS_STEPS.indexOf(status);

  const doUpdate = async (newStatus) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setStatus(newStatus);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-xl transition text-gray-700">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">#{mockOrder.id}</h1>
          <p className="text-gray-600 text-sm mt-0.5">{mockOrder.placedAt}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${sc.badge}`}>{sc.label}</span>
      </div>

      {/* Status Progress — QA-010: 5 step workflow */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Order Status</h2>
        {status === "CANCELLED" ? (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <XCircle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600 font-semibold">Order Cancelled</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1">
              {STATUS_STEPS.map((s, i) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    i < stepIndex ? "bg-green-700 text-white" : i === stepIndex ? "bg-green-700 text-white ring-4 ring-green-100" : "bg-gray-100 text-gray-400"
                  }`}>
                    {i < stepIndex ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  {i < STATUS_STEPS.length - 1 && (
                    <div className={`flex-1 h-1 mx-1 rounded-full ${i < stepIndex ? "bg-green-700" : "bg-gray-100"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {STATUS_STEPS.map((s) => (
                <span key={s} className={`text-xs font-medium ${s === status ? "text-green-700" : "text-gray-400"}`}>
                  {STATUS_CONFIG[s].label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Customer */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
        <h2 className="font-semibold text-gray-800">Customer</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center text-green-700 font-bold text-sm flex-shrink-0">
            {mockOrder.customer.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{mockOrder.customer}</p>
            <p className="text-sm text-gray-600 flex items-center gap-1"><Phone size={12} /> +91 {mockOrder.phone}</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-1 flex items-center gap-1"><MapPin size={11} /> Delivery Address</p>
          <p className="text-sm text-gray-800">{mockOrder.address}</p>
        </div>
        <div className="flex gap-2">
          <a href={`tel:${mockOrder.phone}`}
            className="flex-1 border border-green-700 text-green-700 text-sm font-semibold py-2.5 rounded-xl text-center hover:bg-green-50 transition flex items-center justify-center gap-1.5">
            <Phone size={13} /> Call Customer
          </a>
          <a href={`https://wa.me/91${mockOrder.phone}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 bg-[#25D366] text-white text-sm font-semibold py-2.5 rounded-xl text-center hover:bg-[#20c05c] transition flex items-center justify-center gap-1.5">
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Items Ordered</h2>
        <div className="space-y-3">
          {mockOrder.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">₹{item.price} × {item.qty}</p>
              </div>
              <p className="font-bold text-green-700 text-sm">₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">₹{mockOrder.total}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          {/* QA-009: COD only */}
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
            <span className="text-gray-800">Total (COD)</span>
            <span className="text-green-700">₹{mockOrder.total}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons — QA-010: status workflow */}
      {!["DELIVERED", "CANCELLED"].includes(status) && (
        <div className="flex gap-3">
          {sc.next && (
            <button onClick={() => doUpdate(sc.next)} disabled={loading}
              className="flex-1 bg-green-700 text-white font-bold py-4 rounded-2xl text-sm hover:bg-green-800 transition disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : sc.next === "DELIVERED" ? <CheckCircle size={16} /> : <Truck size={16} />
              }
              {sc.nextLabel}
            </button>
          )}
          <button onClick={() => doUpdate("CANCELLED")} disabled={loading}
            className="flex-1 border-2 border-red-200 text-red-500 font-bold py-4 rounded-2xl text-sm hover:bg-red-50 transition disabled:opacity-60 flex items-center justify-center gap-2">
            <XCircle size={16} /> Cancel Order
          </button>
        </div>
      )}

      {status === "DELIVERED" && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
          <CheckCircle size={24} className="mx-auto text-green-600 mb-1" />
          <p className="text-green-700 font-bold">Order Delivered!</p>
          <p className="text-xs text-green-600 mt-1">Collect ₹{mockOrder.total} in cash</p>
        </div>
      )}

      <Link href="/dashboard/orders" className="block text-center text-sm text-green-700 font-medium hover:underline py-1">
        ← Back to Orders
      </Link>
    </div>
  );
}