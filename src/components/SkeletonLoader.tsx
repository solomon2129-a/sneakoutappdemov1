export function SkeletonLoader() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 animate-pulse">
      <div className="w-full h-40 bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 mt-2"></div>
        <div className="h-8 bg-gray-700 rounded w-full mt-4"></div>
      </div>
    </div>
  );
}

export function SkeletonLoaderGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} />
      ))}
    </div>
  );
}
