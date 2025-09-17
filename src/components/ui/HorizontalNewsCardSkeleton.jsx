function HorizontalNewsCardSkeleton() {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-40 w-full bg-base-300">
        <div className="absolute bottom-3 right-3 bg-base-300 rounded-md w-16 h-5" />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-base-300 rounded"></div>
          <div className="h-4 w-2/3 bg-base-300 rounded"></div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs mt-auto pt-4">
          <div className="h-3 w-16 bg-base-300 rounded"></div>
          <div className="h-3 w-20 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalNewsCardSkeleton;
