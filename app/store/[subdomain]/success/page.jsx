"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMockStore } from "../../../lib/mockStoreData";

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subdomain = params?.subdomain || "";

  const orderId = searchParams.get("orderId") || "#ORD-000";
  const total = searchParams.get("total") || "0";
  const customerName = searchParams.get("name") || "Aap";

  const [store, setStore] = useState(null);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    setStore(getMockStore(subdomain));
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 500);
    return () => clearInterval(interval);
  }, [subdomain]);

  const whatsappText = encodeURIComponent(
    `Maine ${store?.name || "store"} par order kiya!\nOrder: ${orderId}\nTotal: ₹${total} COD\nLink: https://${subdomain}.apnadukaan.in`
  );

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex flex-col">
      {/* Top color strip */}
      <div className="h-2" style={{ backgroundColor: store?.color || "#1A4D2E" }} />

      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 text-center">
        {/* Success Animation */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-5 shadow-xl"
          style={{ backgroundColor: `${store?.color || "#1A4D2E"}15`, border: `3px solid ${store?.color || "#1A4D2E"}30` }}
        >
          ✅
        </div>

        <h1 className="text-2xl font-black text-[#1C1C1C]">Order Ho Gaya!</h1>
        <p className="text-gray-500 text-sm mt-1">
          {customerName} ji, aapka order confirm hua hai
        </p>

        {/* Order ID */}
        <div
          className="mt-5 px-5 py-3 rounded-2xl border-2 font-black text-lg"
          style={{ borderColor: store?.color || "#1A4D2E", color: store?.color || "#1A4D2E", backgroundColor: `${store?.color || "#1A4D2E"}08` }}
        >
          {orderId}
        </div>

        {/* Details Card */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm p-4 space-y-3 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Store</span>
            <span className="font-semibold text-[#1C1C1C]">{store?.name}</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-50 pt-2">
            <span className="text-gray-500">Payment</span>
            <span className="font-bold text-[#1C1C1C]">💰 ₹{total} Cash on Delivery</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-50 pt-2">
            <span className="text-gray-500">Delivery</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
          <div className="border-t border-gray-50 pt-2">
            <p className="text-xs text-gray-400 text-center">
              Cash ready rakhein — delivery aane par dena hai
            </p>
          </div>
        </div>

        {/* Order status - 2 states only per doc */}
        <div className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Order Status</p>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 animate-pulse"
              style={{ backgroundColor: store?.color || "#1A4D2E" }}
            />
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
              <div className="h-full w-1/3 rounded-full transition-all" style={{ backgroundColor: "#F4A300" }} />
            </div>
            <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0" />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs font-semibold" style={{ color: store?.color }}>Confirmed{".".repeat(dots)}</span>
            <span className="text-xs text-gray-300">Delivered</span>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Seller ne order dekh liya — delivery jald hogi
          </p>
        </div>

        {/* Share + reorder buttons */}
        <div className="mt-5 w-full max-w-sm space-y-2">
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 hover:bg-[#20c05c] transition"
          >
            💬 Order Share Karein WhatsApp Pe
          </a>
          <button
            onClick={() => router.push(`/store/${subdomain}`)}
            className="w-full border-2 font-bold py-3.5 rounded-2xl text-sm transition hover:opacity-80"
            style={{ borderColor: store?.color, color: store?.color }}
          >
            ← Wapas Menu Pe Jaayein
          </button>
        </div>

        <p className="mt-8 text-xs text-gray-300">Powered by Apna Dukaan</p>
      </div>
    </div>
  );
}