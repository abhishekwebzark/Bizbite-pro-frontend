// lib/utils.js — shared utility functions

/** Format price in INR */
export const formatPrice = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

/** Generate subdomain from store name */
export const toSubdomain = (name = "") =>
  name.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "").slice(0, 30);

/** Truncate text */
export const truncate = (str = "", n = 50) =>
  str.length > n ? str.slice(0, n) + "..." : str;

/** Generate order ID */
export const generateOrderId = () =>
  "#ORD-" + Math.floor(100 + Math.random() * 900);

/** Validate Indian mobile number */
export const isValidPhone = (phone = "") => /^[6-9]\d{9}$/.test(phone.trim());

/** Time ago */
export const timeAgo = (date) => {
  const diff = (Date.now() - new Date(date)) / 1000;
  if (diff < 60) return "abhi";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

/** Class merging helper */
export const cn = (...classes) => classes.filter(Boolean).join(" ");

/** Check if store is on Free Tier */
export const isFreeTier = (tier) => tier === "free" || !tier;

/** Get initials from name */
export const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);