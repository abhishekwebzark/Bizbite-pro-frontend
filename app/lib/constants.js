// lib/constants.js — BizBiteNow Free Tier constants per documentation

export const BRAND = {
  name: "BizBiteNow",
  platform: "Apna Dukaan",
  storeBase: "apnadukaan.in",
  green: "#1A4D2E",
  amber: "#F4A300",
  bg: "#FAFAF5",
};

// Free Tier hard limits (per documentation)
export const FREE_TIER = {
  maxProducts: 10,
  maxCategories: 3,
  maxImages: 1,          // 1 image per product
  imageMaxKB: 50,        // compressed to 50KB WebP
  orderHistoryDays: 1,   // today only
  analyticsWindow: "today",
  payment: "COD",        // Cash on Delivery only
  customDomain: false,
  whatsappNotif: false,
  upiPayment: false,
  orderNotes: false,
  customerList: false,
  scheduledOrders: false,
  reorder: false,
  platformBranding: true, // "Powered by Apna Dukaan" always shown
};

// Pro Tier features
export const PRO_FEATURES = [
  { icon: "💳", label: "UPI / Online Payments" },
  { icon: "💬", label: "WhatsApp Notifications" },
  { icon: "📦", label: "Unlimited Products" },
  { icon: "🗂️", label: "Unlimited Categories" },
  { icon: "📊", label: "Full Analytics (weekly/monthly)" },
  { icon: "🧾", label: "Payment History / Khata" },
  { icon: "📅", label: "Scheduled Orders" },
  { icon: "🔁", label: "1-Tap Reorder" },
  { icon: "🌐", label: "Custom Domain" },
  { icon: "📍", label: "5-Step Order Tracking" },
  { icon: "📝", label: "Order Notes" },
  { icon: "👥", label: "Customer List" },
];

export const PRO_PRICE = 149; // ₹/month
export const TRIAL_DAYS = 14;

// Order statuses — only 2 on Free Tier
export const ORDER_STATUSES = {
  new: { label: "New", color: "#F4A300", bg: "#FEF3C7" },
  delivered: { label: "Delivered", color: "#059669", bg: "#ECFDF5" },
};

// Nav items for seller dashboard
export const SELLER_NAV = [
  { href: "/dashboard", icon: "🏠", label: "Home" },
  { href: "/dashboard/orders", icon: "📦", label: "Orders" },
  { href: "/dashboard/products", icon: "🍽️", label: "Products" },
  { href: "/dashboard/categories", icon: "🗂️", label: "Categories" },
  { href: "/dashboard/analytics", icon: "📊", label: "Analytics" },
  { href: "/dashboard/storeFront", icon: "🏪", label: "Store Front" },
  { href: "/dashboard/settings", icon: "⚙️", label: "Settings" },
  { href: "/dashboard/profile", icon: "👤", label: "Profile" },
];