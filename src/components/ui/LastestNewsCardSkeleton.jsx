
import React from 'react';

const LastestNewsCardSkeleton = () => {
    return (
        <div className="animate-pulse grid grid-cols-5 space-x-4 mb-4">
            <div className="rounded-lg bg-gray-300 col-span-2 md:col-span-1"></div>
            <div className="space-y-4 py-1 col-span-3 md:col-span-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

export default LastestNewsCardSkeleton;
