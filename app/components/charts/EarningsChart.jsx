"use client";

const HOURS = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM"];
const MOCK_DATA = [160, 80, 270, 80, 170, 160, 90, 130];

export default function EarningsChart({ data = MOCK_DATA, labels = HOURS, color = "#1A4D2E", locked = false }) {
  const max = Math.max(...data, 1);

  return (
    <div className="relative">
      {/* Chart */}
      <div className="flex items-end gap-1.5 h-28">
        {data.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-default"
              style={{
                height: `${(val / max) * 100}%`,
                minHeight: "6px",
                backgroundColor: locked && i > 2 ? "#E5E7EB" : color,
                opacity: locked && i > 2 ? 0.4 : 1,
              }}
              title={`₹${val}`}
            />
          </div>
        ))}
      </div>

      {/* X Labels */}
      <div className="flex gap-1.5 mt-1.5">
        {labels.map((l, i) => (
          <div key={i} className="flex-1 text-center">
            <p className="text-xs text-gray-400 truncate">{l}</p>
          </div>
        ))}
      </div>

      {/* Pro lock overlay for past days */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl">
          <div className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 shadow-sm flex items-center gap-1.5">
            <span className="text-xs">🔒</span>
            <span className="text-xs font-semibold text-[#1A4D2E]">Weekly data on Pro</span>
          </div>
        </div>
      )}
    </div>
  );
}