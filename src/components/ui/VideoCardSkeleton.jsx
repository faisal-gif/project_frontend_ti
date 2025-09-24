function VideoCardSkeleton() {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-40 w-full bg-base-300">
        <div className="absolute bottom-3 right-3 bg-base-300 rounded-md w-16 h-5" />
      </div>

    
    </div>
  );
}

export default VideoCardSkeleton;
