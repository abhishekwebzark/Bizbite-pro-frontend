export default function StatsCard({ icon, label, value, sub, variant = "white" }) {
  const styles = {
    white: "bg-white border border-gray-100 text-[#1C1C1C]",
    green: "bg-[#1A4D2E] text-white",
    amber: "bg-[#F4A300] text-[#1A4D2E]",
  };

  return (
    <div className={`rounded-2xl p-4 shadow-sm ${styles[variant]}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold leading-tight">{value}</p>
      <p className={`text-xs font-medium mt-1 ${variant === "white" ? "text-gray-500" : variant === "green" ? "text-green-300" : "text-amber-700"}`}>
        {label}
      </p>
      {sub && (
        <p className={`text-xs mt-0.5 ${variant === "white" ? "text-gray-400" : variant === "green" ? "text-green-200" : "text-amber-600"}`}>
          {sub}
        </p>
      )}
    </div>
  );
}