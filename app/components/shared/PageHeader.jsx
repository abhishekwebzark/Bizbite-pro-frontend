"use client";
import { useRouter } from "next/navigation";

export default function PageHeader({ title, subtitle, backHref, action }) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        {backHref && (
          <button
            onClick={() => backHref === "back" ? router.back() : router.push(backHref)}
            className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-600"
          >
            ←
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C] leading-tight">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}