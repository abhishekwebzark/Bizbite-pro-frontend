"use client";
import Link from "next/link";
import { StatusBadge } from "@/components/ui/Badge";

export default function OrderRow({ order }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${order.status === "new" ? "bg-[#F4A300] animate-pulse" : "bg-green-400"}`} />
        <div>
          <p className="text-sm font-semibold text-[#1C1C1C]">{order.customer}</p>
          <p className="text-xs text-gray-400">{order.itemsSummary} · {order.time}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-bold text-[#1A4D2E]">{order.amount}</p>
          <StatusBadge status={order.status} />
        </div>
        <Link
          href={`/dashboard/orders/${order.id}`}
          className="text-xs text-gray-400 hover:text-[#1A4D2E] transition"
        >
          →
        </Link>
      </div>
    </div>
  );
}