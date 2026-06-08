"use client";
import Link from "next/link";

const todayOrders = [
  { time: "9:15 AM", amount: 160, customer: "Suresh" },
  { time: "9:43 AM", amount: 80, customer: "Priya" },
  { time: "10:20 AM", amount: 270, customer: "Amit" },
  { time: "11:05 AM", amount: 80, customer: "Neha" },
  { time: "12:30 PM", amount: 170, customer: "Rohit" },
  { time: "1:15 PM", amount: 160, customer: "Kavita" },
  { time: "2:00 PM", amount: 90, customer: "Deepak" },
  { time: "3:30 PM", amount: 130, customer: "Sunita" },
];

const todayTotal = todayOrders.reduce((s, o) => s + o.amount, 0);
const maxAmount = Math.max(...todayOrders.map((o) => o.amount));

const topProducts = [
  { name: "Dal Tadka Tiffin", orders: 12, revenue: 960 },
  { name: "Paneer Tiffin", orders: 9, revenue: 810 },
  { name: "Rajma Chawal", orders: 7, revenue: 560 },
  { name: "Aloo Paratha", orders: 5, revenue: 250 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Analytics</h1>
        <p className="text-gray-500 text-sm mt-0.5">Today,s performance · Free Tier (today only)</p>
      </div>

      {/* Pro Lock Banner */}
      <div className="bg-[#1A4D2E] rounded-2xl px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#F4A300] font-bold text-sm">🔒 Full Analytics on Pro</p>
          <p className="text-green-100 text-xs mt-0.5">View weekly/monthly trends, customer data & more</p>
        </div>
        <Link href="/dashboard/settings" className="bg-[#F4A300] text-[#1A4D2E] text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition whitespace-nowrap">
          Unlock →
        </Link>
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1A4D2E] rounded-2xl p-5">
          <p className="text-green-300 text-xs font-medium mb-1">Todays Earnings</p>
          <p className="text-3xl font-bold text-white">₹{todayTotal.toLocaleString()}</p>
          <p className="text-green-200 text-xs mt-1">{todayOrders.length} orders</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-gray-400 text-xs font-medium mb-1">Avg Order Value</p>
          <p className="text-3xl font-bold text-[#1C1C1C]">₹{Math.round(todayTotal / todayOrders.length)}</p>
          <p className="text-gray-400 text-xs mt-1">per order today</p>
        </div>
      </div>

      {/* Today's Orders Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#1C1C1C]">Orders Today</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#F4A300] rounded-full" />
            <span className="text-xs text-gray-400">Blurred = Pro</span>
          </div>
        </div>
        <div className="flex items-end gap-2 h-32">
          {todayOrders.map((o, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-[#1A4D2E] rounded-t-lg transition-all hover:bg-[#2d6b42]"
                style={{ height: `${(o.amount / maxAmount) * 100}%`, minHeight: "8px" }}
                title={`${o.customer}: ₹${o.amount}`}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {todayOrders.map((o, i) => (
            <div key={i} className="flex-1 text-center">
              <p className="text-xs text-gray-400 truncate">{o.time.split(" ")[0]}</p>
            </div>
          ))}
        </div>

        {/* Blurred future section */}
        <div className="mt-4 relative">
          <div className="blur-sm select-none pointer-events-none">
            <p className="text-xs text-gray-400 mb-2">Last 7 days trend...</p>
            <div className="flex items-end gap-2 h-16">
              {[40,65,30,80,55,70,45].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-200 rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm flex items-center gap-2">
              <span className="text-sm">🔒</span>
              <span className="text-xs font-semibold text-[#1A4D2E]">Weekly data on Pro</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h2 className="font-semibold text-[#1C1C1C] mb-4">Top Products Today</h2>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <span className="w-6 h-6 bg-[#1A4D2E]/10 text-[#1A4D2E] rounded-full flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-[#1C1C1C]">{p.name}</span>
                  <span className="text-[#1A4D2E] font-semibold">₹{p.revenue}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F4A300] rounded-full"
                    style={{ width: `${(p.orders / topProducts[0].orders) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{p.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked: Customer list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative overflow-hidden">
        <h2 className="font-semibold text-[#1C1C1C] mb-4">Customer Insights</h2>
        <div className="blur-sm select-none space-y-2">
          {["Suresh Kumar · 12 orders · ₹960", "Priya Sharma · 8 orders · ₹640", "Amit Verma · 7 orders · ₹630"].map((c) => (
            <div key={c} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-gray-200" />
              <div className="flex-1 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <div className="text-center">
            <p className="text-sm font-semibold text-[#1A4D2E] mb-2">🔒 Customer list on Pro</p>
            <button className="bg-[#F4A300] text-[#1A4D2E] text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}