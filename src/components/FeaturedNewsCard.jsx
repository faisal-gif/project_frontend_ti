
import React from 'react'
import Card from './ui/Card'
import { MessageCircle, Eye, Heart } from "lucide-react";

function FeaturedNewsCard({
    title,
    source,
    timeAgo,
    image,
    views = 4,
    className = ""
}) {
    return (
        <Card className={`group relative h-60 w-full cursor-pointer overflow-hidden rounded-lg border-0 shadow-lg transition-all duration-300 hover:shadow-2xl lg:h-[28rem] ${className}`}>
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative flex h-full transform flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
                <h1 className="mb-4 text-lg font-bold leading-tight transition-colors group-hover:text-primary-foreground lg:text-3xl">
                    {title}
                </h1>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm opacity-90">{timeAgo}</span>
                        <div className="flex items-center gap-1">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                                    <span className="text-xs">
                                        {source.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <span className="text-sm font-medium opacity-90">{source}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm opacity-90">
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{views.toLocaleString()}</span>
                        </div>

                    </div>
                </div>
            </div>

        </Card>
    )
}

export default FeaturedNewsCard