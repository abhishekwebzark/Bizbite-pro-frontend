"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiGrid,
  FiSettings,
} from "react-icons/fi";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: FiHome },
  { name: "Products", href: "/dashboard/products", icon: FiBox },
  { name: "Orders", href: "/dashboard/orders", icon: FiShoppingCart },
  { name: "Categories", href: "/dashboard/categories", icon: FiGrid },
  { name: "Settings", href: "/dashboard/settings", icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen bg-[#098e3e] flex flex-col justify-between p-4">
      
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-[#F4A300]">
            BizBiteNow
          </h1>
        </div>

        {/* Menu */}
        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active
                    ? "bg-[#efb033] text-[#1A4D2E]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-6">
        <div className="bg-white/10 rounded-xl p-3 text-xs text-white/80">
          <p className="font-semibold text-white">Free Plan</p>
          <p className="mt-1 text-[11px]">
            Upgrade to unlock more features
          </p>
          <button className="mt-2 w-full bg-[#f5b535] text-[#1A4D2E] py-1.5 rounded-lg font-semibold text-xs hover:bg-amber-200 transition">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}