
const NewsDetailSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-4">
        <div className="skeleton h-8 w-full"></div>
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-8 mt-8">
        <div className="w-full">
          <div className="skeleton h-96 w-full mb-4"></div>
          <div className="skeleton h-4 w-full mt-4"></div>
          <div className="skeleton h-4 w-full mt-2"></div>
          <div className="skeleton h-4 w-full mt-2"></div>
          <div className="skeleton h-4 w-5/6 mt-2"></div>
        </div>
        
      </div>
    </div>
  );
};

export default NewsDetailSkeleton;
