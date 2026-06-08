export default function SuccessLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF5] flex flex-col items-center justify-center px-5 animate-pulse">
      <div className="w-24 h-24 rounded-full bg-gray-200 mb-5" />
      <div className="h-7 w-48 bg-gray-200 rounded-xl mb-2" />
      <div className="h-4 w-64 bg-gray-100 rounded-lg mb-5" />
      <div className="h-12 w-40 bg-gray-200 rounded-2xl mb-5" />
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-sm p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    </div>
  );
}