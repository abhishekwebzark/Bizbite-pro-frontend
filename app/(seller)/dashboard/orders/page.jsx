"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, ChevronDown, ChevronUp, Inbox, MapPin, CheckCircle, Truck, XCircle, ArrowRight } from "lucide-react";

// QA-010: 5 delivery statuses
const STATUS_CONFIG = {
  PENDING:   { label: "Pending",   dot: "bg-gray-400",              badge: "bg-gray-100 text-gray-700",    next: "PLACED",    nextLabel: "Mark Placed" },
  PLACED:    { label: "Placed",    dot: "bg-blue-500 animate-pulse", badge: "bg-blue-50 text-blue-700",    next: "SHIPPED",   nextLabel: "Mark Shipped" },
  SHIPPED:   { label: "Shipped",   dot: "bg-amber-500 animate-pulse",badge: "bg-amber-50 text-amber-700",  next: "DELIVERED", nextLabel: "Mark Delivered" },
  DELIVERED: { label: "Delivered", dot: "bg-green-500",              badge: "bg-green-50 text-green-700",  next: null,        nextLabel: null },
  CANCELLED: { label: "Cancelled", dot: "bg-red-500",                badge: "bg-red-50 text-red-600",      next: null,        nextLabel: null },
};

const TABS = ["All", "PENDING", "PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

const initialOrders = [
  { id: "ORD-041", customer: "Suresh Kumar",  phone: "9876543210", items: [{ name: "Dal Tadka Tiffin", qty: 2, price: 80 }],  total: 160, address: "12, Shastri Nagar, Near Bus Stand", status: "PLACED",    time: "10 min ago", payment: "COD" },
  { id: "ORD-040", customer: "Priya Sharma",  phone: "9812345678", items: [{ name: "Rajma Chawal", qty: 1, price: 80 }],       total: 80,  address: "45, Civil Lines, Opp. Park",       status: "PENDING",   time: "28 min ago", payment: "COD" },
  { id: "ORD-039", customer: "Amit Verma",    phone: "9823456789", items: [{ name: "Paneer Tiffin", qty: 3, price: 90 }],      total: 270, address: "7, Gandhi Road, Near School",      status: "SHIPPED",   time: "1 hr ago",   payment: "COD" },
  { id: "ORD-038", customer: "Neha Singh",    phone: "9834567890", items: [{ name: "Dal Tiffin", qty: 1, price: 80 }],         total: 80,  address: "23, Model Town, Block B",          status: "DELIVERED", time: "2 hr ago",   payment: "COD" },
  { id: "ORD-037", customer: "Rohit Gupta",   phone: "9845678901", items: [{ name: "Mix Veg Tiffin", qty: 2, price: 85 }],     total: 170, address: "9, Subhash Nagar, Lane 3",         status: "CANCELLED", time: "3 hr ago",   payment: "COD" },
];

export default function OrdersPage() {
  const [orders, setOrders]   = useState(initialOrders);
  const [tab, setTab]         = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = tab === "All" ? orders : orders.filter((o) => o.status === tab);
  const activeCount = orders.filter((o) => ["PENDING", "PLACED", "SHIPPED"].includes(o.status)).length;
  const todayTotal  = orders.filter((o) => o.status === "DELIVERED").reduce((s, o) => s + o.total, 0);

  const updateStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 text-sm mt-0.5">{activeCount} active order{activeCount !== 1 ? "s" : ""} in progress</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Today's Earnings</p>
          <p className="text-xl font-bold text-green-700">₹{todayTotal.toLocaleString()}</p>
        </div>
      </div>

      {/* COD only notice — QA-009 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span className="text-base">💰</span>
        <p className="text-xs text-amber-800 font-medium">All orders are Cash on Delivery (COD) · UPI available on Pro</p>
      </div>

      {/* Tabs — QA-010: 5 status tabs */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {TABS.map((t) => {
          const count = t === "All" ? orders.length : orders.filter((o) => o.status === t).length;
          const isActive = tab === t;
          return (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap border ${
                isActive ? "bg-green-700 text-white border-green-700 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
              }`}>
              {t === "All" ? "All" : STATUS_CONFIG[t].label}
              {count > 0 && (
                <span className={`ml-1.5 text-xs font-bold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <Inbox size={36} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 text-sm font-medium">No orders here</p>
          </div>
        )}

        {filtered.map((order) => {
          const sc = STATUS_CONFIG[order.status];
          const expanded = expandedId === order.id;
          return (
            <div key={order.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Row Header */}
              <button onClick={() => setExpandedId(expanded ? null : order.id)}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition text-left">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${sc.dot}`} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.id} · {order.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-green-700 text-sm">₹{order.total}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sc.badge}`}>{sc.label}</span>
                  {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </div>
              </button>

              {/* Expanded Details */}
              {expanded && (
                <div className="px-4 pb-4 pt-3 border-t border-gray-100 space-y-3">
                  {/* Items */}
                  <div className="space-y-1.5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">{item.qty}x {item.name}</span>
                        <span className="font-semibold text-gray-900">₹{item.qty * item.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between font-bold text-sm pt-2 border-t border-gray-100">
                      <span className="text-gray-800">Total (COD)</span>
                      <span className="text-green-700">₹{order.total}</span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 border border-gray-100">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Customer</p>
                    <p className="text-sm text-gray-800 flex items-center gap-1.5"><Phone size={12} className="text-gray-500" /> +91 {order.phone}</p>
                    <p className="text-sm text-gray-700 flex items-start gap-1.5"><MapPin size={12} className="text-gray-500 mt-0.5 flex-shrink-0" /> {order.address}</p>
                  </div>

                  {/* Status Workflow — QA-010 */}
                  <div className="flex gap-2 flex-wrap">
                    {sc.next && (
                      <button onClick={() => updateStatus(order.id, sc.next)}
                        className="flex-1 bg-green-700 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-green-800 transition flex items-center justify-center gap-1.5">
                        {sc.next === "DELIVERED" ? <CheckCircle size={13} /> : <Truck size={13} />}
                        {sc.nextLabel}
                      </button>
                    )}
                    {!["DELIVERED", "CANCELLED"].includes(order.status) && (
                      <button onClick={() => updateStatus(order.id, "CANCELLED")}
                        className="px-3 border border-red-200 text-red-500 text-xs font-semibold py-2.5 rounded-xl hover:bg-red-50 transition flex items-center gap-1">
                        <XCircle size={13} /> Cancel
                      </button>
                    )}
                    <a href={`tel:${order.phone}`}
                      className="px-3 border border-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition flex items-center gap-1">
                      <Phone size={13} /> Call
                    </a>
                    <Link href={`/dashboard/orders/${order.id}`}
                      className="px-3 border border-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition flex items-center gap-1">
                      <ArrowRight size={13} /> Details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}