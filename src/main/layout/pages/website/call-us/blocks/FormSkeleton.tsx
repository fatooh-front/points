export function FormSkeleton() {
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* First Row - Phone Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Second Row - Email and Website */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Third Row - Social Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Fourth Row - More Social Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-26 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      {/* Fifth Row - App Store Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-28 mr-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
