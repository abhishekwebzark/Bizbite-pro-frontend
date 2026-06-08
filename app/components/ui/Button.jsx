"use client";

const variants = {
  primary: "bg-[#1A4D2E] text-white hover:bg-[#2d6b42] shadow-sm",
  secondary: "border-2 border-[#1A4D2E] text-[#1A4D2E] hover:bg-[#1A4D2E]/5",
  amber: "bg-[#F4A300] text-[#1A4D2E] hover:bg-amber-400 shadow-sm",
  ghost: "text-gray-600 hover:bg-gray-100",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  dangerOutline: "border-2 border-red-200 text-red-500 hover:bg-red-50",
};

const sizes = {
  sm: "px-3 py-2 text-xs rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-sm rounded-2xl",
  xl: "px-6 py-4 text-sm rounded-2xl w-full",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  style = {},
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      className={`
        font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
      )}
      {children}
    </button>
  );
}