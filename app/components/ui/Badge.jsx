const variants = {
  green: "bg-green-50 text-green-700 border-green-100",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-600 border-red-100",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  gray: "bg-gray-100 text-gray-500 border-gray-200",
  pro: "bg-[#F4A300]/15 text-amber-700 border-[#F4A300]/30",
  free: "bg-green-50 text-green-700 border-green-100",
  dark: "bg-[#1A4D2E] text-white border-transparent",
};

export default function Badge({ children, variant = "gray", dot = false, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${variants[variant] || variants.gray} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${variant === "green" || variant === "free" ? "bg-green-500" : variant === "amber" || variant === "pro" ? "bg-amber-500" : variant === "red" ? "bg-red-500" : "bg-gray-400"}`} />}
      {children}
    </span>
  );
}

export function ProBadge() {
  return <Badge variant="pro">⭐ PRO</Badge>;
}

export function FreeBadge() {
  return <Badge variant="free" dot>Free Tier</Badge>;
}

export function StatusBadge({ status }) {
  const map = {
    new: { variant: "amber", label: "New" },
    preparing: { variant: "blue", label: "Preparing" },
    delivered: { variant: "green", label: "Delivered" },
    cancelled: { variant: "red", label: "Cancelled" },
    active: { variant: "green", label: "Active" },
    inactive: { variant: "gray", label: "Inactive" },
  };
  const s = map[status] || map.new;
  return <Badge variant={s.variant} dot>{s.label}</Badge>;
}