export default function DashboardLoading() {
  return (
    <div
      className="min-h-screen bg-[#0F1A13] flex"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Sidebar skeleton */}
      <aside className="w-56 bg-[#1A4D2E] flex flex-col flex-shrink-0 h-screen">
        {/* Logo area */}
        <div className="px-4 py-5 border-b border-white/10">
          <div className="h-5 w-32 bg-white/10 rounded-md animate-pulse" />
          <div className="h-3 w-24 bg-white/8 rounded-md animate-pulse mt-2" />
        </div>

        {/* Seller info */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 w-28 bg-white/10 rounded animate-pulse" />
              <div className="h-2.5 w-36 bg-white/8 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Nav items */}
        <div className="px-3 py-4 space-y-1.5">
          <div className="h-2.5 w-16 bg-white/10 rounded animate-pulse mb-3 ml-1" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg ${i === 1 ? "bg-white/10" : ""}`}
            >
              <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
              <div className="h-3 bg-white/10 rounded animate-pulse" style={{ width: `${60 + i * 15}px` }} />
            </div>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="bg-[#13131f] border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="h-5 w-36 bg-white/10 rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-4 w-20 bg-white/8 rounded animate-pulse" />
            <div className="h-8 w-28 bg-[#F4A300]/20 rounded-lg animate-pulse" />
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Metric cards */}
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#13131f] border border-white/5 rounded-xl p-4 space-y-2"
              >
                <div className="h-3 w-20 bg-white/8 rounded animate-pulse" />
                <div className="h-7 w-24 bg-white/10 rounded animate-pulse" />
                <div className="h-2.5 w-28 bg-white/6 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Two column layout */}
          <div className="grid grid-cols-[1fr_320px] gap-4">
            {/* Orders list skeleton */}
            <div className="bg-[#13131f] border border-white/5 rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex gap-6 px-4 pt-3 pb-0 border-b border-white/5">
                <div className="h-3 w-28 bg-white/10 rounded animate-pulse mb-3" />
                <div className="h-3 w-20 bg-white/6 rounded animate-pulse mb-3" />
              </div>

              {/* Order rows */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="px-4 py-3 border-b border-white/5 space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3.5 w-20 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-white/6 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-48 bg-white/8 rounded animate-pulse" />
                  <div className="h-3 w-36 bg-white/6 rounded animate-pulse" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-3.5 w-14 bg-white/10 rounded animate-pulse" />
                    <div className="h-7 w-24 bg-[#1A4D2E]/50 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Order detail skeleton */}
            <div className="bg-[#13131f] border border-white/5 rounded-xl p-4 space-y-4">
              <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
              <div className="space-y-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-white/8 animate-pulse" />
                    <div className="h-3 bg-white/8 rounded animate-pulse flex-1" style={{ width: `${50 + i * 10}%` }} />
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-3 space-y-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-32 bg-white/8 rounded animate-pulse" />
                    <div className="h-3 w-12 bg-white/8 rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-full bg-[#1A4D2E]/40 rounded-xl animate-pulse mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Center spinner overlay */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-[3px] border-[#F4A300]/20" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#F4A300] animate-spin" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#F4A300] animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 rounded-full bg-[#F4A300] animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 rounded-full bg-[#F4A300] animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-[#F4A300]/60 text-xs font-medium tracking-wider">Dashboard load ho raha hai...</p>
        </div>
      </div>
    </div>
  );
}