"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBox,
  FiGrid,
  FiSettings,
  FiUser,
  FiBell,
} from "react-icons/fi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlineChartBar } from "react-icons/hi";
import { BsShop } from "react-icons/bs";

const navItems = [
  { href: "/dashboard", icon: FiHome, label: "Home" },
  { href: "/dashboard/orders", icon: MdOutlineShoppingCart, label: "Orders" },
  { href: "/dashboard/products", icon: FiBox, label: "Products" },
  { href: "/dashboard/categories", icon: FiGrid, label: "Categories" },
  { href: "/dashboard/analytics", icon: HiOutlineChartBar, label: "Analytics" },
  { href: "/dashboard/storeFront", icon: BsShop, label: "Store Front" },
  { href: "/dashboard/settings", icon: FiSettings, label: "Settings" },
  { href: "/dashboard/profile", icon: FiUser, label: "Profile" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFAF5] flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#046e2e] min-h-screen flex flex-col fixed left-0 top-0 z-40">
        
        {/* Logo */}
        <div className="px-6 py-5 border-b border-[#2d6b42]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#F4A300] rounded-lg flex items-center justify-center">
              <span className="text-[#1A4D2E] font-bold text-sm">BB</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">BizBite</p>
              <p className="text-[#F4A300] text-xs font-medium">NOW</p>
            </div>
          </div>
        </div>

        {/* Seller Info */}
        <div className="px-4 py-4 border-b border-[#2d6b42]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F4A300] flex items-center justify-center text-[#1A4D2E] font-bold text-sm">
              RT
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                Ramesh Tiffin
              </p>
              <p className="text-green-300 text-xs truncate">
                rameshtiffin.apnadukaan.in
              </p>
            </div>
          </div>

          {/* Plan */}
          <div className="mt-3 bg-[#F4A300]/10 border border-[#F4A300]/30 rounded-lg px-3 py-2 flex items-center justify-between">
            <span className="text-[#F4A300] text-xs font-medium">
              Free Tier
            </span>
            <Link
              href="/dashboard/settings"
              className="text-xs text-white bg-[#F4A300] px-2 py-0.5 rounded font-medium hover:bg-amber-200 transition"
            >
              Upgrade
            </Link>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-[#c38c1e] text-[#1A4D2E]"
                    : "text-green-100 hover:bg-[#2d6b42] hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-[#2d6b42]">
          <p className="text-green-400 text-xs text-center">
            Powered by Apna Dukaan
          </p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 min-h-screen">
        
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            BizBiteNow Dashboard
          </p>

          <div className="flex items-center gap-3">
            
            {/* Notification */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
              <FiBell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F4A300] rounded-full"></span>
            </button>

            {/* Store Link */}
            <Link
              href="/dashboard/storeFront"
              className="text-xs bg-[#1A4D2E] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-[#2d6b42] transition flex items-center gap-2"
            >
              <BsShop size={14} />
              My Store
            </Link>

          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}