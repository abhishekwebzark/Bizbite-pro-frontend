"use client";

export default function StoreFrontHeader({ store }) {
  if (!store) return null;

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: store.color }}>
      {store.banner && (
        <img
          src={store.banner}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
      )}
      <div className="relative px-4 pt-5 pb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl border-2 border-white/40 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {store.logo
              ? <img src={store.logo} alt="logo" className="w-full h-full object-cover" />
              : <span className="text-white font-black text-xl">{store.name?.charAt(0)}</span>
            }
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-black text-lg leading-tight truncate">{store.name}</h1>
            {store.tagline && (
              <p className="text-white/70 text-xs mt-0.5 truncate">{store.tagline}</p>
            )}
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${store.isOpen ? "bg-green-400" : "bg-red-400"}`} />
              <span className="text-white/80 text-xs font-medium">
                {store.isOpen ? "Abhi Open" : "Abhi Band"}
                {store.city && ` · ${store.city}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}