function EkoranHomeCardSkeleton() {
  return (
    <div className="animate-pulse w-full max-w-sm">
      <div className="group border-2 border-base-300 bg-card overflow-hidden rounded-lg">
        {/* Cover Skeleton */}
        <div className="aspect-[6/8] relative overflow-hidden rounded-t-lg  bg-gray-300 dark:bg-gray-700" />

        {/* View Counter Skeleton */}
        <div className="absolute bottom-3 right-3 bg-base-300 rounded-md w-16 h-5" />
      </div>

    
    </div>
  );
}

export default EkoranHomeCardSkeleton;
