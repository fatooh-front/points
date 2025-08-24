export default function MembershipCardSkeleton() {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow">
      {/* الحقول اليمنى */}
      <div className="grid grid-cols-2 gap-4 col-span-2 sm:col-span-1">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="h-10 bg-gray-200 animate-pulse rounded" />
        ))}
      </div>
      {/* صورة كارت العضوية */}
      <div className="w-full h-full bg-gray-200 animate-pulse rounded-md col-span-2 sm:col-span-1" />

      {/* محرر النصوص بالعربية */}
      <div className="col-span-2">
        <div className="h-6 w-40 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-36 bg-gray-200 animate-pulse rounded" />
      </div>

      {/* محرر النصوص بالإنجليزية */}
      <div className="col-span-2">
        <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="h-36 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
}
