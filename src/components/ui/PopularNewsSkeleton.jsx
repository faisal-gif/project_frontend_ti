
import React from 'react';

const PopularNewsSkeleton = () => {
    return (
        <div className="w-80 bg-white shadow-[0px_2px_14px_rgba(42,42,42,0.24)] rounded-[3px] p-5 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>

            <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-start gap-3 animate-pulse">
                        <div className="w-[30px] h-8 bg-gray-300 rounded"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularNewsSkeleton;
