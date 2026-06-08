"use client";

export default function TopProductsChart({ products = [], color = "#F4A300" }) {
  const max = Math.max(...products.map((p) => p.orders), 1);

  return (
    <div className="space-y-3">
      {products.map((p, i) => (
        <div key={p.name} className="flex items-center gap-3">
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
            style={{ backgroundColor: `${color}20`, color: "#1A4D2E" }}
          >
            {i + 1}
          </span>
          <div className="flex-1">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-semibold text-[#1C1C1C] truncate">{p.name}</span>
              <span className="font-bold text-[#1A4D2E] ml-2 flex-shrink-0">₹{p.revenue}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${(p.orders / max) * 100}%`, backgroundColor: color }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{p.orders} orders</p>
          </div>
        </div>
      ))}
    </div>
  );
}