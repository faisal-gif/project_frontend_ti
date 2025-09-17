const HeadlineCardSkeleton = () => {
    return (
        <div className="relative h-60 w-full cursor-pointer overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:shadow-2xl md:h-[30rem]">
            <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
            <div className="relative flex h-full transform flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out">
                <div className="w-3/4 h-7 bg-gray-400 rounded animate-pulse mb-4 lg:h-9"></div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-4 bg-gray-400 rounded animate-pulse"></div>
                        <div className="flex items-center gap-1">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-gray-500 w-8 h-8 rounded-full animate-pulse">
                                </div>
                            </div>
                            <div className="w-24 h-4 bg-gray-400 rounded animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 bg-gray-400 rounded animate-pulse"></div>
                            <div className="w-10 h-4 bg-gray-400 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeadlineCardSkeleton;