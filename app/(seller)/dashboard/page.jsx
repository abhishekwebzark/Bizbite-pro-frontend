"use client";
import Link from "next/link";
import {
  FaRupeeSign,
  FaBox,
  FaUtensils,
  FaCircle,
  FaPlus,
  FaClipboardList,
  FaLink,
  FaBolt,
} from "react-icons/fa";

const stats = [
  {
    label: "Today's Earnings",
    value: "1,240",
    sub: "8 orders today",
    icon: <FaRupeeSign />,
    color: "bg-[#1A4D2E]",
    textColor: "text-white",
  },
  {
    label: "New Orders",
    value: "3",
    sub: "Pending action",
    icon: <FaBox />,
    color: "bg-[#F4A300]",
    textColor: "text-[#1A4D2E]",
  },
  {
    label: "Total Products",
    value: "8 / 10",
    sub: "2 slots remaining",
    icon: <FaUtensils />,
    color: "bg-white",
    textColor: "text-[#1C1C1C]",
  },
  {
    label: "Store Status",
    value: "Live",
    sub: "rameshtiffin.apnadukaan.in",
    icon: <FaCircle />,
    color: "bg-white",
    textColor: "text-[#1C1C1C]",
  },
];

const recentOrders = [
  {
    id: "#ORD-041",
    customer: "Suresh Kumar",
    items: "2x Dal Tadka Tiffin",
    amount: "₹160",
    status: "new",
    time: "10 min ago",
  },
  {
    id: "#ORD-040",
    customer: "Priya Sharma",
    items: "1x Rajma Chawal",
    amount: "₹80",
    status: "new",
    time: "28 min ago",
  },
  {
    id: "#ORD-039",
    customer: "Amit Verma",
    items: "3x Paneer Tiffin",
    amount: "₹270",
    status: "delivered",
    time: "1 hr ago",
  },
];

const upgradeTriggers = [
  {
    icon: <FaClipboardList />,
    text: "Customers want UPI payment",
    cta: "Enable UPI on Pro",
  },
  {
    icon: <FaUtensils />,
    text: "You've used 8/10 product slots",
    cta: "Unlock unlimited products",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">
          Good morning, Ramesh
        </h1>
        <p className="text-[#4B5563] text-sm mt-1">
          Here's what's happening with your store today.
        </p>
      </div>

      {/* Pro Banner */}
      <div className="bg-[#1A4D2E] rounded-2xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#F4A300] font-bold text-sm flex items-center gap-2">
            <FaBolt /> You're growing fast!
          </p>
          <p className="text-green-100 text-xs mt-1">
            8 orders today — unlock push notifications & UPI on Pro
          </p>
        </div>

        <Link
          href="/dashboard/settings"
          className="bg-[#F4A300] text-[#1A4D2E] text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition"
        >
          Try Pro
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`${s.color} rounded-2xl p-4 border border-gray-100 shadow-sm`}
          >
            <div className="text-xl mb-2">{s.icon}</div>

            <p className={`text-2xl font-bold ${s.textColor}`}>
              {s.label === "Today's Earnings" ? `₹${s.value}` : s.value}
            </p>

            <p
              className={`text-xs mt-1 ${
                s.color === "bg-white"
                  ? "text-[#4B5563]"
                  : s.textColor + "/80"
              }`}
            >
              {s.label}
            </p>

            <p
              className={`text-xs mt-0.5 ${
                s.color === "bg-white"
                  ? "text-[#6B7280]"
                  : "text-green-200"
              }`}
            >
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm">
          <div className="px-5 py-4 border-b flex justify-between">
            <h2 className="font-semibold text-[#1C1C1C]">Recent Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-xs text-[#1A4D2E] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="px-5 py-3 flex justify-between hover:bg-gray-50"
              >
                <div className="flex gap-3">
                  <div
                    className={`w-2 h-2 mt-2 rounded-full ${
                      order.status === "new"
                        ? "bg-[#F4A300]"
                        : "bg-green-400"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#1C1C1C]">
                      {order.customer}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {order.items} · {order.time}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-[#1A4D2E]">
                    {order.amount}
                  </p>
                  <span className="text-xs text-[#4B5563]">
                    {order.status === "new"
                      ? "New"
                      : "Delivered"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border shadow-sm p-5">
            <h2 className="font-semibold mb-3 text-[#1C1C1C]">
              Quick Actions
            </h2>

            <div className="space-y-2">
              <Link href="/dashboard/products/add" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 text-[#1C1C1C]">
                <FaPlus /> Add Product
              </Link>

              <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 text-[#1C1C1C]">
                <FaClipboardList /> View Orders
              </Link>

              <Link href="/dashboard/storeFront" className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 text-[#1C1C1C]">
                <FaLink /> Share Store
              </Link>
            </div>
          </div>

          {/* Pro */}
          <div className="bg-white rounded-2xl border shadow-sm p-5">
            <h2 className="font-semibold mb-3 flex gap-2 items-center text-[#1C1C1C]">
              <FaBolt /> Upgrade to Pro
            </h2>

            <div className="space-y-3">
              {upgradeTriggers.map((t, i) => (
                <div key={i} className="bg-amber-50 rounded-xl p-3">
                  <p className="text-xs font-medium flex gap-2 items-center text-[#1C1C1C]">
                    {t.icon} {t.text}
                  </p>
                  <button className="text-xs mt-1 text-[#1A4D2E] font-semibold">
                    {t.cta}
                  </button>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/settings"
              className="mt-3 block text-center bg-[#1A4D2E] text-white text-xs py-2 rounded-xl"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}