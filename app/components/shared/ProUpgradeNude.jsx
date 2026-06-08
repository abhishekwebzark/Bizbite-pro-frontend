"use client";
import Link from "next/link";

export default function ProUpgradeNudge({ icon = "🔒", text, ctaText = "Upgrade to Pro →", compact = false }) {
  if (compact) {
    return (
      <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
        <p className="text-xs text-amber-800 font-medium">{icon} {text}</p>
        <Link href="/dashboard/settings" className="text-xs font-bold text-[#1A4D2E] hover:underline ml-2 whitespace-nowrap">
          {ctaText}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#1A4D2E] rounded-2xl px-5 py-4 flex items-center justify-between">
      <div>
        <p className="text-[#F4A300] font-bold text-sm">{icon} Pro Feature</p>
        <p className="text-green-100 text-xs mt-0.5">{text}</p>
      </div>
      <Link
        href="/dashboard/settings"
        className="bg-[#F4A300] text-[#1A4D2E] text-xs font-bold px-4 py-2 rounded-xl hover:bg-amber-400 transition whitespace-nowrap ml-4"
      >
        {ctaText}
      </Link>
    </div>
  );
}