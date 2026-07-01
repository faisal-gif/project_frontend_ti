import React from 'react'

function CardImageSkeleton() {
    return (
        <div className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-card overflow-hidden rounded-xl">
            <div className="relative">
                <div className="aspect-[16/9] bg-base-300 w-full rounded"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="h-3 w-20 bg-base-300 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-base-300 rounded mb-2"></div>
                    <div className="h-4 w-2/5 bg-base-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default CardImageSkeleton